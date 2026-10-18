import { Leaf, Pencil } from 'lucide-react';
import { product } from '../config';
import { samples } from '../content';
import { Logo } from './UI';

export default function Worksheet({ index = 0, compact = false }) {
  const sample = samples[index];
  const image = product.images.samples[index];
  return <div className={`worksheet ${compact ? 'compact' : ''}`}>
    {image ? <img src={image} alt={`Página do material: ${sample.label}`} loading="lazy"/> : <>
      <div className="sheet-top"><Logo className="sheet-logo"/><Pencil size={22}/></div>
      <div className="sheet-label">VAMOS {sample.label.toUpperCase()} JUNTOS?</div>
      <h3>{sample.title}</h3><p className="sheet-task">{sample.task}</p>
      <div className="verse-box"><span aria-hidden="true">✦</span><p>{sample.verse}</p><small>{sample.ref}</small></div>
      {index === 2 ? <div className="color-drawing" aria-hidden="true"><Leaf size={54}/><span>♡</span><Leaf size={54}/></div> : <>
        <p className="trace">{sample.verse}</p><div className="writing-lines" aria-hidden="true"><span/><span/><span/></div>
      </>}
      <div className="sheet-bottom"><span>Feito com fé. Colorido com amor.</span><span>0{index + 1} ♡</span></div>
    </>}
  </div>;
}
