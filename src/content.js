import { Pencil, BookOpen, Heart, Sparkles } from 'lucide-react';
import { product } from './config';

export const samples = [
 { label: 'Tracejar', title: 'Pequenos traços de fé', verse: 'O Senhor é o meu pastor.', ref: 'Salmo 23:1', task: 'Passe o lápis sobre as letras. Depois, tente sozinho!' },
 { label: 'Escrever', title: 'Uma palavra, uma semente', verse: 'Deus é o nosso refúgio.', ref: 'Salmo 46:1', task: 'Leia com um adulto e escreva a frase nas linhas abaixo.' },
 { label: 'Colorir', title: 'Toda criação louva', verse: 'Tudo quanto tem fôlego louve ao Senhor.', ref: 'Salmo 150:6', task: 'Que cores combinam com a alegria? Deixe a imaginação florescer!' },
];
export const benefits = [
 [Pencil, 'Cada traço, uma descoberta', 'Uma forma delicada de convidar a criança a praticar a escrita, no seu próprio ritmo.', 'peach'],
 [BookOpen, 'A Palavra mais pertinho', 'Pequenos trechos dos Salmos abrem espaço para boas conversas sobre fé e cuidado.', 'lavender'],
 [Heart, 'Tempo que vira memória', 'Troque alguns minutos da rotina por presença, lápis de cor e aprendizado juntos.', 'sage'],
 [Sparkles, 'Aprender com leveza', 'Uma proposta que une criatividade e escrita para tornar o momento mais acolhedor.', 'yellow'],
];
export const faqs = [
 ['O que é o Salmos na Ponta do Lápis?', 'É uma proposta de material digital que aproxima a prática da escrita e a leitura de trechos dos Salmos. As páginas desta apresentação são exemplos ilustrativos; confira a composição final do produto antes da compra.'],
 ['Vou receber um material físico em casa?', 'Não. A proposta é um produto digital em PDF para você baixar e imprimir. Nenhum item físico é enviado.'],
 ['Para qual idade o material é indicado?', 'Mais do que a idade, considere o momento de aprendizagem da criança. As atividades de traçado e escrita devem ser escolhidas e acompanhadas por um adulto, de acordo com suas habilidades.'],
 ['Preciso de uma impressora colorida?', 'Você pode usar uma impressora doméstica e papel A4. A impressão em preto e branco também permite acrescentar as próprias cores às atividades.'],
 ['Como recebo o acesso após a compra?', 'O envio e o prazo de acesso devem ser informados no checkout do vendedor. Nesta versão de demonstração, nenhuma compra ou entrega é realizada.'],
 ['Posso usar em aulas ou na igreja?', 'A proposta pode inspirar momentos em família e atividades educativas. O uso coletivo e a reprodução dependem da licença definida pelo produtor; confirme as condições antes de compartilhar os arquivos.'],
 ['Existe garantia ou reembolso?', product.guaranteeDays ? `A política configurada informa ${product.guaranteeDays} dias de garantia. Consulte as condições completas no checkout antes de comprar.` : 'As condições de cancelamento e reembolso serão apresentadas pelo vendedor no checkout, respeitando os direitos aplicáveis ao consumidor.'],
];
