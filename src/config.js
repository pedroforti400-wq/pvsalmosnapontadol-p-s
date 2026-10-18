// Edite este arquivo para conectar os dados reais antes de publicar.
export const product = {
  name: 'Salmos na Ponta do Lápis',
  price: 29.90,
  currency: 'BRL',
  checkoutUrl: '', // URL HTTPS do seu checkout. Vazio mantém a compra em modo de demonstração.
  contactEmail: '',
  offerLabel: 'Oferta especial de lançamento',
  isDemo: true, // Desative depois de validar preço, conteúdo e condições comerciais.
  images: { hero: '', cover: '', samples: ['', '', ''] }, // URLs ou caminhos em /public
  guaranteeDays: null, // Defina apenas depois de confirmar sua política de reembolso.
};
export const formatPrice = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: product.currency }).format(value);
export function getCheckoutUrl(value) {
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; }
}
