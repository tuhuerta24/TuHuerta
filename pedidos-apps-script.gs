// Tu Huerta — recibe los pedidos del sitio y los guarda en la hoja "Pedidos".
// Este archivo se pega en el editor de Apps Script de la planilla (no se ejecuta
// en el sitio). Ver instrucciones de despliegue en la conversación con Claude.

const SHEET_NAME = 'Pedidos';
const ITEMS_SHEET_NAME = 'Items';
const SUMMARY_SHEET_NAME = 'Resumen del día';

function doPost(e) {
  const sheet = getOrCreateSheet();
  const data = JSON.parse(e.postData.contents);
  const fecha = new Date();

  const detalle = (data.items || [])
    .map(it => `${it.qty}x ${it.name} (${it.unit}) — $${it.price}`)
    .join('\n');

  sheet.appendRow([
    fecha,
    data.nombre || '',
    data.direccion || '',
    data.comentarios || '',
    data.pago || '',
    detalle,
    data.total || 0
  ]);

  const row = sheet.getLastRow();
  sheet.getRange(row, 1, 1, 7).setBorder(true, true, true, true, true, true);
  sheet.getRange(row, 1).setNumberFormat('dd/mm/yyyy hh:mm');
  sheet.getRange(row, 6).setWrap(true);
  sheet.getRange(row, 7).setNumberFormat('$#,##0');

  appendItemRows(fecha, data.items || []);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Guarda cada producto del pedido en su propia fila (hoja "Items"), para poder
// sumar cantidades por producto y unidad de medida (la hoja "Pedidos" solo
// tiene el detalle como texto, no sirve para sumar automáticamente).
function appendItemRows(fecha, items) {
  if (!items.length) return;
  const sheet = getOrCreateItemsSheet();
  const rows = items.map(it => {
    const norm = normalizeUnit(it.qty, it.unit);
    return [fecha, it.name, norm.unit, norm.qty];
  });
  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, 4).setValues(rows);
}

// Las ofertas se venden en paquetes (ej. "2 kg", "6 unidades") que en el fondo
// son la misma unidad de medida que el producto suelto, solo que empaquetada.
// Esto convierte esos paquetes a su equivalente en la unidad base (cantidad
// del paquete × cantidad pedida) para que se sumen juntos en el resumen del
// día (ej. "1 pedido de 2 kg" pasa a contar como "2 kg").
const UNIT_ALIASES = { atados: 'atado', maples: 'maple', unidades: 'unidad', petacas: 'petaca', kilos: 'kg' };

function normalizeUnit(qty, unit) {
  const raw = String(unit || '').trim();

  if (raw === '½ kg' || raw === '1/2 kg') return { qty: qty * 0.5, unit: 'kg' };
  if (raw === 'c/u') return { qty, unit: 'unidad' }; // "c/u" y "unidad" son lo mismo

  const paquete = raw.match(/^(\d+)\s+(.+)$/); // ej. "2 kg", "6 unidades", "3 unidades"
  if (paquete) {
    const factor = parseInt(paquete[1], 10);
    const base = UNIT_ALIASES[paquete[2]] || paquete[2];
    return { qty: qty * factor, unit: base };
  }

  return { qty, unit: raw };
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet) return sheet;

  sheet = ss.insertSheet(SHEET_NAME);
  const headers = ['Fecha', 'Cliente', 'Dirección', 'Comentarios', 'Pago', 'Detalle del pedido', 'Total'];
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBorder(true, true, true, true, true, true);
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 130);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 220);
  sheet.setColumnWidth(4, 160);
  sheet.setColumnWidth(5, 110);
  sheet.setColumnWidth(6, 380);
  sheet.setColumnWidth(7, 80);
  return sheet;
}

function getOrCreateItemsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(ITEMS_SHEET_NAME);
  if (sheet) return sheet;

  sheet = ss.insertSheet(ITEMS_SHEET_NAME);
  sheet.appendRow(['Fecha', 'Producto', 'Unidad', 'Cantidad']);
  sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  sheet.setFrozenRows(1);
  return sheet;
}

