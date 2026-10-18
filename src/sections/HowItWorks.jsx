import { Download, Printer, Pencil, Heart } from 'lucide-react';
import { SectionHeading } from '../components/UI';
const steps = [[Download,'Receba o material','Após a compra, siga as instruções de acesso enviadas pelo vendedor.'],[Printer,'Imprima do seu jeito','Separe papel A4 e escolha a atividade que combina com o momento.'],[Pencil,'Prepare os lápis','Encontre um cantinho tranquilo e acompanhe cada nova descoberta.'],[Heart,'Cultive bons momentos','Leia, escreva e converse. Cada criança tem seu próprio tempo.']];
export default function HowItWorks() {
  return <section id="como-funciona" className="section how-section"><div className="container"><SectionHeading eyebrow="DO DIGITAL PARA A MESA DE CASA">Simples de começar.<br/><em>Especial de viver.</em></SectionHeading><div className="steps">{steps.map(([Icon,title,text],index)=><article key={title}><div className={`step-icon step-${index}`}><Icon/><span>0{index+1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}
