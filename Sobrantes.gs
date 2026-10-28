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
