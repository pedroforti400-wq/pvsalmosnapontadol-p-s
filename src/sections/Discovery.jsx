import { Pencil, Heart, BookOpen } from 'lucide-react';
import { CurvedArrow, Scene, SectionHeading } from '../components/UI';
import Worksheet from '../components/Worksheet';

export default function Discovery() {
  return <section className="discovery-section" id="previas"><div className="container">
    <SectionHeading eyebrow="CRIADO PARA DESPERTAR DESCOBERTAS" description="Um versículo, um novo traço e um mundo de possibilidades.">Tem carinho em<br/>cada <em>detalhezinho.</em></SectionHeading>
    <div className="discovery-board">
      <div className="discovery-preview preview-one"><span className="preview-label"><Pencil size={17}/> LETRINHAS COM PROPÓSITO</span><Worksheet index={0} compact/><p>Uma palavra que inspira.<br/>Um traço de cada vez.</p></div>
      <div className="discovery-character"><Scene type="hero" alt="Pequenos personagens bíblicos em 3D reunidos em volta de um livro"/><span className="discovery-bubble"><Heart size={17}/> Aqui, aprender<br/><strong>tem um novo sentido.</strong></span></div>
      <div className="discovery-preview preview-two"><span className="preview-label"><BookOpen size={17}/> A PALAVRA GANHA COR</span><Worksheet index={2} compact/><p>Criatividade livre.<br/>Bons momentos juntos.</p></div>
      <CurvedArrow className="discovery-arrow arrow-one"/><CurvedArrow className="discovery-arrow arrow-two"/><span className="discovery-spark spark-a" aria-hidden="true">✦</span><span className="discovery-spark spark-b" aria-hidden="true">✳</span>
    </div>
    <p className="illustration-note">Prévias e ilustrações demonstrativas. As páginas reais podem ser configuradas pelo produtor.</p>
  </div><svg className="wave-divider" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10Q720 115 1440 10V70H0Z"/></svg></section>;
}
