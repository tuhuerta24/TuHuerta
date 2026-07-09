// ==== Tu Huerta · Panel de administración ====
// Nota: sitio 100% estático (sin servidor). Los cambios se guardan en localStorage,
// por lo que solo se ven en el navegador donde se editaron. Para publicarlos a todo
// el mundo hay que usar "Copiar código para publicar" y pegarlo en products-data.js.
// El acceso a esta página se protege solo por tener una URL difícil de adivinar
// (fcejasTuHuerta), no por una contraseña real: no la compartas ni la enlaces
// desde el sitio público.

const $ = id => document.getElementById(id);

let products = [];

function categoryOptionsHTML(selected) {
  return CATEGORIES.map(c =>
    `<option value="${c.id}" ${c.id === selected ? 'selected' : ''}>${c.label}</option>`
  ).join('');
}

function renderDataSourceNote() {
  const el = $('dataSourceNote');
  el.textContent = hasCustomProducts()
    ? 'Mostrando datos guardados en este navegador (con tus últimos cambios).'
    : 'Mostrando los valores originales del código (todavía no guardaste cambios en este navegador).';
}

function renderTable() {
  renderDataSourceNote();
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

function cartesianCombos(groups) {
  let combos = [{ keys: [], labels: [] }];
  groups.forEach(g => {
    const next = [];
    combos.forEach(c => {
      g.options.forEach(o => {
        next.push({ keys: [...c.keys, o.key], labels: [...c.labels, o.label] });
      });
    });
    combos = next;
  });
  return combos;
}

function rowHTML(p, i) {
  const hasVariants = Array.isArray(p.variants) && p.variants.length > 0;
  const hasGroups = Array.isArray(p.variantGroups) && p.variantGroups.length > 0;

  const unitCell = hasVariants
    ? `<span class="variant-unit-note">según opción →</span>`
    : `<input type="text" data-field="unit" data-index="${i}" value="${escapeAttr(p.unit || '')}">`;

  let priceCell;
  if (hasVariants) {
    priceCell = `<div class="variant-price-editor">${p.variants.map((v, j) => `
        <label class="variant-price-row">
          <span>${escapeAttr(v.label)}</span>
          <input type="number" min="0" step="1" data-field="variant-price" data-index="${i}" data-vindex="${j}" value="${v.price ?? 0}">
        </label>`).join('')}</div>`;
  } else if (hasGroups) {
    const combos = cartesianCombos(p.variantGroups);
    priceCell = `<div class="variant-price-editor">${combos.map(c => {
      const priceKey = c.keys.join('|');
      const current = (p.prices && p.prices[priceKey] != null) ? p.prices[priceKey] : 0;
      return `
        <label class="variant-price-row">
          <span>${escapeAttr(c.labels.join(' · '))}</span>
          <input type="number" min="0" step="1" data-field="group-price" data-index="${i}" data-pricekey="${escapeAttr(priceKey)}" value="${current}">
        </label>`;
    }).join('')}</div>`;
  } else {
    priceCell = `<input type="number" min="0" step="1" data-field="price" data-index="${i}" value="${p.price ?? 0}">`;
  }

  return `
    <tr>
      <td>
        <select data-field="cat" data-index="${i}">${categoryOptionsHTML(p.cat)}</select>
      </td>
      <td><input type="text" data-field="name" data-index="${i}" value="${escapeAttr(p.name || '')}"></td>
      <td>${unitCell}</td>
      <td>${priceCell}</td>
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
    if (field === 'variant-price') {
      const j = Number(el.dataset.vindex);
      products[i].variants[j].price = Math.max(0, Number(el.value) || 0);
    } else if (field === 'group-price') {
      if (!products[i].prices) products[i].prices = {};
      products[i].prices[el.dataset.pricekey] = Math.max(0, Number(el.value) || 0);
    } else if (field === 'price') {
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

// ---------- Inicio ----------
products = loadProducts();
renderTable();
$('addProductBtn').addEventListener('click', addProduct);
$('saveBtn').addEventListener('click', handleSave);
$('resetBtn').addEventListener('click', handleReset);
$('exportBtn').addEventListener('click', openExportDialog);
$('closeExportBtn').addEventListener('click', () => $('exportDialog').close());
$('copyExportBtn').addEventListener('click', copyExportText);
