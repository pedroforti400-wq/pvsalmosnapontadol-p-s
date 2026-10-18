import { ShieldCheck, Heart, Check } from 'lucide-react';
import { product } from '../config';
export default function Guarantee() {
  const days=product.guaranteeDays;
  return <section className="guarantee-section" id="garantia"><div className="container guarantee-inner"><div className="guarantee-seal"><ShieldCheck size={49}/><span>{days?`${days} DIAS`:'COM CARINHO'}</span><small>{days?'DE GARANTIA':'E TRANSPARÊNCIA'}</small></div><div><span className="eyebrow">TRANQUILIDADE EM CADA ESCOLHA</span><h2>{days?`Seu aprendizado começa com ${days} dias de garantia.`:'Uma escolha feita com confiança.'}</h2><p>{days?`Confira no checkout as condições completas da garantia de ${days} dias configurada pelo produtor.`:'Antes de comprar, confira o conteúdo, a licença e as condições de acesso e reembolso apresentadas pelo vendedor no checkout.'}</p><div className="guarantee-notes"><span><Check size={14}/>Condições claras</span><span><Heart size={14}/>Decisão com carinho</span></div></div></div></section>;
}
