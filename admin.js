// ==== Tu Huerta · Panel de administración ====
// Nota: sitio 100% estático (sin servidor). Los cambios se guardan en localStorage,
// por lo que solo se ven en el navegador donde se editaron. Para publicarlos a todo
// el mundo hay que usar "Copiar código para publicar" y pegarlo en products-data.js.

const ADMIN_PIN = '2468';
const SESSION_KEY = 'tuhuerta_admin_session';

const $ = id => document.getElementById(id);

let products = [];

// ---------- Portón de acceso ----------
function tryUnlock(pin) {
  if (pin === ADMIN_PIN) {
    sessionStorage.setItem(SESSION_KEY, '1');
    $('gate').hidden = true;
    $('panel').hidden = false;
    initPanel();
    return true;
  }
  return false;
}

$('gateForm').addEventListener('submit', e => {
  e.preventDefault();
  const ok = tryUnlock($('pinInput').value.trim());
  $('gateError').hidden = ok;
  if (!ok) { $('pinInput').select(); }
});

if (sessionStorage.getItem(SESSION_KEY) === '1') {
  $('gate').hidden = true;
  $('panel').hidden = false;
  initPanel();
}

// ---------- Panel ----------
function initPanel() {
  products = loadProducts();
  renderTable();

  $('addProductBtn').addEventListener('click', addProduct);
  $('saveBtn').addEventListener('click', handleSave);
  $('resetBtn').addEventListener('click', handleReset);
  $('exportBtn').addEventListener('click', openExportDialog);
  $('closeExportBtn').addEventListener('click', () => $('exportDialog').close());
  $('copyExportBtn').addEventListener('click', copyExportText);
}

function categoryOptionsHTML(selected) {
  return CATEGORIES.map(c =>
    `<option value="${c.id}" ${c.id === selected ? 'selected' : ''}>${c.label}</option>`
  ).join('');
}

function renderTable() {
  const body = $('productsBody');
  body.innerHTML = products.map((p, i) => rowHTML(p, i)).join('');
  body.querySelectorAll('.row-delete-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.index);
      const removed = products[i];
      if (confirm(`¿Eliminar "${removed.name || '(sin nombre)'}"? Esto no se guarda hasta que apretes "Guardar cambios".`)) {
        products.splice(i, 1);
        renderTable();
      }
    })
  );
}

function rowHTML(p, i) {
  return `
    <tr>
      <td>
        <select data-field="cat" data-index="${i}">${categoryOptionsHTML(p.cat)}</select>
      </td>
      <td><input type="text" data-field="name" data-index="${i}" value="${escapeAttr(p.name || '')}"></td>
      <td><input type="text" data-field="unit" data-index="${i}" value="${escapeAttr(p.unit || '')}"></td>
      <td><input type="number" min="0" step="1" data-field="price" data-index="${i}" value="${p.price ?? 0}"></td>
      <td class="col-desc"><input type="text" data-field="desc" data-index="${i}" value="${escapeAttr(p.desc || '')}"></td>
      <td><input type="text" data-field="emoji" data-index="${i}" value="${escapeAttr(p.emoji || '')}"></td>
      <td class="col-image"><input type="text" data-field="image" data-index="${i}" value="${escapeAttr(p.image || '')}"></td>
      <td><button type="button" class="row-delete-btn" data-index="${i}" aria-label="Eliminar producto">✕</button></td>
    </tr>`;
}

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function addProduct() {
  products.push({
    id: 'nuevo-' + Date.now(),
    name: '', cat: CATEGORIES[0].id, unit: 'kg', price: 0, emoji: '🆕',
  });
  renderTable();
  const rows = $('productsBody').querySelectorAll('tr');
  rows[rows.length - 1].querySelector('input[data-field="name"]').focus();
}

function readTableIntoProducts() {
  $('productsBody').querySelectorAll('input, select').forEach(el => {
    const i = Number(el.dataset.index);
    const field = el.dataset.field;
    if (field === 'price') {
      products[i][field] = Math.max(0, Number(el.value) || 0);
    } else if (field === 'emoji' || field === 'image' || field === 'desc') {
      const v = el.value.trim();
      if (v) products[i][field] = v; else delete products[i][field];
    } else {
      products[i][field] = el.value.trim();
    }
  });
  // Genera un id estable para productos nuevos sin uno usable, a partir del nombre.
  const seen = new Set();
  products.forEach(p => {
    if (!p.id || p.id.startsWith('nuevo-')) {
      const base = (p.name || 'producto').toLowerCase()
        .normalize('NFD').replace(new RegExp('[̀-ͯ]', 'g'), '')
        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'producto';
      let id = base, n = 2;
      while (seen.has(id)) { id = `${base}-${n++}`; }
      p.id = id;
    }
    seen.add(p.id);
  });
}

function handleSave() {
  readTableIntoProducts();
  const missingName = products.some(p => !p.name);
  if (missingName) {
    setStatus('Hay productos sin nombre. Completalos antes de guardar.', true);
    return;
  }
  saveProducts(products);
  renderTable();
  setStatus('Cambios guardados en este navegador. Ya se ven en el sitio (acá).');
}

function handleReset() {
  if (!confirm('¿Restablecer todos los productos a los valores originales? Se pierden los cambios guardados en este navegador.')) return;
  resetProducts();
  products = loadProducts();
  renderTable();
  setStatus('Valores originales restablecidos.');
}

function setStatus(msg, isError) {
  const el = $('statusMsg');
  el.textContent = msg;
  el.style.color = isError ? '#B93E12' : '';
  clearTimeout(setStatus._t);
  setStatus._t = setTimeout(() => { el.textContent = ''; }, 6000);
}

// ---------- Exportar código para publicar ----------
function openExportDialog() {
  readTableIntoProducts();
  const code = `const DEFAULT_PRODUCTS = ${JSON.stringify(products, null, 2)};`;
  $('exportText').value = code;
  $('exportDialog').showModal();
}

function copyExportText() {
  const ta = $('exportText');
  ta.select();
  navigator.clipboard && navigator.clipboard.writeText(ta.value)
    .then(() => setStatus('Código copiado al portapapeles.'))
    .catch(() => document.execCommand('copy'));
}
