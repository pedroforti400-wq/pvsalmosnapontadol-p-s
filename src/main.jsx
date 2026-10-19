import React from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './components/Layout';
import ProductPresentation from './sections/ProductPresentation';
import MaterialCarousel from './sections/MaterialCarousel';
import BeforeAfter from './sections/BeforeAfter';
import './presentation.css';

export default function App() {
  return <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <Header/>
    <main id="conteudo" tabIndex={-1}>
      <ProductPresentation/>
      <MaterialCarousel/>
      <BeforeAfter/>
      <div id="checkout-final" className="checkout-anchor" tabIndex={-1}/>
    </main>
  </>;
}
if(document.getElementById('root')) createRoot(document.getElementById('root')).render(<App/>);
