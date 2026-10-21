import { product } from '../config';
import './Material.css';

export default function Material() {
  return <section id="material" className="material-section material-comparison" aria-label="Salmos na Ponta do Lápis: escrita com propósito">
    <div className="container comparison-layout">
      <figure className="comparison-visual">
        <img src={product.images.comparison} width="1254" height="1254" loading="lazy" decoding="async"
          alt="Comparação ilustrativa: DEPOIS acima, com cursiva firme e organizada em azul; ANTES abaixo, com escrita infantil tremida, irregular e insegura a lápis. As folhas de caderno têm bordas rasgadas e fita adesiva."/>
        <figcaption>Exemplos ilustrativos de escrita. Não representam um resultado garantido.</figcaption>
      </figure>
      <div className="comparison-copy">
        <p>Em meio a tantas telas, distrações e à correria do dia a dia, encontrar uma atividade que realmente contribua para o aprendizado dos pequenos e ainda fortaleça os valores da família é um verdadeiro presente.</p>
        <p className="comparison-origin">Foi pensando nisso que nasceu o <strong>Salmos na Ponta do Lápis.</strong></p>
        <p>Um material especial que transforma a prática da caligrafia em momentos de descoberta, aprendizado e <strong>conexão com a Palavra de Deus.</strong></p>
        <p>A cada atividade, a criança é convidada a desenvolver sua escrita cursiva enquanto conhece mensagens dos Salmos que falam de <strong>amor, fé, gratidão e sabedoria.</strong></p>
        <p>Porque ensinar uma criança a escrever é importante. Mas tornar esse aprendizado cheio de significado é ainda mais especial.</p>
        <p className="comparison-purpose"><strong><em>Mais do que formar letras bonitas, é plantar sementes de fé em cada pequeno coração.</em></strong></p>
      </div>
    </div>
  </section>;
}
