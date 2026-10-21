import { useState } from 'react';
import { Play, BookOpen, Heart, Clock3 } from 'lucide-react';
import { product } from '../config';
import { Scene, SectionHeading } from '../components/UI';

export default function VideoSection() {
  const [showInfo, setShowInfo] = useState(false);
  const poster = product.video.poster || product.images.writingChild;
  return <section className="video-section" id="video"><div className="container">
    <SectionHeading eyebrow="DÊ O PLAY NESSA DESCOBERTA" description="Imagine a mesa preparada, os lápis espalhados e um novo momento para aprender juntos.">É assim que uma página<br/>vira um <em>momento especial.</em></SectionHeading>
    <div className="video-frame">{product.video.src ? <video controls preload="none" playsInline poster={poster} aria-label="Apresentação do Salmos na Ponta do Lápis"><source src={product.video.src}/>Seu navegador não suporta este vídeo.</video> : <>
      <Scene type="writingChild" alt="Ilustração 3D de uma criança praticando a escrita com uma ovelhinha ao lado"/>
      <div className="video-overlay"><span className="video-label">SALMOS NA PONTA DO LÁPIS</span><button aria-label="Conhecer a demonstração em vídeo" aria-expanded={showInfo} aria-controls="video-status" onClick={()=>setShowInfo(!showInfo)}><Play size={30} fill="currentColor"/></button><span className="video-caption">Pequenos traços. Grandes descobertas.</span><small>Prévia visual • vídeo em breve</small></div>
    </>}</div>
    {showInfo && !product.video.src && <p className="video-status" id="video-status" role="status">O vídeo de apresentação ainda não está disponível. Enquanto isso, explore as amostras ilustrativas do material abaixo.</p>}
    <div className="video-footnotes"><span><BookOpen/>Escrita com propósito</span><span><Clock3/>Um momento no seu ritmo</span><span><Heart/>Presença que ensina</span></div>
  </div></section>;
}
