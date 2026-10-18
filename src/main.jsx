import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Header, Footer } from './components/Layout';
import PurchaseDialog from './components/PurchaseDialog';
import Hero from './sections/Hero';
import Material from './sections/Material';
import VideoSection from './sections/Video';
import Benefits from './sections/Benefits';
import Testimonials from './sections/Testimonials';
import Audiences from './sections/Audiences';
import Discovery from './sections/Discovery';
import Offer from './sections/Offer';
import Panorama from './sections/Panorama';
import HowItWorks from './sections/HowItWorks';
import Guarantee from './sections/Guarantee';
import FAQ from './sections/FAQ';
import { product, getCheckoutUrl } from './config';
import './styles.css';

export default function App() {
  const [dialog, setDialog] = useState(false);
  function buy() {
    const checkout=getCheckoutUrl(product.checkoutUrl);
    if(checkout) window.location.assign(checkout);
    else setDialog(true);
  }
  return <><a className="skip" href="#conteudo">Pular para o conteúdo</a><Header/>
    <main id="conteudo"><Hero/><Material/><VideoSection/><Benefits/><Testimonials/><Audiences/><Discovery/><Offer onBuy={buy}/><Panorama/><HowItWorks/><Guarantee/><FAQ/></main>
    <Footer/>{dialog&&<PurchaseDialog onClose={()=>setDialog(false)}/>}
  </>;
}
if(document.getElementById('root')) createRoot(document.getElementById('root')).render(<App/>);
