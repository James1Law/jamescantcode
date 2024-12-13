import { useState, useEffect } from 'react';
import '../styles/WordPullUp.css';

function WordPullUp({ text }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="word-pull-up">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`char ${isVisible ? 'visible' : ''}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

export default WordPullUp; 