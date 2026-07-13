// Imagens reais recortadas do cardápio oficial (images/cardapio-space,.png),
// servidas de app/public/images/.
const img = (slug) => `/images/products/${slug}.png`

// Chips de categoria (filtro no topo do cardápio). 'orbita' = todos.
export const categories = [
  { id: 'orbita', label: 'Órbita' },
  { id: 'galactica', label: 'Galáctica' },
  { id: 'side', label: 'Side Missions' },
  { id: 'combustivel', label: 'Combustível' },
]

// UPGRADE PROPULSÃO — adicionais oficiais do cardápio.
export const addonsCatalog = [
  { id: 'bacon', name: 'Bacon', price: 7.0 },
  { id: 'cebola-caramelizada', name: 'Cebola Caramelizada', price: 4.0 },
  { id: 'cheddar-fatiado', name: 'Cheddar Fatiado (2 un)', price: 6.0 },
  { id: 'queijo-mussarela', name: 'Queijo Mussarela', price: 6.0 },
  { id: 'hamburguer-carne', name: 'Hambúrguer de Carne', price: 10.0 },
  { id: 'cheddar-cremoso', name: 'Cheddar Cremoso', price: 6.0 },
]

// section: 'featured' | 'side' | 'orbit' | 'combustivel'  -> controla a seção no cardápio
// category: usado pelo filtro de chips (galactica = lanches, combustivel = bebidas)
export const products = [
  {
    id: 'space-bacon',
    name: 'Space Bacon',
    section: 'featured',
    category: 'galactica',
    price: 24.99,
    code: 'MISSION-06',
    badge: 'Orbital Masterpiece',
    subtitle: 'Missão Galáctica',
    description: 'Pão, hambúrguer 140g, bacon e cebola caramelizada.',
    detailDescription: 'Pão, hambúrguer 140g, bacon e cebola caramelizada. Acompanha batata frita palito.',
    deliveryOnly: true,
    image: img('space-bacon'),
    hasAddons: true,
  },
  {
    id: 'space-kids',
    name: 'Space Kids',
    section: 'side',
    category: 'galactica',
    price: 15.99,
    code: 'MISSION-01',
    description: 'Pão, hambúrguer e queijo.',
    detailDescription: 'Pão, hambúrguer e queijo. A missão perfeita para pequenos astronautas.',
    image: img('space-kids'),
    hasAddons: true,
  },
  {
    id: 'space-smash-simples',
    name: 'Space Smash Simples',
    section: 'side',
    category: 'galactica',
    price: 17.99,
    code: 'MISSION-02',
    description: 'Pão, hambúrguer 80g, queijo, cheddar e picles.',
    detailDescription: 'Pão, hambúrguer 80g smash, queijo, cheddar e picles.',
    image: img('space-smash-simples'),
    hasAddons: true,
  },
  {
    id: 'space-salada',
    name: 'Space Salada',
    section: 'side',
    category: 'galactica',
    price: 19.99,
    code: 'MISSION-03',
    description: 'Pão, hambúrguer, queijo, alface, tomate e picles.',
    detailDescription: 'Pão, hambúrguer, queijo, alface, tomate e picles. Leve como gravidade zero.',
    image: img('space-salada'),
    hasAddons: true,
  },
  {
    id: 'space-doritos',
    name: 'Space Doritos',
    section: 'orbit',
    category: 'galactica',
    price: 29.99,
    code: 'MISSION-04',
    description: 'Pão, hambúrguer, queijo cheddar, alface, tomate e Doritos.',
    detailDescription: 'Pão, hambúrguer, queijo cheddar, alface, tomate e Doritos crocantes.',
    image: img('space-doritos'),
    hasAddons: true,
  },
  {
    id: 'space-cebola-caramelizada',
    name: 'Space Cebola Caramelizada',
    section: 'orbit',
    category: 'galactica',
    price: 22.99,
    code: 'MISSION-05',
    description: 'Pão, hambúrguer, queijo, cebola caramelizada e picles.',
    detailDescription: 'Pão, hambúrguer, queijo, cebola caramelizada e picles.',
    image: img('space-cebola-caramelizada'),
    hasAddons: true,
  },
  {
    id: 'space-frango',
    name: 'Space Frango',
    section: 'orbit',
    category: 'galactica',
    price: 23.99,
    code: 'MISSION-07',
    description: 'Pão, frango, alface, tomate e picles.',
    detailDescription: 'Pão, frango, alface, tomate e picles. Combustível leve para a órbita.',
    image: img('space-frango'),
    hasAddons: true,
  },
  {
    id: 'refri-lata',
    name: 'Refri Lata',
    section: 'combustivel',
    category: 'combustivel',
    price: 6.0,
    code: 'FUEL-01',
    description: 'Coca, Sprite, Fanta (350ml).',
    detailDescription: 'Combustível gelado para a viagem: Coca, Sprite ou Fanta (350ml).',
    image: img('refri-lata'),
    hasAddons: false,
  },
]

export function getProductById(id) {
  return products.find((p) => p.id === id)
}