// ---------------------------------------------------------------------------
// Ejecutar UNA sola vez a mano desde el editor (desplegable de funciones, al
// lado del botón "Debug" → elegir "setupExtras" → Run). Deja armadas la hoja
// "Resumen del día" y los totales de dinero recaudado en "Pedidos". No hace
// falta volver a correrla salvo que se borren esas hojas/celdas por error.
// ---------------------------------------------------------------------------
function setupExtras() {
  const pedidos = getOrCreateSheet();
  pedidos.getRange('I1').setValue('Total recaudado hoy').setFontWeight('bold');
  pedidos.getRange('J1').setFormula('=SUMIFS(G:G, A:A, ">="&TODAY(), A:A, "<"&(TODAY()+1))').setNumberFormat('$#,##0');
  pedidos.getRange('I2').setValue('Total recaudado (histórico)').setFontWeight('bold');
  pedidos.getRange('J2').setFormula('=SUM(G2:G)').setNumberFormat('$#,##0');
  pedidos.autoResizeColumn(9);
  pedidos.autoResizeColumn(10);

  getOrCreateItemsSheet();

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let resumen = ss.getSheetByName(SUMMARY_SHEET_NAME);
  if (!resumen) resumen = ss.insertSheet(SUMMARY_SHEET_NAME);
  resumen.clear();

  resumen.getRange('A1:B1').setValues([['Producto', 'Cantidades pedidas hoy']]);
  resumen.getRange('A1:B1').setFontWeight('bold').setBorder(true, true, true, true, true, true);
  resumen.setFrozenRows(1);

  // Columnas E:H (ocultas): desglose de apoyo por producto + unidad, una fila
  // por combinación. A partir de acá se arma la vista final de A:B.
  resumen.getRange('E1:H1').setValues([['Producto', 'Unidad', 'Cantidad', 'Etiqueta']]);
  resumen.getRange('E2').setFormula(
    `=IFERROR(QUERY(Items!A2:D, "select B, C, sum(D) where A >= date '"&TEXT(TODAY(),"yyyy-mm-dd")&"' and A < date '"&TEXT(TODAY()+1,"yyyy-mm-dd")&"' group by B, C order by B label sum(D) ''", 0), "")`
  );
  // Columna H: "cantidad x unidad" de cada fila de arriba (ej. "7.5 x kg"), ya
  // armada, para no tener que repetir esa concatenación al buscar coincidencias.
  resumen.getRange('H2').setFormula('=ARRAYFORMULA(IF(E2:E="", "", G2:G&" x "&F2:F))');

  // Columna A: cada producto una sola vez.
  resumen.getRange('A2').setFormula('=IFERROR(UNIQUE(FILTER(E2:E, E2:E<>"")), "")');

  // Columna B: todas las unidades pedidas hoy para ese producto, concatenadas
  // en la misma celda (ej: "3 x kg, 6 x unidad"). FILTER trae TODAS las filas
  // de H que correspondan a ese producto (a diferencia de un IF fila por fila,
  // que solo agarraba la primera coincidencia). Se escribe la misma fórmula en
  // 300 filas de antemano para que alcance sin importar cuántos productos
  // distintos haya un día dado; las filas sin producto en A quedan en blanco.
  const MAX_ROWS = 300;
  const formulas = [];
  for (let i = 0; i < MAX_ROWS; i++) {
    const row = i + 2;
    formulas.push([`=IF(A${row}="", "", TEXTJOIN(", ", TRUE, IFERROR(FILTER($H$2:$H, $E$2:$E=A${row}), "")))`]);
  }
  resumen.getRange(2, 2, MAX_ROWS, 1).setFormulas(formulas);

  resumen.setColumnWidth(1, 200);
  resumen.setColumnWidth(2, 420);
  resumen.hideColumns(5, 4);
}
