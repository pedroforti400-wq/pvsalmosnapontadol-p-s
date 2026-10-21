// Valores individuais em centavos; capas originais criadas para esta seção.
export const bonuses = [
  {
    id: 'bible-goods',
    title: 'Bible Goods — Colorindo com a Bíblia',
    description: '70 páginas com desenhos bíblicos para colorir, ideais para estimular a criatividade e reforçar o aprendizado cristão.',
    priceCents: 1299,
    image: '/images/bonus-bible-goods.png',
    alt: 'Capa original de Bible Goods — Colorindo com a Bíblia, com personagens bíblicos, crianças e elementos de colorir em um jardim.',
  },
  {
    id: 'proverbios',
    title: 'Provérbios na Ponta do Lápis',
    description: 'Atividades de caligrafia inspiradas no livro de Provérbios, ajudando a criança a desenvolver a escrita enquanto aprende sabedoria bíblica.',
    priceCents: 1799,
    image: '/images/bonus-proverbios-na-ponta-do-lapis.png',
    alt: 'Capa original de Provérbios na Ponta do Lápis, com crianças praticando a escrita e detalhes de folhas e luz dourada.',
  },
  {
    id: 'tabuada-noe',
    title: 'Tabuada com Noé',
    description: '70 páginas de atividades para aprender e praticar a tabuada com a temática da Arca de Noé.',
    priceCents: 2549,
    image: '/images/bonus-tabuada-com-noe.png',
    alt: 'Capa original de Tabuada com Noé, com a arca, animais, números coloridos e um arco-íris.',
  },
  {
    id: 'emociobook',
    title: 'Emociobook — O Livro das Emoções',
    description: 'Material com mais de 50 emoções e atividades para ajudar as crianças a reconhecer e compreender sentimentos.',
    priceCents: 1599,
    image: '/images/bonus-emociobook.png',
    alt: 'Capa original de Emociobook — O Livro das Emoções, com crianças expressando sentimentos em um ambiente acolhedor.',
  },
];

export const bonusTotalCents = bonuses.reduce((sum, bonus) => sum + bonus.priceCents, 0);
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const formatBonusPrice = cents => currency.format(cents / 100);
