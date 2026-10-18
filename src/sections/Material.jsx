import { product } from '../config';
import './Material.css';

export default function Material() {
  return <section id="material" className="material-section material-comparison" aria-label="Salmos na Ponta do Lápis: escrita com propósito">
    <div className="container comparison-layout">
      <figure className="comparison-visual">
        <img src={product.images.comparison} width="1254" height="1254" loading="lazy" decoding="async"
          alt="Comparação ilustrativa ANTES e DEPOIS: duas folhas de caderno rasgadas, presas com fita adesiva, mostram o trecho O Senhor é o meu pastor em escrita inicial irregular e em cursiva organizada."/>
        <figcaption>Exemplos ilustrativos de escrita. Não representam um resultado garantido.</figcaption>
      </figure>
      <div className="comparison-copy">
        <p>A rotina é corrida, e entre tantas telas e distrações, encontrar uma atividade que estimule a escrita e também aproxime as crianças da Palavra de Deus pode fazer toda a diferença.</p>
        <p className="comparison-origin">Foi pensando nisso que nasceu o <strong>Salmos na Ponta do Lápis.</strong></p>
        <p>Com atividades de caligrafia inspiradas nos <strong>Salmos da Bíblia</strong>, as crianças são convidadas a praticar a escrita cursiva enquanto conhecem mensagens de <strong>fé, amor e sabedoria.</strong></p>
        <p className="comparison-purpose"><strong><em>Mais do que praticar a letra, é aprender com propósito.</em></strong></p>
      </div>
    </div>
  </section>;
}
