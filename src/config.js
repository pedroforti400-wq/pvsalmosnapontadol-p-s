// Edite este arquivo para conectar os dados reais antes de publicar.
export const product = {
  name: 'Salmos na Ponta do Lápis',
  logo: { src: '/images/logo-oficial-salmos.png', width: 1774, height: 887 },
  price: 29.90,
  currency: 'BRL',
  checkoutUrl: '', // URL HTTPS do seu checkout. Vazio mantém a compra em modo de demonstração.
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
  guaranteeDays: null, // Defina apenas depois de confirmar sua política de reembolso.
};
export const formatPrice = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: product.currency }).format(value);
export function getCheckoutUrl(value) {
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; }
}
