// ==== Tu Huerta · Opción 8 — Catálogo con precios reales ====
// Los productos viven en products-data.js (fuente compartida con el panel de admin).
const PRODUCTS = loadProducts();
const WHATSAPP = '59895064328';

let cart = {};            // cartKey -> cantidad
// productId -> selección de variante. String para productos con "variants" (una sola
// opción, ej.: tamaño de especia). Objeto {grupo: opción} para productos con
// "variantGroups" (varias opciones independientes, ej.: cantidad + calidad de huevos).
let selectedVariant = {};
let search = '';
let lastFocused = null;

const $ = id => document.getElementById(id);
const productById = id => PRODUCTS.find(p => p.id === id);
const matches = p => p.name.toLowerCase().includes(search);

// ---------- Variantes de una sola opción (ej.: especias por tamaño) ----------
function activeVariantKey(p) {
  if (!p.variants) return null;
  return selectedVariant[p.id] || p.defaultVariant || p.variants[0].key;
}

function activeVariant(p) {
  const key = activeVariantKey(p);
  return key ? p.variants.find(v => v.key === key) : null;
}

// ---------- Variantes de varios grupos independientes (ej.: huevos por cantidad y calidad) ----------
function selectedGroupOptions(p) {
  const sel = (selectedVariant[p.id] && typeof selectedVariant[p.id] === 'object') ? selectedVariant[p.id] : {};
  const result = {};
  p.variantGroups.forEach(g => { result[g.key] = sel[g.key] || g.default || g.options[0].key; });
  return result;
}

function groupPriceKey(p, options) {
  return p.variantGroups.map(g => options[g.key]).join('|');
}

function cartKeyFor(p) {
  if (Array.isArray(p.variantGroups)) {
    return `${p.id}::${groupPriceKey(p, selectedGroupOptions(p))}`;
  }
  const key = activeVariantKey(p);
  return key ? `${p.id}::${key}` : p.id;
}

// Resuelve una clave del carrito (con o sin variante) a sus datos de nombre/unidad/precio.
function resolveCartLine(cartKey) {
  const sep = cartKey.indexOf('::');
  const pid = sep === -1 ? cartKey : cartKey.slice(0, sep);
  const rest = sep === -1 ? null : cartKey.slice(sep + 2);
  const p = productById(pid);

  if (rest !== null && Array.isArray(p.variantGroups)) {
    const parts = rest.split('|');
    const labels = p.variantGroups.map((g, i) => {
      const opt = g.options.find(o => o.key === parts[i]);
      return opt ? opt.label : parts[i];
    });
    return { product: p, name: p.name, unit: `${p.unit} · ${labels.join(', ')}`, price: p.prices[rest] };
  }

  const variant = rest !== null ? p.variants.find(v => v.key === rest) : null;
  return {
    product: p,
    name: p.name,
    unit: variant ? variant.unit : p.unit,
    price: variant ? variant.price : p.price,
  };
}

// ---------- Render del catálogo ----------
function renderGrids() {
  document.querySelectorAll('.product-grid').forEach(grid => {
    const list = PRODUCTS.filter(p => p.cat === grid.dataset.cat && matches(p));
    grid.innerHTML = list.map(cardHTML).join('');
  });
  bindCards();
  toggleEmptyState();
}

