// Imagens reais recortadas do cardápio oficial (images/cardapio-space,.png),
// servidas de app/public/images/.
const img = (slug) => `/images/products/${slug}.png`

// Categorias exibidas como abas no cardápio.
export const categories = [
  { id: 'lanches', label: 'Lanches' },
  { id: 'porcoes', label: 'Porções' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'sobremesas', label: 'Sobremesas' },
]

// Adicionais oficiais do cardápio (checkbox no detalhe do produto).
export const addonsCatalog = [
  { id: 'bacon', name: 'Bacon', price: 7.0 },
  { id: 'cebola-caramelizada', name: 'Cebola Caramelizada', price: 4.0 },
  { id: 'cheddar-fatiado', name: 'Cheddar Fatiado (2 un)', price: 6.0 },
  { id: 'queijo-mussarela', name: 'Queijo Mussarela', price: 6.0 },
  { id: 'hamburguer-carne', name: 'Hambúrguer de Carne', price: 10.0 },
  { id: 'cheddar-cremoso', name: 'Cheddar Cremoso', price: 6.0 },
]

// category: usado pelas abas (lanches, porcoes, bebidas, sobremesas)
// featured: destaque exibido no topo da aba Lanches
export const products = [
  {
    id: 'space-bacon',
    name: 'Space Bacon',
    category: 'lanches',
    featured: true,
    price: 24.99,
    subtitle: 'O queridinho da casa',
    description: 'Pão, hambúrguer 140g, bacon e cebola caramelizada.',
    detailDescription: 'Pão, hambúrguer 140g, bacon e cebola caramelizada. Acompanha batata frita palito.',
    deliveryOnly: true,
    image: img('space-bacon'),
    hasAddons: true,
  },
  {
    id: 'space-kids',
    name: 'Space Kids',
    category: 'lanches',
    price: 15.99,
    description: 'Pão, hambúrguer e queijo.',
    detailDescription: 'Pão, hambúrguer e queijo. O lanche perfeito para os pequenos.',
    image: img('space-kids'),
    hasAddons: true,
  },
  {
    id: 'space-smash-simples',
    name: 'Space Smash Simples',
    category: 'lanches',
    price: 17.99,
    description: 'Pão, hambúrguer 80g, queijo, cheddar e picles.',
    detailDescription: 'Pão, hambúrguer 80g no estilo smash, queijo, cheddar e picles.',
    image: img('space-smash-simples'),
    hasAddons: true,
  },
  {
    id: 'space-salada',
    name: 'Space Salada',
    category: 'lanches',
    price: 19.99,
    description: 'Pão, hambúrguer, queijo, alface, tomate e picles.',
    detailDescription: 'Pão, hambúrguer, queijo, alface, tomate e picles. Leve e saboroso.',
    image: img('space-salada'),
    hasAddons: true,
  },
  {
    id: 'space-doritos',
    name: 'Space Doritos',
    category: 'lanches',
    price: 29.99,
    description: 'Pão, hambúrguer, queijo cheddar, alface, tomate e Doritos.',
    detailDescription: 'Pão, hambúrguer, queijo cheddar, alface, tomate e Doritos crocantes.',
    image: img('space-doritos'),
    hasAddons: true,
  },
  {
    id: 'space-cebola-caramelizada',
    name: 'Space Cebola Caramelizada',
    category: 'lanches',
    price: 22.99,
    description: 'Pão, hambúrguer, queijo, cebola caramelizada e picles.',
    detailDescription: 'Pão, hambúrguer, queijo, cebola caramelizada e picles.',
    image: img('space-cebola-caramelizada'),
    hasAddons: true,
  },
  {
    id: 'space-frango',
    name: 'Space Frango',
    category: 'lanches',
    price: 23.99,
    description: 'Pão, frango, alface, tomate e picles.',
    detailDescription: 'Pão, frango empanado, alface, tomate e picles.',
    image: img('space-frango'),
    hasAddons: true,
  },
  {
    id: 'refri-lata',
    name: 'Refri Lata',
    category: 'bebidas',
    price: 6.0,
    description: 'Coca, Sprite ou Fanta (350ml).',
    detailDescription: 'Refrigerante gelado em lata: Coca, Sprite ou Fanta (350ml).',
    image: img('refri-lata'),
    hasAddons: false,
  },
]

export function getProductById(id) {
  return products.find((p) => p.id === id)
}
