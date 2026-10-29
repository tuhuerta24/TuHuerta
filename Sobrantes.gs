// Tu Huerta — Sobrantes del local.
// Pantalla para cargar desde la tablet lo que queda en el local después de
// armar pedidos. Lo guarda en la pestaña "Stock" de la planilla, en la misma
// unidad del catálogo y también convertido a la unidad que usa la hoja
// "Items" (para que la lista de compras pueda restar: pedido − sobrante).
//
// Se abre con el mismo link de la herramienta de impresión, cambiando
// app=imprimir por app=sobrantes (usa el mismo token).

const STOCK_SHEET_NAME = 'Stock';
const STOCK_SPREADSHEET_ID = '1GuWpWcQ5M_MbVDCv8c-rEiI1IzBCd3BBFmdxH9tjpPw';

function sobrantesPage_(p) {
  const tokenValido = PropertiesService.getScriptProperties().getProperty('API_TOKEN');
  if (!tokenValido || p.token !== tokenValido) {
    return HtmlService.createHtmlOutput('<p style="font-family:sans-serif;padding:24px">Este link no tiene autorización.</p>');
  }
  const t = HtmlService.createTemplateFromFile('SobrantesPantalla');
  t.token = p.token;
  return t.evaluate()
    .setTitle('Tu Huerta – Sobrantes')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function stockSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(STOCK_SPREADSHEET_ID);
  let sheet = ss.getSheetByName(STOCK_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(STOCK_SHEET_NAME);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Devuelve lo último que se cargó, para que la pantalla arranque con esos valores.
function getSobrantes(token) {
  exigirToken_(token);
  const sheet = stockSheet_();
  const last = sheet.getLastRow();
  if (last < 2) return { items: [], actualizado: '' };
  const values = sheet.getRange(2, 1, last - 1, 6).getValues();
  const items = values
    .filter(r => r[0] !== '')
    .map(r => ({ producto: String(r[0]), unidad: String(r[1]), cantidad: Number(r[2]) || 0 }));
  const fecha = values[0][5];
  const actualizado = fecha instanceof Date
    ? Utilities.formatDate(fecha, Session.getScriptTimeZone(), 'dd/MM HH:mm')
    : String(fecha || '');
  return { items, actualizado };
}

// Reemplaza la pestaña "Stock" con lo que se cargó ahora (solo lo que es > 0).
function guardarSobrantes(token, items) {
  exigirToken_(token);
  return guardarSobrantesInterno_(items);
}

function guardarSobrantesInterno_(items) {
  const sheet = stockSheet_();
  const ahora = new Date();
  const rows = (items || [])
    .filter(it => Number(it.cantidad) > 0)
    .map(it => {
      const qty = Number(it.cantidad);
      const base = stockNormalize_(qty, it.unidad);
      return [it.producto, it.unidad, qty, base.unit, base.qty, ahora];
    });

  sheet.clearContents();
  const headers = ['Producto', 'Unidad (catálogo)', 'Cantidad', 'Unidad base', 'Cantidad base', 'Actualizado'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  if (rows.length) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
    sheet.getRange(2, 6, rows.length, 1).setNumberFormat('dd/mm/yyyy hh:mm');
  }
  // Al cambiar el stock, se recalcula la columna SUGERIDO del "Resumen del día".
  try { rebuildResumenPorCategoria(); } catch (e) { console.log('Resumen: ' + e); }
  return { ok: true, guardados: rows.length,
    actualizado: Utilities.formatDate(ahora, Session.getScriptTimeZone(), 'dd/MM HH:mm') };
}

// Misma conversión que usa la hoja "Items" (normalizeUnit), copiada con otro
// nombre para no chocar con la original: "1/2 kg" → kg, "c/u" → unidad,
// "125 g" → g, "2 kg" → kg, etc.
function stockNormalize_(qty, unit) {
  const raw = String(unit || '').trim();
  const aliases = { atados: 'atado', maples: 'maple', unidades: 'unidad', petacas: 'petaca', kilos: 'kg' };
  if (raw === '½ kg' || raw === '1/2 kg') return { qty: qty * 0.5, unit: 'kg' };
  if (raw === 'c/u') return { qty, unit: 'unidad' };
  const paquete = raw.match(/^(\d+)\s+(.+)$/);
  if (paquete) {
    const factor = parseInt(paquete[1], 10);
    return { qty: qty * factor, unit: aliases[paquete[2]] || paquete[2] };
  }
  return { qty, unit: raw };
}

// ---------------------------------------------------------------------------
// Columna SUGERIDO del "Resumen del día": lo pedido (todo lo que está en la
// hoja Pedidos) menos el último conteo de la pestaña Stock. Se compara cada
// unidad por separado (kg con kg, unidades con unidades).
// ---------------------------------------------------------------------------
const SUG_CONTABLES_ = ['unidad', 'atado', 'bolsa', 'paquete'];

function sugUnidad_(producto, unidad, cant) {
  let p = String(producto || '').trim(), u = String(unidad || '').trim(), q = Number(cant) || 0;
  if (u === 'u' || u === 'c/u' || u === 'unidades') u = 'unidad';
  if (u === 'petaca') { u = 'g'; q = q * 125; }   // arándanos: 1 petaca = 125 g
  if (u === 'maple') u = 'maple 30 u';             // oferta "2 maples" = maples de 30
  if (p === 'Huevos') p = 'Huevo especial';        // la oferta de huevos es de Huevo especial
  return { p, u, q };
}

// Lee la pestaña Stock: producto → { unidad: cantidad }.
function leerStock_() {
  const stock = {};
  const sh = stockSheet_();
  const last = sh.getLastRow();
  if (last >= 2) {
    sh.getRange(2, 1, last - 1, 5).getValues().forEach(r => {
      if (r[0] === '') return;
      const x = sugUnidad_(r[0], r[3], Number(String(r[4]).replace(',', '.')));
      stock[x.p] = stock[x.p] || {};
      stock[x.p][x.u] = (stock[x.p][x.u] || 0) + x.q;
    });
  }
  return stock;
}

// En qué unidad del stock se busca lo pedido (un atado / bolsa también se pide como "unidad").
function claveStock_(s, u) {
  if (s[u] === undefined && SUG_CONTABLES_.indexOf(u) >= 0) {
    return SUG_CONTABLES_.filter(c => s[c] !== undefined)[0] || u;
  }
  return u;
}

// Columna STOCK del resumen: cuánto hay de cada producto, en las mismas
// unidades en que se pidió (0 si no hay nada cargado).
function stockTextoResumen_(totales) {
  const stock = leerStock_();
  const out = {};
  Object.keys(totales).forEach(producto => {
    const partes = [];
    Object.keys(totales[producto]).forEach(unidad => {
      const x = sugUnidad_(producto, unidad, totales[producto][unidad]);
      if (x.u === 'caja') return;
      const s = stock[x.p] || {};
      const hay = s[claveStock_(s, x.u)] || 0;
      partes.push(formatoNumeroResumen(hay) + ' ' + (x.u === 'unidad' ? 'u' : x.u));
    });
    out[producto] = partes.length ? partes.join(' + ') : '—';
  });
  return out;
}

function sugeridosResumen_(totales) {
  const stock = leerStock_();

  const out = {};
  Object.keys(totales).forEach(producto => {
    const partes = [];
    let armar = false;
    Object.keys(totales[producto]).forEach(unidad => {
      const x = sugUnidad_(producto, unidad, totales[producto][unidad]);
      if (x.u === 'caja') { armar = true; return; } // canastas: se arman con lo de stock
      const s = stock[x.p] || {};
      const clave = claveStock_(s, x.u);
      const hay = s[clave] || 0;
      const usa = Math.min(hay, x.q);
      if (s[clave] !== undefined) s[clave] = hay - usa; // no contar dos veces el mismo stock
      const falta = Math.round((x.q - usa) * 100) / 100;
      if (falta > 0) partes.push(formatoNumeroResumen(falta) + ' ' + (x.u === 'unidad' ? 'u' : x.u));
    });
    if (partes.length) out[producto] = 'Comprar ' + partes.join(' + ');
    else out[producto] = armar ? 'Armar canasta' : '✓ Alcanza';
  });
  return out;
}
