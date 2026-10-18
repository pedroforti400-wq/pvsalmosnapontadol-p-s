import { useState, useRef } from 'react';
import { Check, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import Worksheet from '../components/Worksheet';
import { samples } from '../content';

export default function Material() {
  const [sample, setSample] = useState(0);
  const tabs = useRef([]);
  function navigateTabs(event, index) {
    let next;
    if(event.key === 'ArrowRight') next=(index+1)%samples.length;
    if(event.key === 'ArrowLeft') next=(index+samples.length-1)%samples.length;
    if(event.key === 'Home') next=0;
    if(event.key === 'End') next=samples.length-1;
    if(next!==undefined) {event.preventDefault();setSample(next);tabs.current[next]?.focus();}
  }
  return <section id="material" className="material-section"><div className="container material-grid">
    <div className="sample-stage"><span className="tape" aria-hidden="true"/><span className="sample-tag">um pedacinho dessa descoberta ↴</span><div className="paper-back"/><Worksheet index={sample}/><span className="sample-caption">Amostra ilustrativa • substitua pela página real do material</span><span className="sample-sticker" aria-hidden="true">feito para<br/><strong>florescer ♡</strong></span></div>
    <div className="material-copy"><span className="eyebrow">MAIS DO QUE LETRAS NO PAPEL</span><h2>Um encontro entre<br/>o lápis e a <em>Palavra.</em></h2><p>Tem aprendizado que vai além do caderno. Um versículo pode virar conversa, um traço pode virar conquista e alguns minutos juntos podem virar uma memória bonita.</p>
      <div className="sample-tabs" role="tablist" aria-label="Tipo de atividade">{samples.map((s,i)=><button key={s.label} role="tab" ref={el=>tabs.current[i]=el} id={`tab-${i}`} tabIndex={i===sample?0:-1} aria-controls="sample-description" aria-selected={i===sample} onKeyDown={e=>navigateTabs(e,i)} onClick={()=>setSample(i)}>{s.label}</button>)}</div>
      <div id="sample-description" role="tabpanel" tabIndex={0} aria-labelledby={`tab-${sample}`}><h3>{samples[sample].title}</h3><p>{samples[sample].task}</p></div>
      <ul className="checklist"><li><Check/>Caligrafia com pequenos trechos dos Salmos</li><li><Check/>Espaço para a criatividade e boas conversas</li><li><Check/>Uma proposta para aprender com um adulto por perto</li></ul>
      <div className="material-actions"><a href="#previas" className="text-link">Veja mais de pertinho <ArrowUpRight size={17}/></a><div className="sample-controls"><button aria-label="Amostra anterior" onClick={()=>setSample((sample+2)%3)}><ChevronLeft size={18}/></button><span>0{sample+1} <span>/ 03</span></span><button aria-label="Próxima amostra" onClick={()=>setSample((sample+1)%3)}><ChevronRight size={18}/></button></div></div>
    </div>
  </div></section>;
}
