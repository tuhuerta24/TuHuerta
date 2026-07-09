// ==== Tu Huerta · Fuente única de datos de productos ====
// La usan tanto script.js (sitio de pedidos) como admin.js (panel de administración).
// Precios tomados del "Listado de precios de la semana" (carpeta Catalogo).

const CATEGORIES = [
  { id: 'frutas',      label: 'Frutas',      emoji: '🍊' },
  { id: 'verduras',    label: 'Verduras',    emoji: '🥬' },
  { id: 'terra-verde', label: 'Terra Verde', emoji: '🌿', desc: 'Línea de productos orgánicos elaborados.' },
  { id: 'canastas',    label: 'Canastas',    emoji: '🧺', desc: 'Cajones armados con lo mejor de la huerta, a precio fijo.' },
  { id: 'otros',       label: 'Otros',       emoji: '🌱', desc: 'Hierbas frescas, miel y quesos.' },
  { id: 'congelados',  label: 'Congelados',  emoji: '❄️' },
  { id: 'huevos',      label: 'Huevos',      emoji: '🥚', desc: 'Consultar precio mayorista.' },
  { id: 'especias',    label: 'Especias',    emoji: '🧂' },
  { id: 'sal-marina',  label: 'Sal Marina',  emoji: '🌊', desc: 'Sales artesanales de una empresa asociada.' },
];

