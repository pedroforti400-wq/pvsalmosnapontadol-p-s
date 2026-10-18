import { BookOpen, Heart, Sparkles } from 'lucide-react';
import { Scene } from '../components/UI';

export default function Panorama() {
  return <section className="panorama-section" id="universo"><Scene type="panorama" alt="Jardim bíblico panorâmico em 3D, com céu iluminado, nuvens douradas, crianças, um pastor e uma ovelhinha"/><div className="panorama-shade"/><div className="container panorama-content"><span className="eyebrow">UM UNIVERSO DE FÉ E DESCOBERTAS</span><h2>Que a Palavra faça parte<br/>das histórias que vocês <em>vivem juntos.</em></h2><div className="panorama-features">{[[BookOpen,'Palavra que aproxima','Pequenos trechos para grandes conversas.'],[Sparkles,'Imaginação que floresce','Espaço para criar, colorir e descobrir.'],[Heart,'Presença que transforma','Um convite para estar por perto.']].map(([Icon,title,text])=><article key={title}><span><Icon size={21}/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div><span className="panorama-caption">Um cenário ilustrativo para inspirar novas descobertas.</span></section>;
}
