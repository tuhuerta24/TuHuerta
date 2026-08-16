// ==== Tu Huerta · Fuente única de datos de productos ====
// La usan tanto script.js (sitio de pedidos) como admin.js (panel de administración).
// Precios tomados del "Listado de precios de la semana" (carpeta Catalogo).

const CATEGORIES = [
  { id: 'frutas',      label: 'Frutas',      emoji: '🍊' },
  { id: 'verduras',    label: 'Verduras',    emoji: '🥬' },
  { id: 'ofertas',     label: 'Ofertas',     emoji: '🏷️', desc: 'Precios especiales por tiempo limitado.' },
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
  { id: 'banana', image: 'assets/p-banana.jpg',          emoji: '🍌', name: 'Banana',             cat: 'frutas', unit: 'kg',     price: 75 },
  { id: 'banana-ecuador', image: 'assets/p-banana-ecuador.jpg',  emoji: '🍌', name: 'Banana Ecuador',     cat: 'frutas', unit: 'kg',     price: 129 },
  { id: 'manzana-roja', image: 'assets/p-manzana-roja.jpg',    emoji: '🍎', name: 'Manzana Roja',       cat: 'frutas', unit: 'kg',     price: 129 },
  { id: 'manzana-verde', image: 'assets/p-manzana-verde.jpg',   emoji: '🍏', name: 'Manzana Verde',      cat: 'frutas', unit: 'kg',     price: 129 },
  { id: 'manzana-pl', image: 'assets/p-manzana-pl.jpg',      emoji: '🍎', name: 'Manzana Pink Lady',  cat: 'frutas', unit: 'kg',     price: 135 },
  { id: 'naranja', image: 'assets/p-naranja.jpg',         emoji: '🍊', name: 'Naranja',            cat: 'frutas', unit: 'kg',     price: 59 },
  { id: 'limon', image: 'assets/p-limon.jpg',           emoji: '🍋', name: 'Limón',              cat: 'frutas', unit: 'kg',     price: 69 },
  { id: 'mandarina', image: 'assets/p-mandarina.jpg',       emoji: '🍊', name: 'Mandarina',          cat: 'frutas', unit: 'kg',     price: 69 },
  { id: 'palta', image: 'assets/p-palta.jpg',           emoji: '🥑', name: 'Palta',              cat: 'frutas', unit: 'c/u',    price: 69 },
  { id: 'pera', image: 'assets/p-pera.jpg',            emoji: '🍐', name: 'Pera',               cat: 'frutas', unit: 'kg',     price: 119 },
  { id: 'pomelo', image: 'assets/p-pomelo.jpg',          emoji: '🍈', name: 'Pomelo Rosado',      cat: 'frutas', unit: 'kg',     price: 99 },
  { id: 'kiwi', image: 'assets/p-kiwi.jpg',            emoji: '🥝', name: 'Kiwi',               cat: 'frutas', unit: '1/2 kg', price: 160 },
  { id: 'lima', image: 'assets/p-lima.jpg',            emoji: '🍋', name: 'Lima',               cat: 'frutas', unit: '1/2 kg', price: 89 },
  { id: 'anana', image: 'assets/p-anana.jpg',           emoji: '🍍', name: 'Ananá',              cat: 'frutas', unit: 'c/u',    price: 199 },
  { id: 'frutilla', image: 'assets/p-frutilla.jpg',        emoji: '🍓', name: 'Frutilla',           cat: 'frutas', unit: '1/2 kg', price: 145 },
  { id: 'mango', image: 'assets/p-mango.jpg',           emoji: '🥭', name: 'Mango',              cat: 'frutas', unit: 'c/u',    price: 135 },
  { id: 'arandanos', image: 'assets/p-arandanos.jpg',       emoji: '🫐', name: 'Arándanos',          cat: 'frutas', unit: '125 g',  price: 169 },
  { id: 'melon', image: 'assets/p-melon.jpg',           emoji: '🍈', name: 'Melón',              cat: 'frutas', unit: 'kg',     price: 99 },
  { id: 'uva', image: 'assets/p-uva.jpg',             emoji: '🍇', name: 'Uva sin Semilla',    cat: 'frutas', unit: '1/2 kg', price: 189 },

  // ---- Verduras ----
  { id: 'ajo', image: 'assets/p-ajo.jpg',              emoji: '🧄', name: 'Ajo',               cat: 'verduras', unit: 'c/u',    price: 40 },
  { id: 'acelga', image: 'assets/p-acelga.jpg',           emoji: '🥬', name: 'Acelga',            cat: 'verduras', unit: 'c/u',    price: 75 },
  { id: 'apio', image: 'assets/p-apio.jpg',             emoji: '🌿', name: 'Apio',              cat: 'verduras', unit: 'atado',  price: 49 },
  { id: 'albahaca', image: 'assets/p-albahaca.jpg',         emoji: '🌿', name: 'Albahaca',          cat: 'verduras', unit: 'bolsa',  price: 89 },
  { id: 'boniato-criollo', image: 'assets/p-boniato-criollo.jpg',  emoji: '🍠', name: 'Boniato Criollo',   cat: 'verduras', unit: 'kg',     price: 119 },
  { id: 'boniato-zanahoria', image: 'assets/p-boniato-zanahoria.jpg',emoji: '🍠', name: 'Boniato Zanahoria', cat: 'verduras', unit: 'kg',     price: 119 },
  { id: 'brocoli', image: 'assets/p-brocoli.jpg',          emoji: '🥦', name: 'Brócoli',           cat: 'verduras', unit: 'c/u',    price: 99 },
  { id: 'berenjena', image: 'assets/p-berenjena.jpg',        emoji: '🍆', name: 'Berenjena',         cat: 'verduras', unit: 'kg',     price: 189 },
  { id: 'cebolla', image: 'assets/p-cebolla.jpg',          emoji: '🧅', name: 'Cebolla',           cat: 'verduras', unit: 'kg',     price: 95 },
  { id: 'cebolla-colorada', image: 'assets/p-cebolla-colorada.jpg', emoji: '🧅', name: 'Cebolla Colorada',  cat: 'verduras', unit: 'kg',     price: 89 },
  { id: 'cebolla-verdeo', image: 'assets/p-cebolla-verdeo.jpg',   emoji: '🧅', name: 'Cebolla de Verdeo', cat: 'verduras', unit: 'atado',  price: 99 },
  { id: 'calabacin', image: 'assets/p-calabacin.jpg',        emoji: '🥒', name: 'Calabacín',         cat: 'verduras', unit: 'kg',     price: 65 },
  { id: 'choclo', image: 'assets/p-choclo.jpg',           emoji: '🌽', name: 'Choclo',            cat: 'verduras', unit: 'c/u',    price: 69 },
  { id: 'tomate-cherry', image: 'assets/p-tomate-cherry.jpg',    emoji: '🍅', name: 'Tomate Cherry',     cat: 'verduras', unit: '1/2 kg', price: 149 },
  { id: 'chaucha', image: 'assets/p-chaucha.jpg',          emoji: '🫛', name: 'Chaucha',           cat: 'verduras', unit: '1/2 kg', price: 0 },
  { id: 'coliflor', image: 'assets/p-coliflor.jpg',         emoji: '🥦', name: 'Coliflor',          cat: 'verduras', unit: 'c/u',    price: 99 },
  { id: 'espinaca', image: 'assets/p-espinaca.jpg',         emoji: '🥬', name: 'Espinaca',          cat: 'verduras', unit: 'atado',  price: 79 },
  { id: 'inspirada', image: 'assets/p-inspirada.jpeg',         emoji: '🥬', name: 'inspirada',          cat: 'verduras', unit: 'c/u',     price: 190 },
  { id: 'jengibre', image: 'assets/p-jengibre.jpg',         emoji: '🌿', name: 'Jengibre',          cat: 'verduras', unit: '100 g',  price: 28 },
  { id: 'lechuga', image: 'assets/p-lechuga.jpg',          emoji: '🥬', name: 'Lechuga',           cat: 'verduras', unit: 'c/u',    price: 59 },
  { id: 'lechuga-crespa', image: 'assets/p-lechuga-crespa.jpg',   emoji: '🥬', name: 'Lechuga Crespa',    cat: 'verduras', unit: 'c/u',    price: 59 },
  { id: 'morron-rojo', image: 'assets/p-morron-rojo.jpg',      emoji: '🫑', name: 'Morrón Rojo',       cat: 'verduras', unit: 'kg',     price: 299 },
  { id: 'morron-verde', image: 'assets/p-morron-verde.jpg',     emoji: '🫑', name: 'Morrón Verde',      cat: 'verduras', unit: 'kg',     price: 199 },
  { id: 'morron-amarillo', image: 'assets/p-morron-amarillo.jpg',  emoji: '🫑', name: 'Morrón Amarillo',   cat: 'verduras', unit: 'kg',     price: 0 },
  { id: 'nabo', image: 'assets/p-nabo.jpg',             emoji: '🥬', name: 'Nabo',              cat: 'verduras', unit: 'c/u',    price: 20 },
  { id: 'nabo-atado', image: 'assets/p-nabo-atado.jpg',       emoji: '🥬', name: 'Nabo (Atado 6-7u)', cat: 'verduras', unit: 'atado',  price: 150 },
  { id: 'papa', image: 'assets/p-papa.jpeg',             emoji: '🥔', name: 'Papa',              cat: 'verduras', unit: 'kg',     price: 89 },
  { id: 'puerro', image: 'assets/p-puerro.jpg',           emoji: '🧅', name: 'Puerro',            cat: 'verduras', unit: 'c/u',    price: 30 },
  { id: 'pepino', image: 'assets/p-pepino.jpg',           emoji: '🥒', name: 'Pepino',            cat: 'verduras', unit: 'kg',     price: 159 },
  { id: 'perejil', image: 'assets/p-perejil.jpg',          emoji: '🌿', name: 'Perejil',           cat: 'verduras', unit: 'atado',  price: 29 },
  { id: 'remolacha', image: 'assets/p-remolacha.jpg',        emoji: '🌿', name: 'Remolacha',         cat: 'verduras', unit: 'atado',  price: 139 },
  { id: 'rucula', image: 'assets/p-rucula.jpg',           emoji: '🌿', name: 'Rúcula',            cat: 'verduras', unit: 'atado',  price: 79 },
  { id: 'repollo', image: 'assets/p-repollo.jpg',          emoji: '🥬', name: 'Repollo',           cat: 'verduras', unit: 'c/u',    price: 99 },
  { id: 'rabanito', image: 'assets/p-rabanito.jpg',         emoji: '🥬', name: 'Rabanito',          cat: 'verduras', unit: 'atado',  price: 0 },
  { id: 'tomate', image: 'assets/p-tomate.jpg',           emoji: '🍅', name: 'Tomate',            cat: 'verduras', unit: 'kg',     price: 149 },
  { id: 'tomate-perita', image: 'assets/p-tomate-perita.jpg',    emoji: '🍅', name: 'Tomate Perita',     cat: 'verduras', unit: 'kg',     price: 0 },
  { id: 'zapallo-cabutia', image: 'assets/p-zapallo-cabutia.jpg',  emoji: '🎃', name: 'Zapallo Cabutiá',   cat: 'verduras', unit: 'kg',     price: 65 },
  { id: 'zapallito', image: 'assets/p-zapallito.jpg',        emoji: '🥒', name: 'Zapallito',         cat: 'verduras', unit: 'kg',     price: 199 },
  { id: 'zanahoria', image: 'assets/p-zanahoria.jpg',        emoji: '🥕', name: 'Zanahoria',         cat: 'verduras', unit: 'kg',     price: 69 },
  { id: 'zucchini', image: 'assets/p-zucchini.jpg',         emoji: '🥒', name: 'Zucchini',          cat: 'verduras', unit: 'kg',     price: 199 },
  

  // ---- Ofertas (precios especiales por tiempo limitado, reutilizan fotos existentes) ----
  // parentId/parentQty relacionan cada oferta con su producto "padre" del catálogo
  // general: el precio tachado se recalcula solo a partir del precio actual del padre
  // (precio del padre × parentQty), así que si el admin actualiza el precio base,
  // el tachado de la oferta se actualiza también sin tocar esta sección.
  { id: 'oferta-boniato-zanahoria', image: 'assets/p-boniato-zanahoria.jpg', emoji: '🍠', name: 'Boniato Zanahoria', cat: 'ofertas', unit: '2 kg',      price: 220, parentId: 'boniato-zanahoria', parentQty: 2 },
  { id: 'oferta-banana', image: 'assets/p-banana.jpg',                emoji: '🍌', name: 'Banana',            cat: 'ofertas', unit: '2 kg',      price: 139, parentId: 'banana', parentQty: 2 },
  { id: 'oferta-espinaca', image: 'assets/p-espinaca.jpg',             emoji: '🥬', name: 'Espinaca',          cat: 'ofertas', unit: '2 atados',  price: 149, parentId: 'espinaca', parentQty: 2 },
  { id: 'oferta-cebolla', image: 'assets/p-cebolla.jpg',              emoji: '🧅', name: 'Cebolla',           cat: 'ofertas', unit: '2 kg',      price: 179, parentId: 'cebolla', parentQty: 2 },
  { id: 'oferta-huevos', image: 'assets/p-huevo-maple.jpg',           emoji: '🥚', name: 'Huevos',            cat: 'ofertas', unit: '2 maples',  price: 499, parentId: 'huevo-especial', parentQty: 2 },
  { id: 'oferta-mandarina', image: 'assets/p-mandarina.jpg',           emoji: '🍊', name: 'Mandarina',         cat: 'ofertas', unit: '2 kg',      price: 120, parentId: 'mandarina', parentQty: 2 },
  { id: 'oferta-naranja', image: 'assets/p-naranja.jpg',              emoji: '🍊', name: 'Naranja',           cat: 'ofertas', unit: '3 kg',      price: 149, parentId: 'naranja', parentQty: 3 },
  { id: 'oferta-manzana-roja', image: 'assets/p-manzana-roja.jpg',        emoji: '🍎', name: 'Manzana Roja',      cat: 'ofertas', unit: '2 kg',      price: 249, parentId: 'manzana-roja', parentQty: 2 },
  { id: 'oferta-manzana-verde', image: 'assets/p-manzana-verde.jpg',       emoji: '🍏', name: 'Manzana Verde',     cat: 'ofertas', unit: '2 kg',      price: 249, parentId: 'manzana-verde', parentQty: 2 },
  { id: 'oferta-papa', image: 'assets/p-papa.jpeg',                  emoji: '🥔', name: 'Papa',              cat: 'ofertas', unit: '3 kg',      price: 245, parentId: 'papa', parentQty: 3 },
  { id: 'oferta-papin', image: 'assets/p-papa.jpeg',                 emoji: '🥔', name: 'Papín',             cat: 'ofertas', unit: '3 kg',      price: 99 },
  { id: 'oferta-palta', image: 'assets/p-palta.jpg',                 emoji: '🥑', name: 'Palta',             cat: 'ofertas', unit: '3 unidades', price: 179, parentId: 'palta', parentQty: 3 },
  { id: 'oferta-pera', image: 'assets/p-pera.jpg',                  emoji: '🍐', name: 'Pera',              cat: 'ofertas', unit: '2 kg',      price: 209, parentId: 'pera', parentQty: 2 },
  { id: 'oferta-puerro', image: 'assets/p-puerro.jpg',                emoji: '🧅', name: 'Puerro',            cat: 'ofertas', unit: '6 unidades', price: 179, parentId: 'puerro', parentQty: 6 },
  { id: 'oferta-zanahoria', image: 'assets/p-zanahoria.jpg',            emoji: '🥕', name: 'Zanahoria',         cat: 'ofertas', unit: '2 kg',      price: 129, parentId: 'zanahoria', parentQty: 2 },
  { id: 'oferta-zucchini', image: 'assets/p-zucchini.jpg',             emoji: '🥒', name: 'Zucchini',          cat: 'ofertas', unit: '2 kg',      price: 378, parentId: 'zucchini', parentQty: 2 },
  { id: 'oferta-acelga', image: 'assets/p-acelga.jpg',                emoji: '🥬', name: 'Acelga',            cat: 'ofertas', unit: '2 atados',  price: 139, parentId: 'acelga', parentQty: 2 },
  { id: 'oferta-arandanos', image: 'assets/p-arandanos.jpg',            emoji: '🫐', name: 'Arándanos',         cat: 'ofertas', unit: '2 petacas', price: 299, parentId: 'arandanos', parentQty: 2 },
  { id: 'oferta-tomate', image: 'assets/p-tomate.jpg',                emoji: '🍅', name: 'Tomate',            cat: 'ofertas', unit: '2 kg',      price: 289, parentId: 'tomate', parentQty: 2 },

  // ---- Terra Verde (línea de productos orgánicos elaborados) ----
  {
    id: 'tv-aceite', name: 'Aceite de Oliva Virgen Extra Orgánico', cat: 'terra-verde',
    unit: '1 L', price: 1050, image: 'assets/terra-aceite-oliva.jpg',
    desc: 'Sabor intenso, aroma fresco. Variedad Picual.',
  },
  {
    id: 'tv-coco', image: 'assets/p-tv-coco.jpg', name: 'Aceite de Coco Orgánico', cat: 'terra-verde',
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

  // ---- Canastas (armadas, a precio fijo · envío gratis) ----
  {
    id: 'canasta-esencial', name: 'Canasta Esencial', cat: 'canastas',
    unit: 'caja', price: 1190, image: 'assets/p-canasta-esencial.jpg',
    desc: 'Incluye: 1 ajo · 1k banana · ½k boniato · 1 calabacín · ½k cebolla · 15 huevos especiales · rúcula · acelga · ½k limón · 1k naranja · 1k papa · 1k mandarina · 1k manzana red · ½k tomate · ½k zanahoria. Envío gratis.',
  },
  {
    id: 'canasta-inteligente', name: 'Canasta Inteligente', cat: 'canastas',
    unit: 'caja', price: 990, image: 'assets/p-canasta-inteligente.jpg',
    desc: 'Incluye: 1 ajo · brócoli · 1k banana · 1k boniato · 1k cebolla · lechuga · 1k naranja · 1k mandarina · 1k manzana · ½k morrón · 1k papa · ½k zanahoria · calabacín · 1k berenjena · rúcula. Envío gratis.',
  },
  {
    id: 'canasta-familiar', name: 'Canasta Familiar', cat: 'canastas',
    unit: 'caja', price: 1590, image: 'assets/p-canasta-familiar.jpg',
    desc: 'Incluye: 2 acelgas · 2k banana · 1k boniato · 1 calabacín · 1k cebolla · 1 lechuga crespa · ½k limón · 1k naranja · 1k manzana roja premium · ½k manzana verde premium · ½k morrón · 1k papa rosada premium · 1k tomate · 6 puerros · ½k zanahoria · ½k zapallito · 1k mandarina. Envío gratis.',
  },

  // ---- Otros (hierbas, miel, quesos) ----
  { id: 'ciboulette', image: 'assets/p-ciboulette.jpg',      emoji: '🌿', name: 'Ciboulette',        cat: 'otros', unit: 'atado', price: 99 },
  { id: 'brotes-soja', image: 'assets/p-brotes-soja.jpg',     emoji: '🌱', name: 'Brotes de Soja',    cat: 'otros', unit: 'bolsa', price: 249 },
  { id: 'kale', image: 'assets/p-kale.jpg',            emoji: '🥬', name: 'Kale',              cat: 'otros', unit: 'atado', price: 65 },
  { id: 'cilantro', image: 'assets/p-cilantro.jpg',        emoji: '🌿', name: 'Cilantro',          cat: 'otros', unit: 'atado', price: 99 },
  { id: 'romero', image: 'assets/p-romero.jpg',          emoji: '🌿', name: 'Romero',            cat: 'otros', unit: 'atado', price: 65 },
  { id: 'laurel', image: 'assets/p-laurel.jpg',          emoji: '🌿', name: 'Laurel',            cat: 'otros', unit: 'atado', price: 60 },
  { id: 'miel-500', image: 'assets/p-miel-500.jpg',        emoji: '🍯', name: 'Miel',              cat: 'otros', unit: '1/2 kg', price: 175 },
  { id: 'miel-1kg', image: 'assets/p-miel-500.jpg',        emoji: '🍯', name: 'Miel',              cat: 'otros', unit: '1 kg',   price: 299 },
  { id: 'queso-colonia', image: 'assets/p-queso-colonia.jpg',   emoji: '🧀', name: 'Queso Colonia',     cat: 'otros', unit: '1/2 kg', price: 259 },
  { id: 'queso-parmesano', image: 'assets/p-queso-parmesano.jpg', emoji: '🧀', name: 'Queso Parmesano',   cat: 'otros', unit: '1/2 kg', price: 330 },

  // ---- Congelados ----
  { id: 'frutilla-congelada', image: 'assets/p-frutilla-congelada.jpg', emoji: '🍓', name: 'Frutillas Congeladas', cat: 'congelados', unit: '1 kg', price: 279 },

  // ---- Huevos ----
  // Tres productos distintos (Jumbo, Extra, Especial). Cada uno con su única
  // opción de cantidad: maple de 30 u (preseleccionado) o de 15 u.
  {
    id: 'huevo-jumbo', image: 'assets/p-huevo-maple.jpg', emoji: '🥚', name: 'Huevo Jumbo', cat: 'huevos',
    defaultVariant: '30u',
    variants: [
      { key: '30u', label: '30 u', unit: 'maple 30 u', price: 349 },
      { key: '15u', label: '15 u', unit: 'maple 15 u', price: 189 },
    ],
  },
  {
    id: 'huevo-extra', image: 'assets/p-huevo-maple.jpg', emoji: '🥚', name: 'Huevo Extra', cat: 'huevos',
    defaultVariant: '30u',
    variants: [
      { key: '30u', label: '30 u', unit: 'maple 30 u', price: 309 },
      { key: '15u', label: '15 u', unit: 'maple 15 u', price: 169 },
    ],
  },
  {
    id: 'huevo-especial', image: 'assets/p-huevo-maple.jpg', emoji: '🥚', name: 'Huevo especial', cat: 'huevos',
    defaultVariant: '30u',
    variants: [
      { key: '30u', label: '30 u', unit: 'maple 30 u', price: 289 },
      { key: '15u', label: '15 u', unit: 'maple 15 u', price: 159 },
    ],
  },
  {
    id: 'huevo-blanco', image: 'assets/p-huevo-maple-blanco.jpeg', emoji: '🥚', name: 'Huevo blanco', cat: 'huevos',
    defaultVariant: '30u',
    variants: [
      { key: '30u', label: '30 u', unit: 'maple 30 u', price: 289 },
    ],
  },

  // ---- Especias ----
  // Cada especia es un único producto con 3 presentaciones seleccionables.
  {
    id: 'especia-ajo-molido', image: 'assets/p-especia-ajo-molido.jpg', emoji: '🧂', name: 'Ajo Molido', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 149 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 99 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 85 },
    ],
  },
  {
    id: 'especia-canela-rama', image: 'assets/p-especia-canela-rama.jpg', emoji: '🧂', name: 'Canela en Rama', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 540 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 295 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 0 },
    ],
  },
  {
    id: 'especia-canela-molida', image: 'assets/p-especia-canela-molida.jpg', emoji: '🧂', name: 'Canela Molida', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 395 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 215 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 138 },
    ],
  },
  {
    id: 'especia-cond-verde', image: 'assets/p-especia-cond-verde.jpg', emoji: '🧂', name: 'Condimento Verde', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 244 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 130 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 85 },
    ],
  },
  {
    id: 'especia-curcuma', image: 'assets/p-especia-curcuma.jpg', emoji: '🧂', name: 'Cúrcuma', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 268 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 139 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 46 },
    ],
  },
  {
    id: 'especia-nuez-moscada', image: 'assets/p-especia-nuez-moscada.jpg', emoji: '🧂', name: 'Nuez Moscada', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 519 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 275 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 99 },
    ],
  },
  {
    id: 'especia-oregano', image: 'assets/p-especia-oregano.jpg', emoji: '🧂', name: 'Orégano', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 130 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 68 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 49 },
    ],
  },
  {
    id: 'especia-pimenton', image: 'assets/p-especia-pimenton.jpg', emoji: '🧂', name: 'Pimentón', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 195 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 105 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 47 },
    ],
  },
  {
    id: 'especia-pimienta-negra', image: 'assets/p-especia-pimienta-negra.jpg', emoji: '🧂', name: 'Pimienta Negra Molida', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 260 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 135 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 55 },
    ],
  },
  {
    id: 'especia-tomillo', image: 'assets/p-especia-tomillo.jpg', emoji: '🧂', name: 'Tomillo', cat: 'especias',
    defaultVariant: '500g',
    variants: [
      { key: '500g', label: '1/2 kilo', unit: '1/2 kg', price: 170 },
      { key: '250g', label: '250 grs',  unit: '250 g',  price: 90 },
      { key: '50g',  label: '50 grs',   unit: '50 g',   price: 45 },
    ],
  },

  // ---- Sal Marina (empresa asociada) ----
  { id: 'sal-pimienta-200', image: 'assets/p-sal-pimienta-200.jpg', emoji: '🧂', name: 'Sal con Pimienta Negra (4 granos)', cat: 'sal-marina', unit: '200 g', price: 199 },
  { id: 'sal-pimienta-500', image: 'assets/p-sal-pimienta-500.jpg', emoji: '🧂', name: 'Sal con Pimienta Negra (4 granos)', cat: 'sal-marina', unit: '500 g', price: 420 },
  { id: 'sal-ajo', image: 'assets/p-sal-ajo.jpg',          emoji: '🧂', name: 'Sal con Ajo',                       cat: 'sal-marina', unit: '180 g', price: 330 },
  { id: 'sal-ahumada', image: 'assets/p-sal-ahumada.jpg',      emoji: '🧂', name: 'Sal Ahumada Ancestral',             cat: 'sal-marina', unit: '150 g', price: 410 },
  { id: 'sal-oro', image: 'assets/p-sal-oro.jpg',          emoji: '🧂', name: 'Sal de Oro',                        cat: 'sal-marina', unit: '150 g', price: 359 },
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
const DEFAULT_PRODUCTS_UPDATED_AT = '2026-07-20T18:00:00.000Z';

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