// Los marcadores @DEFAULT_PRODUCTS delimitan el bloque de datos que el panel de
// admin regenera al "Descargar archivo para publicar". No los borres ni muevas.
/* @DEFAULT_PRODUCTS:start */
const DEFAULT_PRODUCTS = [
  // ---- Frutas ----
  { id: 'banana',          emoji: '🍌', name: 'Banana',             cat: 'frutas', unit: 'kg',     price: 79 },
  { id: 'banana-ecuador',  emoji: '🍌', name: 'Banana Ecuador',     cat: 'frutas', unit: 'kg',     price: 129 },
  { id: 'manzana-roja',    emoji: '🍎', name: 'Manzana Roja',       cat: 'frutas', unit: 'kg',     price: 129 },
  { id: 'manzana-verde',   emoji: '🍏', name: 'Manzana Verde',      cat: 'frutas', unit: 'kg',     price: 129 },
  { id: 'manzana-pl',      emoji: '🍎', name: 'Manzana Pink Lady',  cat: 'frutas', unit: 'kg',     price: 0 },
  { id: 'naranja',         emoji: '🍊', name: 'Naranja',            cat: 'frutas', unit: 'kg',     price: 59 },
  { id: 'limon',           emoji: '🍋', name: 'Limón',              cat: 'frutas', unit: 'kg',     price: 89 },
  { id: 'mandarina',       emoji: '🍊', name: 'Mandarina',          cat: 'frutas', unit: 'kg',     price: 69 },
  { id: 'palta',           emoji: '🥑', name: 'Palta',              cat: 'frutas', unit: 'c/u',    price: 69 },
  { id: 'pera',            emoji: '🍐', name: 'Pera',               cat: 'frutas', unit: 'kg',     price: 119 },
  { id: 'pomelo',          emoji: '🍈', name: 'Pomelo Rosado',      cat: 'frutas', unit: 'kg',     price: 159 },
  { id: 'kiwi',            emoji: '🥝', name: 'Kiwi',               cat: 'frutas', unit: '1/2 kg', price: 160 },
  { id: 'lima',            emoji: '🍋', name: 'Lima',               cat: 'frutas', unit: '1/2 kg', price: 89 },
  { id: 'anana',           emoji: '🍍', name: 'Ananá',              cat: 'frutas', unit: 'c/u',    price: 199 },
  { id: 'frutilla',        emoji: '🍓', name: 'Frutilla',           cat: 'frutas', unit: '1/2 kg', price: 199 },
  { id: 'mango',           emoji: '🥭', name: 'Mango',              cat: 'frutas', unit: 'c/u',    price: 99 },
  { id: 'arandanos',       emoji: '🫐', name: 'Arándanos',          cat: 'frutas', unit: '125 g',  price: 169 },
  { id: 'melon',           emoji: '🍈', name: 'Melón',              cat: 'frutas', unit: 'kg',     price: 99 },
  { id: 'uva',             emoji: '🍇', name: 'Uva sin Semilla',    cat: 'frutas', unit: '1/2 kg', price: 199 },

  // ---- Verduras ----
  { id: 'ajo',              emoji: '🧄', name: 'Ajo',               cat: 'verduras', unit: 'c/u',    price: 40 },
  { id: 'acelga',           emoji: '🥬', name: 'Acelga',            cat: 'verduras', unit: 'c/u',    price: 69 },
  { id: 'apio',             emoji: '🌿', name: 'Apio',              cat: 'verduras', unit: 'atado',  price: 69 },
  { id: 'albahaca',         emoji: '🌿', name: 'Albahaca',          cat: 'verduras', unit: 'bolsa',  price: 69 },
  { id: 'boniato-criollo',  emoji: '🍠', name: 'Boniato Criollo',   cat: 'verduras', unit: 'kg',     price: 109 },
  { id: 'boniato-zanahoria',emoji: '🍠', name: 'Boniato Zanahoria', cat: 'verduras', unit: 'kg',     price: 109 },
  { id: 'brocoli',          emoji: '🥦', name: 'Brócoli',           cat: 'verduras', unit: 'c/u',    price: 99 },
  { id: 'berenjena',        emoji: '🍆', name: 'Berenjena',         cat: 'verduras', unit: 'kg',     price: 129 },
  { id: 'cebolla',          emoji: '🧅', name: 'Cebolla',           cat: 'verduras', unit: 'kg',     price: 69 },
  { id: 'cebolla-colorada', emoji: '🧅', name: 'Cebolla Colorada',  cat: 'verduras', unit: 'kg',     price: 79 },
  { id: 'cebolla-verdeo',   emoji: '🧅', name: 'Cebolla de Verdeo', cat: 'verduras', unit: 'atado',  price: 99 },
  { id: 'calabacin',        emoji: '🥒', name: 'Calabacín',         cat: 'verduras', unit: 'kg',     price: 55 },
  { id: 'choclo',           emoji: '🌽', name: 'Choclo',            cat: 'verduras', unit: 'c/u',    price: 69 },
  { id: 'tomate-cherry',    emoji: '🍅', name: 'Tomate Cherry',     cat: 'verduras', unit: '1/2 kg', price: 149 },
  { id: 'chaucha',          emoji: '🫛', name: 'Chaucha',           cat: 'verduras', unit: '1/2 kg', price: 0 },
  { id: 'coliflor',         emoji: '🥦', name: 'Coliflor',          cat: 'verduras', unit: 'c/u',    price: 99 },
  { id: 'espinaca',         emoji: '🥬', name: 'Espinaca',          cat: 'verduras', unit: 'atado',  price: 79 },
  { id: 'jengibre',         emoji: '🌿', name: 'Jengibre',          cat: 'verduras', unit: '100 g',  price: 28 },
  { id: 'lechuga',          emoji: '🥬', name: 'Lechuga',           cat: 'verduras', unit: 'c/u',    price: 69 },
  { id: 'lechuga-crespa',   emoji: '🥬', name: 'Lechuga Crespa',    cat: 'verduras', unit: 'c/u',    price: 69 },
  { id: 'morron-rojo',      emoji: '🫑', name: 'Morrón Rojo',       cat: 'verduras', unit: 'kg',     price: 239 },
  { id: 'morron-verde',     emoji: '🫑', name: 'Morrón Verde',      cat: 'verduras', unit: 'kg',     price: 129 },
  { id: 'morron-amarillo',  emoji: '🫑', name: 'Morrón Amarillo',   cat: 'verduras', unit: 'kg',     price: 0 },
  { id: 'nabo',             emoji: '🥬', name: 'Nabo',              cat: 'verduras', unit: 'c/u',    price: 20 },
  { id: 'nabo-atado',       emoji: '🥬', name: 'Nabo (Atado 6-7u)', cat: 'verduras', unit: 'atado',  price: 150 },
  { id: 'papa',             emoji: '🥔', name: 'Papa',              cat: 'verduras', unit: 'kg',     price: 99 },
  { id: 'puerro',           emoji: '🧅', name: 'Puerro',            cat: 'verduras', unit: 'c/u',    price: 30 },
  { id: 'pepino',           emoji: '🥒', name: 'Pepino',            cat: 'verduras', unit: 'kg',     price: 129 },
  { id: 'perejil',          emoji: '🌿', name: 'Perejil',           cat: 'verduras', unit: 'atado',  price: 29 },
  { id: 'remolacha',        emoji: '🌿', name: 'Remolacha',         cat: 'verduras', unit: 'atado',  price: 139 },
  { id: 'rucula',           emoji: '🌿', name: 'Rúcula',            cat: 'verduras', unit: 'atado',  price: 79 },
  { id: 'repollo',          emoji: '🥬', name: 'Repollo',           cat: 'verduras', unit: 'c/u',    price: 99 },
  { id: 'rabanito',         emoji: '🥬', name: 'Rabanito',          cat: 'verduras', unit: 'atado',  price: 0 },
  { id: 'tomate',           emoji: '🍅', name: 'Tomate',            cat: 'verduras', unit: 'kg',     price: 189 },
  { id: 'tomate-perita',    emoji: '🍅', name: 'Tomate Perita',     cat: 'verduras', unit: 'kg',     price: 0 },
  { id: 'zapallo-cabutia',  emoji: '🎃', name: 'Zapallo Cabutiá',   cat: 'verduras', unit: 'kg',     price: 55 },
  { id: 'zapallito',        emoji: '🥒', name: 'Zapallito',         cat: 'verduras', unit: 'kg',     price: 149 },
  { id: 'zanahoria',        emoji: '🥕', name: 'Zanahoria',         cat: 'verduras', unit: 'kg',     price: 69 },
  { id: 'zucchini',         emoji: '🥒', name: 'Zucchini',          cat: 'verduras', unit: 'kg',     price: 189 },

  // ---- Terra Verde (línea de productos orgánicos elaborados) ----
  {
    id: 'tv-aceite', name: 'Aceite de Oliva Virgen Extra Orgánico', cat: 'terra-verde',
    unit: '1 L', price: 1050, image: 'assets/terra-aceite-oliva.jpg',
    desc: 'Sabor intenso, aroma fresco. Variedad Picual.',
  },
  {
    id: 'tv-coco', name: 'Aceite de Coco Orgánico', cat: 'terra-verde',
    unit: '200 g', price: 260, emoji: '🥥',
  },
  {
    id: 'tv-vinagre', name: 'Vinagre de Manzana Orgánico', cat: 'terra-verde',
    unit: '1 L', price: 460, image: 'assets/terra-vinagre-manzana.jpg',
    desc: 'Con cultivo madre, sin filtrar ni pasteurizar.',
  },
  {
    id: 'tv-yerba', name: 'Yerba Mate Orgánica', cat: 'terra-verde',
    unit: '1 kg', price: 260, image: 'assets/terra-yerba-mate.jpg',
    desc: 'Nativa, 100% natural. Sabor original.',
  },

  // ---- Canastas (cajones de tamaño fijo) ----
  {
    id: 'canasta-chica', name: 'Canasta Chica', cat: 'canastas',
    unit: 'caja', price: 690, image: 'assets/canasta.svg',
    desc: '4 frutas + 3 verduras de estación · aprox. 3 kg',
  },
  {
    id: 'canasta-mediana', name: 'Canasta Mediana', cat: 'canastas',
    unit: 'caja', price: 1090, image: 'assets/canasta.svg',
    desc: '6 frutas + 5 verduras de estación · aprox. 5 kg',
  },
  {
    id: 'canasta-familiar', name: 'Canasta Familiar', cat: 'canastas',
    unit: 'caja', price: 1590, image: 'assets/canasta.svg',
    desc: '8 frutas + 7 verduras de estación · aprox. 8 kg',
  },

  // ---- Otros (hierbas, miel, quesos) ----
  { id: 'ciboulette',      emoji: '🌿', name: 'Ciboulette',        cat: 'otros', unit: 'atado', price: 99 },
  { id: 'brotes-soja',     emoji: '🌱', name: 'Brotes de Soja',    cat: 'otros', unit: 'bolsa', price: 249 },
  { id: 'kale',            emoji: '🥬', name: 'Kale',              cat: 'otros', unit: 'atado', price: 65 },
  { id: 'cilantro',        emoji: '🌿', name: 'Cilantro',          cat: 'otros', unit: 'atado', price: 99 },
  { id: 'romero',          emoji: '🌿', name: 'Romero',            cat: 'otros', unit: 'atado', price: 65 },
  { id: 'laurel',          emoji: '🌿', name: 'Laurel',            cat: 'otros', unit: 'atado', price: 60 },
  { id: 'miel-500',        emoji: '🍯', name: 'Miel',              cat: 'otros', unit: '1/2 kg', price: 175 },
  { id: 'miel-1kg',        emoji: '🍯', name: 'Miel',              cat: 'otros', unit: '1 kg',   price: 299 },
  { id: 'queso-colonia',   emoji: '🧀', name: 'Queso Colonia',     cat: 'otros', unit: '1/2 kg', price: 259 },
  { id: 'queso-parmesano', emoji: '🧀', name: 'Queso Parmesano',   cat: 'otros', unit: '1/2 kg', price: 330 },

  // ---- Congelados ----
  { id: 'frutilla-congelada', emoji: '🍓', name: 'Frutillas Congeladas', cat: 'congelados', unit: '1 kg', price: 279 },

  // ---- Huevos ----
  // Tres productos distintos (Jumbo, Especial, Regular). Cada uno con su única
  // opción de cantidad: maple de 30 u (preseleccionado) o de 15 u.
  {
    id: 'huevo-jumbo', emoji: '🥚', name: 'Huevo Jumbo', cat: 'huevos',
    defaultVariant: '30u',
    variants: [
      { key: '30u', label: '30 u', unit: 'maple 30 u', price: 349 },
      { key: '15u', label: '15 u', unit: 'maple 15 u', price: 189 },
    ],
  },
  {
    id: 'huevo-especial', emoji: '🥚', name: 'Huevo Especial', cat: 'huevos',
    defaultVariant: '30u',
    variants: [
      { key: '30u', label: '30 u', unit: 'maple 30 u', price: 309 },
      { key: '15u', label: '15 u', unit: 'maple 15 u', price: 169 },
    ],
  },
  {
    id: 'huevo-regular', emoji: '🥚', name: 'Huevo Regular', cat: 'huevos',
    defaultVariant: '30u',
    variants: [
      { key: '30u', label: '30 u', unit: 'maple 30 u', price: 289 },
      { key: '15u', label: '15 u', unit: 'maple 15 u', price: 159 },
    ],
  },

  // ---- Especias ----
  // Cada especia es un único producto con 3 presentaciones seleccionables.
  {
    id: 'especia-ajo-molido', emoji: '🧂', name: 'Ajo Molido', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 149 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 99 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 85 },
    ],
  },
  {
    id: 'especia-canela-rama', emoji: '🧂', name: 'Canela en Rama', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 540 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 295 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 0 },
    ],
  },
  {
    id: 'especia-canela-molida', emoji: '🧂', name: 'Canela Molida', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 395 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 215 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 138 },
    ],
  },
  {
    id: 'especia-cond-verde', emoji: '🧂', name: 'Condimento Verde', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 244 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 130 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 85 },
    ],
  },
  {
    id: 'especia-curcuma', emoji: '🧂', name: 'Cúrcuma', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 268 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 139 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 46 },
    ],
  },
  {
    id: 'especia-nuez-moscada', emoji: '🧂', name: 'Nuez Moscada', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 519 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 275 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 99 },
    ],
  },
  {
    id: 'especia-oregano', emoji: '🧂', name: 'Orégano', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 130 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 68 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 49 },
    ],
  },
  {
    id: 'especia-pimenton', emoji: '🧂', name: 'Pimentón', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 195 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 105 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 47 },
    ],
  },
  {
    id: 'especia-pimienta-negra', emoji: '🧂', name: 'Pimienta Negra Molida', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 260 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 135 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 55 },
    ],
  },
  {
    id: 'especia-tomillo', emoji: '🧂', name: 'Tomillo', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 170 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 90 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 45 },
    ],
  },

  // ---- Sal Marina (empresa asociada) ----
  { id: 'sal-pimienta-200', emoji: '🧂', name: 'Sal con Pimienta Negra (4 granos)', cat: 'sal-marina', unit: '200 g', price: 199 },
  { id: 'sal-pimienta-500', emoji: '🧂', name: 'Sal con Pimienta Negra (4 granos)', cat: 'sal-marina', unit: '500 g', price: 420 },
  { id: 'sal-ajo',          emoji: '🧂', name: 'Sal con Ajo',                       cat: 'sal-marina', unit: '180 g', price: 330 },
  { id: 'sal-ahumada',      emoji: '🧂', name: 'Sal Ahumada Ancestral',             cat: 'sal-marina', unit: '150 g', price: 410 },
];
/* @DEFAULT_PRODUCTS:end */