function cardHTML(p) {
  const hasGroups = Array.isArray(p.variantGroups) && p.variantGroups.length > 0;
  const hasVariants = !hasGroups && Array.isArray(p.variants) && p.variants.length > 0;
  const variant = hasVariants ? activeVariant(p) : null;
  const groupSelection = hasGroups ? selectedGroupOptions(p) : null;
  const cartKey = cartKeyFor(p);
  const price = hasGroups ? p.prices[groupPriceKey(p, groupSelection)] : (hasVariants ? variant.price : p.price);
  const unit = hasVariants ? variant.unit : p.unit;
  const qty = cart[cartKey] || 0;

  const priceHTML = price > 0
    ? `<span class="price">$${price}</span>`
    : `<span class="price consult">Precio a consultar</span>`;

  const action = qty > 0
    ? `<div class="qty-control" role="group" aria-label="Cantidad de ${p.name}">
         <button type="button" data-id="${cartKey}" data-d="-1" aria-label="Quitar una unidad de ${p.name}">−</button>
         <span class="qty" aria-live="polite">${qty}</span>
         <button type="button" data-id="${cartKey}" data-d="1" aria-label="Agregar una unidad de ${p.name}">+</button>
       </div>`
    : `<button type="button" class="add-btn" data-add="${cartKey}">Agregar<span class="visually-hidden"> ${p.name} al pedido</span></button>`;

  const visual = p.image
    ? `<img class="card-img" src="${p.image}" alt="" loading="lazy">`
    : `<span class="emoji" aria-hidden="true">${p.emoji}</span>`;
  const desc = p.desc ? `<p class="card-desc">${p.desc}</p>` : '';

  let variantOptions = '';
  if (hasVariants) {
    variantOptions = `
      <div class="variant-options" role="radiogroup" aria-label="Presentación de ${p.name}">
        ${p.variants.map(v => `
          <label class="variant-option">
            <input type="radio" name="variant-${p.id}" value="${v.key}" data-variant-product="${p.id}" ${v.key === variant.key ? 'checked' : ''}>
            <span>${v.label}</span>
          </label>`).join('')}
      </div>`;
  } else if (hasGroups) {
    variantOptions = p.variantGroups.map(g => `
      <div class="variant-options" role="radiogroup" aria-label="${g.label} de ${p.name}">
        <span class="variant-group-label">${g.label}:</span>
        ${g.options.map(o => `
          <label class="variant-option">
            <input type="radio" name="variant-${p.id}-${g.key}" value="${o.key}"
              data-variant-product="${p.id}" data-variant-group="${g.key}"
              ${groupSelection[g.key] === o.key ? 'checked' : ''}>
            <span>${o.label}</span>
          </label>`).join('')}
      </div>`).join('');
  }

  return `
    <li class="card">
      ${visual}
      <h3>${p.name}</h3>
      <span class="unit">por ${unit}</span>
      ${desc}
      ${variantOptions}
      ${priceHTML}
      <div class="card-action">${action}</div>
    </li>`;
}

function bindCards() {
  document.querySelectorAll('[data-add]').forEach(b =>
    b.addEventListener('click', () => { cart[b.dataset.add] = 1; refresh(); }));
  document.querySelectorAll('.card-action [data-d]').forEach(b =>
    b.addEventListener('click', () => changeQty(b.dataset.id, parseInt(b.dataset.d))));
  document.querySelectorAll('input[data-variant-product]').forEach(r =>
    r.addEventListener('change', () => {
      const pid = r.dataset.variantProduct;
      if (r.dataset.variantGroup) {
        selectedVariant[pid] = (selectedVariant[pid] && typeof selectedVariant[pid] === 'object') ? selectedVariant[pid] : {};
        selectedVariant[pid][r.dataset.variantGroup] = r.value;
      } else {
        selectedVariant[pid] = r.value;
      }
      renderGrids();
    }));
}

function changeQty(cartKey, d) {
  cart[cartKey] = (cart[cartKey] || 0) + d;
  if (cart[cartKey] <= 0) delete cart[cartKey];
  refresh();
}

function toggleEmptyState() {
  const visible = PRODUCTS.filter(matches);
  $('emptySearch').hidden = visible.length > 0;
  document.querySelectorAll('.cat-section').forEach(sec => {
    const cat = sec.querySelector('.product-grid').dataset.cat;
    sec.hidden = !PRODUCTS.some(p => p.cat === cat && matches(p));
  });
  $('resultCount').textContent = search
    ? `${visible.length} producto${visible.length === 1 ? '' : 's'} encontrado${visible.length === 1 ? '' : 's'}`
    : '';
}

