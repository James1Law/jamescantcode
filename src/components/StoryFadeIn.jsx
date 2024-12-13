import { useState, useEffect, useRef } from 'react';
import '../styles/StoryFadeIn.css';

function StoryFadeIn({ paragraphs, onReset }) {
  const [currentParagraph, setCurrentParagraph] = useState(-1);
  const paragraphRefs = useRef([]);

  useEffect(() => {
    // Initialize refs array
    paragraphRefs.current = paragraphs.map(() => paragraphRefs.current[0] || React.createRef());
  }, [paragraphs.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentParagraph(0);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentParagraph >= 0) {
      paragraphRefs.current[currentParagraph]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentParagraph]);

  const showNextParagraph = () => {
    if (currentParagraph < paragraphs.length - 1) {
      setCurrentParagraph(prev => prev + 1);
    }
  };

  const formatText = (text) => {
    const parts = text.split(/(\*[^\*]+\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return (
    <div className="story-container">
      {paragraphs.map((paragraph, index) => (
        <div 
          key={index} 
          className="paragraph-container"
          ref={el => paragraphRefs.current[index] = el}
        >
          <p className={`story-paragraph ${index <= currentParagraph ? 'visible' : ''}`}>
            {formatText(paragraph)}
          </p>
          {index === currentParagraph && (
            <div className="button-group">
              {currentParagraph < paragraphs.length - 1 && (
                <button onClick={showNextParagraph} className="story-button continue">
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

export default StoryFadeIn; 