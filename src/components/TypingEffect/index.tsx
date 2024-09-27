import React from 'react';
import { useState, useEffect } from 'react';

interface ITypingEffect {
  text: string;
  delay: number;
  infinite?: boolean;
  setTimeElapsed: React.Dispatch<React.SetStateAction<number>>;
}

const TypingEffect = ({ text, delay, infinite = false, setTimeElapsed }: ITypingEffect): React.ReactElement => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
        setTimeElapsed(prevTimeElapsed => prevTimeElapsed + delay);
      }, delay);

    } else if (infinite) {
      setTimeout(() => {
        setCurrentIndex(0);
        setCurrentText('');
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);


  return <span>{currentText}</span>;
};

export default TypingEffect;
