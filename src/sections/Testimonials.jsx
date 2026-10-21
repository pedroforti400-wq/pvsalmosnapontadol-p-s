import { MessageCircle, Quote, Heart } from 'lucide-react';
import { product } from '../config';
import { SectionHeading } from '../components/UI';

const placeholders = [
  { title: 'Histórias em família', description: 'Este espaço está reservado para um relato real sobre momentos de aprendizado em casa.', icon: Heart, color: 'peach' },
  { title: 'Descobertas na escrita', description: 'Aqui poderá entrar a experiência autorizada de quem acompanha as primeiras letrinhas.', icon: MessageCircle, color: 'lavender' },
  { title: 'Conexões com a Palavra', description: 'Um cantinho para compartilhar como o material fez parte de uma descoberta de fé.', icon: Quote, color: 'sage' },
];
export default function Testimonials() {
  const hasReal = product.testimonials.length > 0;
  return <section id="depoimentos" className="testimonials-section"><div className="container">
    <SectionHeading eyebrow="APRENDER TAMBÉM É COMPARTILHAR" description={hasReal ? 'Experiências compartilhadas com carinho.' : 'As primeiras histórias ainda serão escritas. Estes cards são espaços demonstrativos.'}>Cada família pode ter<br/>uma história <em>para contar.</em></SectionHeading>
    <div className="testimonials-grid">{hasReal ? product.testimonials.map((item,index)=><figure className="testimonial real" key={`${item.name}-${index}`}><Quote size={30} aria-hidden="true"/><blockquote>{item.quote}</blockquote><figcaption><span className="avatar">{item.name.slice(0,1)}</span><span><strong>{item.name}</strong><small>{item.role}</small></span></figcaption></figure>) : placeholders.map(({title,description,icon:Icon,color},index)=><article className={`testimonial ${color}`} key={title}><span className="testimonial-label">ESPAÇO DEMONSTRATIVO · 0{index+1}</span><Quote className="quote-mark" size={32} aria-hidden="true"/><h3>{title}</h3><p>{description}</p><div className="placeholder-person"><span className="avatar"><Icon size={18}/></span><span>Seu relato pode morar aqui<small>Nenhum depoimento real exibido</small></span></div></article>)}</div>
  </div></section>;
}
