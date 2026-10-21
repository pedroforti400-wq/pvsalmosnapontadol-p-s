import { Download, Infinity as InfinityIcon, Mail, Printer, ShoppingCart } from 'lucide-react';
import { deliverySteps } from '../delivery';
import './HowItWorks.css';

const icons = { purchase: ShoppingCart, email: Mail, download: Download, print: Printer, forever: InfinityIcon };

export default function HowItWorks() {
  return <section id="como-funciona" className="delivery-section" aria-labelledby="delivery-title">
    <div className="delivery-container">
      <div className="delivery-heading">
        <p className="delivery-eyebrow">COMO VOCÊ RECEBE</p>
        <h2 id="delivery-title">Simples, rápido e <span>pronto para imprimir!</span></h2>
        <p className="delivery-subheadline">Após a compra, receba o acesso por e-mail, baixe seu material e comece a aproveitar as atividades!</p>
      </div>

      <div className="delivery-grid">
        {deliverySteps.map(step => {
          const Icon = icons[step.id];
          return <article key={step.id} className={`delivery-card delivery-card--${step.id}`} aria-labelledby={`delivery-${step.id}`}>
            <span className="delivery-icon" aria-hidden="true"><Icon size={28} strokeWidth={1.7}/></span>
            <p className="delivery-label">{step.label}</p>
            <h3 id={`delivery-${step.id}`}>{step.title}</h3>
            <p className="delivery-description">{step.description}</p>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
