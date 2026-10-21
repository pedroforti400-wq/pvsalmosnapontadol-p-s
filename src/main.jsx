import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Header } from './components/Layout';
import ProductPresentation from './sections/ProductPresentation';
import MaterialCarousel from './sections/MaterialCarousel';
import BeforeAfter from './sections/BeforeAfter';
import IllustrativeComments from './sections/IllustrativeComments';
import Audiences from './sections/Audiences';
import Bonuses from './sections/Bonuses';
import HowItWorks from './sections/HowItWorks';
import Offer from './sections/Offer';
import Guarantee from './sections/Guarantee';
import FAQ from './sections/FAQ';
import './presentation.css';

export default function App() {
  return <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
    <Header/>
    <main id="conteudo" tabIndex={-1}>
      <ProductPresentation/>
      <MaterialCarousel/>
      <BeforeAfter/>
      <IllustrativeComments/>
      <Audiences/>
      <Bonuses/>
      <HowItWorks/>
      <Offer/>
      <Guarantee/>
      <FAQ/>
    </main>
  </>;
}
if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  if (root?.hasAttribute('data-prerendered')) hydrateRoot(root, <App/>);
  else if (root) createRoot(root).render(<App/>);
}