// ---------- Carrito ----------
function updateCartUI() {
  const keys = Object.keys(cart);
  const count = keys.reduce((s, k) => s + cart[k], 0);
  $('cartCount').textContent = count;
  $('cartCountSr').textContent = `${count} producto${count === 1 ? '' : 's'} en el pedido`;

  const cont = $('cartItems');
  if (keys.length === 0) {
    cont.innerHTML = '<p class="empty-msg">Todavía no agregaste productos.<br>Volvé al catálogo y sumá lo que necesites.</p>';
  } else {
    cont.innerHTML = keys.map(key => {
      const line = resolveCartLine(key);
      const p = line.product;
      const visual = p.image
        ? `<img class="ci-img" src="${p.image}" alt="" loading="lazy">`
        : `<span class="ci-emoji" aria-hidden="true">${p.emoji}</span>`;
      return `
        <div class="cart-item">
          ${visual}
          <div class="ci-info">
            <h4>${line.name}</h4>
            <span>${line.price > 0 ? '$' + line.price : 'a consultar'} · por ${line.unit}</span>
          </div>
          <div class="ci-controls">
            <button type="button" data-id="${key}" data-d="-1" aria-label="Quitar una unidad de ${line.name}">−</button>
            <span class="ci-qty">${cart[key]}</span>
            <button type="button" data-id="${key}" data-d="1" aria-label="Agregar una unidad de ${line.name}">+</button>
            <button type="button" class="ci-remove" data-remove="${key}" aria-label="Eliminar ${line.name} del pedido">✕</button>
          </div>
        </div>`;
    }).join('');
    cont.querySelectorAll('[data-d]').forEach(b =>
      b.addEventListener('click', () => changeQty(b.dataset.id, parseInt(b.dataset.d))));
    cont.querySelectorAll('[data-remove]').forEach(b =>
      b.addEventListener('click', () => { delete cart[b.dataset.remove]; refresh(); }));
  }

  const total = keys.reduce((s, k) => s + resolveCartLine(k).price * cart[k], 0);
  const hasConsult = keys.some(k => resolveCartLine(k).price === 0);
  $('cartTotal').textContent = '$' + total + (hasConsult ? ' +' : '');
  $('checkoutBtn').disabled = keys.length === 0;

  // Barra resumen (móvil)
  const bar = $('summaryBar');
  bar.hidden = keys.length === 0;
  $('summaryCount').textContent = `${count} producto${count === 1 ? '' : 's'}`;
  $('summaryTotal').textContent = '$' + total + (hasConsult ? ' +' : '');
}

function refresh() { renderGrids(); updateCartUI(); }

// ---------- Enviar pedido ----------
$('orderForm').addEventListener('submit', e => {
  e.preventDefault();
  const keys = Object.keys(cart);
  if (keys.length === 0) return;

  const nombre = $('fName').value.trim();
  const direccion = $('fAddress').value.trim();
  const notas = $('fNotes').value.trim();
  // El submit del form nativo ya exige que haya un método de pago elegido (required),
  // así que acá siempre hay uno seleccionado.
  const pago = document.querySelector('input[name="pago"]:checked').value;
  const total = keys.reduce((s, k) => s + resolveCartLine(k).price * cart[k], 0);

  let msg = `¡Hola Tu Huerta! Soy ${nombre} y quiero hacer este pedido:\n\n`;
  keys.forEach(k => {
    const line = resolveCartLine(k);
    const sub = line.price > 0 ? ` — $${line.price * cart[k]}` : ' — a consultar';
    msg += `• ${cart[k]} x ${line.name} (${line.unit})${sub}\n`;
  });
  msg += `\nTotal aprox: $${total}\n`;
  msg += `\nMétodo de pago: ${pago}\n`;
  msg += `Entrega en: ${direccion}\n`;
  if (notas) msg += `Comentarios: ${notas}\n`;
  msg += `\n¿Coordinamos día y horario de entrega?`;

  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

// ---------- Buscador ----------
$('searchInput').addEventListener('input', e => {
  search = e.target.value.toLowerCase().trim();
  renderGrids();
});

// ---------- Drawer accesible ----------
const drawer = $('cartDrawer');
const overlay = $('cartOverlay');

function openCart() {
  lastFocused = document.activeElement;
  drawer.hidden = false;
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  $('closeCart').focus();
}
function closeCart() {
  drawer.hidden = true;
  overlay.hidden = true;
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

$('cartBtn').addEventListener('click', openCart);
$('summaryOpen').addEventListener('click', openCart);
$('closeCart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

document.addEventListener('keydown', e => {
  if (drawer.hidden) return;
  if (e.key === 'Escape') { closeCart(); return; }
  // Foco atrapado dentro del drawer
  if (e.key === 'Tab') {
    const focusables = drawer.querySelectorAll('button:not(:disabled), input, textarea, a[href]');
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

refresh();
