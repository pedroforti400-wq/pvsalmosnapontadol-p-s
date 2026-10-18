import { useState } from 'react';
import { ArrowUpRight, Plus, MessageCircle } from 'lucide-react';
import { faqs } from '../content';
import { product } from '../config';
export default function FAQ() {
  const [open,setOpen] = useState(0);
  return <section id="faq" className="section faq-section"><div className="container faq-grid"><div className="faq-intro"><span className="faq-icon"><MessageCircle size={28}/></span><span className="eyebrow">PODE PERGUNTAR ♡</span><h2>Um pouquinho<br/>mais de <em>clareza.</em></h2><p>As respostas para começar essa descoberta com o coração tranquilo.</p>{product.contactEmail&&<a className="text-link" href={`mailto:${product.contactEmail}`}>Fale com a gente <ArrowUpRight size={18}/></a>}<span className="faq-doodle" aria-hidden="true">?</span></div><div className="faq-list">{faqs.map(([question,answer],index)=><article className={`faq-item ${open===index?'expanded':''}`} key={question}><h3><button aria-expanded={open===index} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`} onClick={()=>setOpen(open===index?null:index)}><span className="faq-number">0{index+1}</span><span>{question}</span><Plus size={18}/></button></h3><div className="faq-answer" role="region" id={`faq-answer-${index}`} aria-labelledby={`faq-question-${index}`} hidden={open!==index}><p>{answer}</p></div></article>)}</div></div></section>;
}
