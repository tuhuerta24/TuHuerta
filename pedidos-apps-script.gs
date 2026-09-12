// Tu Huerta — recibe los pedidos del sitio y los guarda en la hoja "Pedidos".
// Este archivo se pega en el editor de Apps Script de la planilla (no se ejecuta
// en el sitio). Ver instrucciones de despliegue en la conversación con Claude.

const SHEET_NAME = 'Pedidos';

function doPost(e) {
  const sheet = getOrCreateSheet();
  const data = JSON.parse(e.postData.contents);

  const detalle = (data.items || [])
    .map(it => `${it.qty}x ${it.name} (${it.unit}) — $${it.price}`)
    .join('\n');

  sheet.appendRow([
    new Date(),
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

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
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
