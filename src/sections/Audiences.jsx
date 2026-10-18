import { Users, Pencil, Church, Heart } from 'lucide-react';
import { SectionHeading } from '../components/UI';
const audiences = [
  [Users,'Famílias que ensinam com amor','Para pais e responsáveis que desejam cultivar a fé nos pequenos momentos da rotina.','coral'],
  [Pencil,'Educadores que inspiram','Para quem busca uma proposta criativa de escrita com temática bíblica.','purple'],
  [Church,'Encontros que aproximam','Uma inspiração para atividades infantis em comunidade, conforme a licença do material.','green'],
  [Heart,'Pequenos exploradores','Para crianças em fase de descoberta da escrita, sempre com um adulto por perto.','gold'],
];
export default function Audiences() {
  return <section id="para-quem" className="section audiences"><div className="container"><SectionHeading eyebrow="TEM UM LUGAR PARA VOCÊ AQUI">Feito para quem acredita<br/>que ensinar é <em>semear.</em></SectionHeading><div className="audience-grid">{audiences.map(([Icon,title,description,color])=><article className={`audience-card ${color}`} key={title}><div className="audience-cover"><Icon size={33}/><span aria-hidden="true">✦</span></div><div className="audience-copy"><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section>;
}
