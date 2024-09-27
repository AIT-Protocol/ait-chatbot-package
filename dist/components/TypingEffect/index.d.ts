import React from 'react';
interface ITypingEffect {
    text: string;
    delay: number;
    infinite?: boolean;
    setTimeElapsed: React.Dispatch<React.SetStateAction<number>>;
}
declare const TypingEffect: ({ text, delay, infinite, setTimeElapsed }: ITypingEffect) => React.ReactElement;
export default TypingEffect;
