// Edite este arquivo para conectar os dados reais antes de publicar.
export const product = {
  name: 'Salmos na Ponta do Lápis',
  logo: { src: '/images/logo-oficial-salmos.png', width: 1774, height: 887 },
  price: 27.90,
  referencePrice: 99.90,
  referencePriceConfirmed: true, // Referência comercial confirmada pelo produtor nesta oferta.
  currency: 'BRL',
  checkoutUrl: 'https://pay.wiapy.com/6ad7db0723173d72243f531c', // URL HTTPS real do checkout. Vazio ou inválido mantém o botão de compra desabilitado.
  contactEmail: '',
  offerLabel: 'Oferta especial de lançamento',
  isDemo: true, // Desative depois de validar preço, conteúdo e condições comerciais.
  images: {
    // Imagem original completa do produto com os quatro bônus, sem recriação ou cortes.
    productWithBonuses: '/images/imagem-principal-salmos-com-bonus.png',
    hero: '/images/biblical-friends.webp', // Imagem real prioritária; vazio usa a ilustração original abaixo.
    cover: '',
    samples: ['', '', ''],
    comparison: '/images/caligrafia-antes-depois.webp',
    biblicalScene: '/images/biblical-garden.webp',
    writingChild: '/images/child-writing.webp',
    panorama: '/images/biblical-garden.webp',
  },
  video: { src: '', poster: '' }, // MP4/WebM local ou HTTPS; vazio mostra o aviso de vídeo em breve.
  testimonials: [], // { name, role, quote } — apenas depoimentos reais e autorizados.
  guaranteeDays: 7, // Garantia de satisfação de 7 dias confirmada pelo produtor.
};
export const formatPrice = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: product.currency }).format(value);
export function getCheckoutUrl(value, search = '') {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    const params = new URLSearchParams(search);
    for (const key of ['utm_source', 'utm_campaign', 'utm_medium', 'utm_content', 'utm_term']) {
      const parameter = params.get(key);
      if (parameter) url.searchParams.set(key, parameter);
    }
    return url.href;
  } catch { return null; }
}