const PRODUCTS_STORAGE_KEY = 'tuhuerta_products_v1';
// Subir este número cada vez que cambie la forma de DEFAULT_PRODUCTS (ej.: se agregan
// "variants"). Así, datos guardados en localStorage con una forma vieja se descartan
// solos en vez de pisar los productos nuevos del código con datos incompletos.
const PRODUCTS_DATA_VERSION = 4;

// Marca de tiempo de esta "publicación" del archivo. Como el sitio no tiene base de
// datos, esta fecha es la que dice qué versión es la más nueva: la que el admin
// descarga y sube a GitHub queda sellada con la fecha de ese momento. Al cargar,
// comparamos esta fecha contra la de los cambios guardados en el navegador y usamos
// la más reciente (ver loadProducts). El panel de admin regenera este valor al
// descargar el archivo — no lo edites a mano.
const DEFAULT_PRODUCTS_UPDATED_AT = '2026-07-08T00:00:00.000Z';

// Devuelve un timestamp comparable (número). Ante fechas inválidas, 0.
function _productsTime(iso) {
  const t = Date.parse(iso);
  return Number.isNaN(t) ? 0 : t;
}

function loadProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const usable = parsed && parsed.version === PRODUCTS_DATA_VERSION
        && Array.isArray(parsed.products) && parsed.products.length;
      // Solo usamos los cambios guardados en este navegador si son MÁS NUEVOS que el
      // archivo publicado. Si el archivo (subido a GitHub) es más reciente o igual,
      // gana el archivo: así una publicación hecha desde otro dispositivo pisa a un
      // localStorage viejo, y nunca al revés.
      if (usable && _productsTime(parsed.updatedAt) > _productsTime(DEFAULT_PRODUCTS_UPDATED_AT)) {
        return parsed.products;
      }
    }
  } catch (e) { /* localStorage no disponible o dato corrupto: usamos los valores por defecto */ }
  return DEFAULT_PRODUCTS.map(p => ({ ...p }));
}

function saveProducts(products, updatedAt) {
  const stamp = updatedAt || new Date().toISOString();
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify({
    version: PRODUCTS_DATA_VERSION, updatedAt: stamp, products,
  }));
  return stamp;
}

function resetProducts() {
  localStorage.removeItem(PRODUCTS_STORAGE_KEY);
}

function hasCustomProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return !!(parsed && parsed.version === PRODUCTS_DATA_VERSION
      && _productsTime(parsed.updatedAt) > _productsTime(DEFAULT_PRODUCTS_UPDATED_AT));
  } catch (e) {
    return false;
  }
}
