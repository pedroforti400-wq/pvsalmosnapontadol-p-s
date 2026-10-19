import React from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './components/Layout';
import ProductPresentation from './sections/ProductPresentation';
import MaterialCarousel from './sections/MaterialCarousel';
import './presentation.css';

export default function App() {
  return <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <Header/>
    <main id="conteudo" tabIndex={-1}>
      <ProductPresentation/>
      <MaterialCarousel/>
      <div id="checkout-final" className="checkout-preparation" role="region"
        aria-label="Área de oferta em preparação" tabIndex={-1}>
        <p>Área de oferta em preparação.</p>
      </div>
    </main>
  </>;
}
if(document.getElementById('root')) createRoot(document.getElementById('root')).render(<App/>);
