import { useState, useEffect, useRef } from 'react';
import '../styles/PoemReveal.css';

function PoemReveal({ stanzas, onReset }) {
  const [currentStanza, setCurrentStanza] = useState(-1);
  const stanzaRefs = useRef([]);

  useEffect(() => {
    // Initialize refs array
    stanzaRefs.current = stanzas.map(() => stanzaRefs.current[0] || React.createRef());
  }, [stanzas.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStanza(0);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentStanza >= 0) {
      stanzaRefs.current[currentStanza]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentStanza]);

  const showNextStanza = () => {
    if (currentStanza < stanzas.length - 1) {
      setCurrentStanza(prev => prev + 1);
    }
  };

  return (
    <div className="poem-container">
      {stanzas.map((stanza, index) => (
        <div 
          key={index} 
          className="stanza-container"
          ref={el => stanzaRefs.current[index] = el}
        >
          <pre className={`poem-stanza ${index <= currentStanza ? 'visible' : ''}`}>
            {stanza}
          </pre>
          {index === currentStanza && (
            <div className="button-group">
              {currentStanza < stanzas.length - 1 && (
                <button onClick={showNextStanza} className="poem-button continue">
                  Continue
                </button>
              )}
              <button onClick={onReset} className="reset-button">
                ↺
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PoemReveal; 