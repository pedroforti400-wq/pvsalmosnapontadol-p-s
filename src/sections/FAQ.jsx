import { useId, useRef, useState } from 'react';
import { Minus, Plus, Sparkles } from 'lucide-react';
import { faqItems } from '../faqs';
import './FAQ.css';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const accordionId = useId();
  const buttons = useRef([]);

  function moveFocus(event, index) {
    const last = faqItems.length - 1;
    const destinations = { ArrowDown: (index + 1) % faqItems.length, ArrowUp: (index + last) % faqItems.length, Home: 0, End: last };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    buttons.current[destinations[event.key]]?.focus();
  }

  return <section id="faq" className="sales-faq-section" aria-labelledby="sales-faq-title">
    <div className="sales-faq-container">
      <div className="sales-faq-heading">
        <p className="sales-faq-eyebrow"><Sparkles size={16} aria-hidden="true"/>AINDA TEM ALGUMA DÚVIDA?</p>
        <h2 id="sales-faq-title">Perguntas Frequentes</h2>
        <p className="sales-faq-subheadline">Tudo o que você precisa saber sobre o Salmos na Ponta do Lápis.</p>
      </div>

      <div className="sales-faq-list">
        {faqItems.map(({ id, question, answer }, index) => {
          const expanded = openId === id;
          const questionId = `${accordionId}-question-${id}`;
          const answerId = `${accordionId}-answer-${id}`;
          return <article className="sales-faq-item" data-open={expanded} key={id}>
            <h3>
              <button type="button" className="sales-faq-question" id={questionId}
                aria-expanded={expanded} aria-controls={answerId}
                ref={element => { buttons.current[index] = element; }}
                onClick={() => setOpenId(current => current === id ? null : id)}
                onKeyDown={event => moveFocus(event, index)}>
                <span>{question}</span>
                <span className="sales-faq-toggle" aria-hidden="true">{expanded ? <Minus size={19}/> : <Plus size={19}/>}</span>
              </button>
            </h3>
            <div className="sales-faq-answer" id={answerId} role="region" aria-labelledby={questionId}
              aria-hidden={!expanded} inert={!expanded}>
              <div className="sales-faq-answer-inner"><p>{answer}</p></div>
            </div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
