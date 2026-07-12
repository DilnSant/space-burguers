export const categories = [
  { id: 'lanches', label: 'Lanches' },
  { id: 'porcoes', label: 'Porções' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'sobremesas', label: 'Sobremesas' },
]

export const addonsCatalog = [
  { id: 'queijo-extra', name: 'Queijo Extra', description: '+ Cheddar Inglês', price: 4.5 },
  { id: 'bacon-crocante', name: 'Bacon Crocante', description: '2 fatias extras', price: 6.0 },
  { id: 'ovo-frito', name: 'Ovo Frito', description: 'Gema mole', price: 3.5 },
]

export const products = [
  {
    id: 'monster-bacon',
    name: 'Monster Bacon',
    category: 'lanches',
    price: 38.9,
    rating: 4.9,
    description:
      'Hambúrguer bovino de 180g, bacon crocante, cheddar duplo, cebola roxa e molho especial da casa no pão brioche.',
    detailDescription:
      'Blend artesanal de 180g de carne bovina premium, queijo cheddar inglês derretido, fatias crocantes de bacon caramelizado, cebola roxa marinada e nosso exclusivo molho especial da casa. Servido no pão brioche amanteigado.',
    tags: ['Gourmet', 'Apimentado'],
    badges: ['Mais Pedido'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuALGwDw_Pz5UBezp8bIK9JqmsmmFy6W3ljdb7dgjYKSFQbgr1cQzrkUPDvOe08eYP_W7tl0mHBjGLSbjsSDjgWv_jWl-1G7fCe0nWhiXaBWNZqyTc-IJnpYZDVC7O1ee5Z8zciyd4nyHJNyL07MssUcddQUqERyLZL8dPfg5MmHhMFACD1SJjaUbtMt9aiyOvI6bQNS8_9O-EV5tkGjMVsVLUIWTI2QDBczApvaG7xIeYD0dLp3fN5uzw',
    hasAddons: true,
  },
  {
    id: 'smoky-bbq-monster',
    name: 'Smoky BBQ Monster',
    category: 'lanches',
    price: 42.9,
    rating: 4.8,
    description:
      'Blend de 180g, cheddar inglês, bacon caramelizado, cebola roxa marinada e molho BBQ defumado no pão brioche.',
    detailDescription:
      'Blend artesanal de 180g de carne bovina premium, queijo cheddar inglês derretido, fatias crocantes de bacon caramelizado, cebola roxa marinada e nosso exclusivo molho BBQ defumado em lenha de macieira. Servido no pão brioche amanteigado.',
    tags: ['Mais Pedido', 'Picante 🔥'],
    badges: ['Mais Pedido'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAwQhl_2jf4WGOZ_q0hcrDAwM1KvDo0bL7PFM-FJmr611Dn5119NS-ayR0PLHmVRs6XbmQm72HLl2M6Frx6M_1grfXjR05L78fHZH-b60vrIwSQ8q7LlNsNWgui_5GDgpuL85z9kNNfePdyXbh8652kikSB8x3FZZEa90WCBzLkpmemv0aeozcyPayOhKETClwMtap3pUnhyiOGO49PbIBa9-l2nKNm_mDfLb3js3uKB_z6La2ilPFddQ',
    hasAddons: true,
  },
  {
    id: 'burger-saltysnack',
    name: 'Burger SaltySnack',
    category: 'lanches',
    price: 38.9,
    rating: 4.7,
    description: 'Pão brioche, 180g de carne, cheddar derretido e molho especial da casa.',
    detailDescription:
      'Nosso clássico: pão brioche macio, 180g de carne bovina grelhada na hora, queijo cheddar derretido e o molho especial SaltySnack.',
    tags: ['Clássico'],
    badges: [],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpOE-1gTr5N9bGVSOyjrXk4rd7I8Hd599zgwP9QS2cW4SaDg7W4kaupVSTgypPOtmYaLEU8XZC8Hla81oesPSfQfXZ5nZ_MTyqbSAlaQCzbzFXRAJ4chrrIAAz4KaXjOLKkmFF0d4xztIVPw2whP7UzdldhaaSuA9DhmhqX7U5VSCiOQNvUgWxXAv11dBwJQaqg9J4lxOirGWJIiMAxJgtPp7RnrL0Tad9ANVIp8ORYZxSFgInoSDVRQ',
    hasAddons: true,
  },
  {
    id: 'green-power',
    name: 'Green Power',
    category: 'lanches',
    price: 32.5,
    rating: 4.6,
    description: 'Nosso burger vegetariano com queijo halloumi, avocado fresquinho, mix de folhas e molho pesto artesanal.',
    detailDescription:
      'Burger vegetariano com portobello grelhado, queijo halloumi, avocado fresquinho, mix de folhas e molho pesto artesanal, servido em pão multigrãos.',
    tags: ['Veggie', 'Saudável'],
    badges: [],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD83Qzg0XcEyK1CQ9xK1L_DAIzQQGpKPV9_cqoT0JpfmbRUVWhgx-6g22ZrQbJKa5leSkSuVE2B-_eC0KY_oTz8f7MJDMPx-ctzseLeEMIZEMCqjIRx24kpzQ8YFZcDvzJ7yOyE_v_eu6gsnDAv4LX0LcYe5NGGxsk_jUNAbOuH5eLEN5vBoed-lHAoXf0vgsIQu-38uROQXGkd-hxS1MoGwNQu_3SwHEA19vdFLMGUoBBdWf8aR6N51w',
    hasAddons: false,
  },
  {
    id: 'batata-rustica',
    name: 'Batata Rústica',
    category: 'porcoes',
    price: 24.0,
    rating: 4.8,
    description: 'Porção generosa de batatas rústicas com alecrim e páprica defumada. Acompanha maionese de alho.',
    detailDescription:
      'Porção generosa de batatas rústicas assadas com alecrim fresco e páprica defumada. Acompanha maionese de alho artesanal.',
    tags: ['Mais Pedido'],
    badges: ['Mais Pedido'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSjKVUdCtKzqEFvO0r0IMPx68SwhKDSfjYeH_yDE4EdZKCyYEH8r30voOf4YAtO58o2bLwKebhEBIQQUvQ5xQ-MtYdRCMCZPG7Y9-pSQBIvh0zbv8gD7X3DWHgCaWXkO_xg9mkctyFKT8MAUYZE6PcmqBXVTnQ9KuJTlwkpf96CnbwurkugTwkMX_K8EnpVJrzCyg1WHW6XQozGkwxW9nhyYjXJRasNI6CIqr0HTTefQYwwlefTL6iAA',
    hasAddons: false,
  },
  {
    id: 'fritas-crinkle',
    name: 'Fritas Crinkle G',
    category: 'porcoes',
    price: 14.0,
    rating: 4.7,
    description: 'Batatas crocantes com sal temperado, cortadas em ondas.',
    detailDescription: 'Batatas crocantes crinkle cut, fritas na hora e temperadas com sal aromatizado.',
    tags: [],
    badges: [],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxck_W8MO_leP-LLoSSxBf2Lux48e3W4yOKwcmLIMpXsTPvXmavMKA2nf_NUc_0ruCsJjgp1bOzM3oyjNrjlawLBqq9IJF92h3S10HrwNgfP4efN7ADBksuuvYGc51WtNsoY062mK-lJpgvDYtenn3cw-f0Tz7f0hFNJBNRf5PH5saBoVpQ9CaE-ufZtx8MevqvomSmI3c080Bu9bLFOMVrZePrxthCfVi4_95kVgeJN6Re08rgURW3A',
    hasAddons: false,
  },
  {
    id: 'pink-lemonade',
    name: 'Pink Lemonade',
    category: 'bebidas',
    price: 12.0,
    rating: 4.9,
    description: 'Limonada rosa refrescante com folhas de hortelã e gelo.',
    detailDescription: 'Limonada rosa refrescante, servida bem gelada com folhas de hortelã e uma fatia de limão.',
    tags: [],
    badges: [],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCErMjRmeDH3p462V1ZiAmB3sBmdBx9QN3A5FIpuYhhOkETycR8rAIrHkp7CfsSRL1KJI7A0m24B1zk0MhSPnUI5SZ8gWYHtO3Mzp0h9xIiIqFbfL-SZtDZH6czqiiO2dbsPq2Zz7d6LOiVQ5ARJXKMbe2Iie_nH0Gq5pC6CQeKtLVU8s-e5qPGkuvbNVVbqcHSMYfM4kc0zn19ilNZRhCUM_f34bNCYQU5oz5p4qR5Ddp_eTeHO3Yylg',
    hasAddons: false,
  },
  {
    id: 'chopp-artesanal',
    name: 'Chopp Artesanal',
    category: 'bebidas',
    price: 16.0,
    rating: 4.8,
    description: 'Chopp artesanal gelado, com espuma cremosa e cor âmbar.',
    detailDescription: 'Chopp artesanal 100% puro malte, servido bem gelado com espuma cremosa.',
    tags: [],
    badges: [],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6G6h-td8rwbNg2dnxvJVN1yTFl7mVygQM6OdYvpOD89ahpDDfSMEQQWy2I8YHK-QfSeZcA7lD4IAEq6hpn1BgtaOvihP7uDCE4k5Riz4WRb16Ns8PtRqY6X0EzdKZKZfpJYflDcpyP5nb0pqP5Y_kXc6q0-THiXQsBD_4v9OPtF4QLsi2B0yE7Cm9KKS-CZp1Iz9afbwQxp4vgov99rJYYl5VZrmz_topJHodoRWc9_q6MgeamOYWnA',
    hasAddons: false,
  },
]

export function getProductById(id) {
  return products.find((p) => p.id === id)
}
