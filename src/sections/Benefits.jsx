import { benefits } from '../content';
import { SectionHeading } from '../components/UI';

export default function Benefits() {
  return <section id="beneficios" className="section benefits-section"><div className="container">
    <SectionHeading eyebrow="MUITO ALÉM DA CALIGRAFIA" description="Um convite para aprender com as mãos, a mente e o coração.">O que floresce<br/>a cada <em>nova página?</em></SectionHeading>
    <div className="benefits">{benefits.map(([Icon,title,text,color],index)=><article className={`benefit ${color}`} key={title}><span className="benefit-number">0{index+1}</span><span className="icon-box"><Icon/></span><h3>{title}</h3><p>{text}</p><span className="benefit-spark" aria-hidden="true">✦</span></article>)}</div>
  </div></section>;
}
