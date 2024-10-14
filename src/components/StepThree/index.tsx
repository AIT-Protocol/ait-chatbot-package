import React, { useState, ChangeEvent, useCallback, useEffect, memo, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroll-component';

import { debounce } from '../../utils/common';
import TypingEffect from '../TypingEffect';

import './index.css';
import { ApiResponse, ChatbotResponse } from '../../types';

interface IChatHistory {
  question: string;
  answer: string;
  isLoading: boolean;
}

async function handleChatbotGuest<T>({ question_text }: { question_text: string }): Promise<ApiResponse<T>> {
  const url = 'https://logicapi.aitprotocol.ai/questions/guest';
  const options = {
    method: 'POST',
    headers: {
      "accept": "application/json, text/plain, */*",
    },
    body: JSON.stringify({
      question_text,
      question_type: "REGULAR",
    }),
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return {
      data: json,
      status: response.status,
    };
  } catch (err) {
    console.error('error:', err);
    throw err;
  }
}

const StepThree: React.FC = memo(() => {
  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  const lastUpdateTime = useRef<number>(0);

  const [chatHistory, setChatHistory] = useState<IChatHistory[]>([]);
  const [message, setMessage] = useState<string>('');
  const [formHeight, setFormHeight] = useState<string>('64px');
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = event.target.value;
    setMessage(newMessage);

    if (newMessage.trim() === '') {
      setFormHeight('64px');
    } else {
      setFormHeight(`${Math.max(64, event.target.scrollHeight)}px`);
    }
  }

  const debouncedAppendMessage = useCallback(debounce((newTranscript) => {
    setMessage(prevMessage => prevMessage + newTranscript);
  }, 50), []);

  const typeAnswer = (answer: string, index: number) => {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < answer.length) {
        setChatHistory(prev => {
          const newHistory = [...prev];
          newHistory[index].answer = answer;
          newHistory[index].isLoading = false;
          return newHistory;
        });
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 25);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    const newChatEntry: IChatHistory = {
      question: message,
      answer: "",
      isLoading: true,
    };

    setChatHistory(prevChatHistory => [...prevChatHistory, newChatEntry]);

    try {
      const result: ApiResponse<ChatbotResponse> = await handleChatbotGuest({
        question_text: message,
      });

      typeAnswer(result.data.data.answer.answer_text, chatHistory.length);
    } catch (error) {
      console.log(error);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  useEffect(() => {
    if (listening) {
      debouncedAppendMessage(transcript);
    }
    else if (!listening && transcript) {
      setMessage(prevMessage => prevMessage + transcript);
    }
  }, [transcript, listening, debouncedAppendMessage]);

  useEffect(() => {
    const scrollContainer = document.querySelector(".js_infinite_scroll");

    if (scrollContainer) {
      const intervalId = setInterval(() => {
        if (Date.now() - lastUpdateTime.current > 1000) { // check if more than 1000ms have passed since the last update
          clearInterval(intervalId); // stop the interval if no recent update to timeElapsed
        } else {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }, 10);

      return () => clearInterval(intervalId);
    }
  }, [timeElapsed]); // dependency array includes timeElapsed

  useEffect(() => {
    lastUpdateTime.current = Date.now(); // update the last update time whenever timeElapsed changes
  }, [timeElapsed]);

  useEffect(() => {
    const scrollContainer = document.querySelector(".js_infinite_scroll");

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [chatHistory])

  return (
    <div className={'chat_history'}>
      <div className={'chat_history_content'}>
        <InfiniteScroll
          dataLength={chatHistory.length}
          next={(async () => console.log("log"))}
          hasMore={chatHistory.length < 10}
          className={classNames('infinite_scroll', "js_infinite_scroll")}
          loader={<></>}
        >
          {chatHistory.map((item) => (
            <div key={item.question} className={'chat_history_item'}>
              <div className={'chat_history_item_top'}>
                <div className={'chat_history_item_top_img'}>
                  <img src="https://app.aitprotocol.ai/icons/chatbot-user.svg" alt="User Image" width={32} height={32} />
                </div>
                <div className={'chat_history_item_top_question'}>
                  {item.question}
                </div>
              </div>
              <div className={'chat_history_item_bottom'}>
                <div className={'chat_history_item_bottom_img'}>
                  <img src="https://app.aitprotocol.ai/icons/chat-robot.png" alt="User Image" width={32} height={32} />
                </div>
                <div className={'chat_history_item_bottom_chat'}>
                  <TypingEffect text={item.answer} delay={30} setTimeElapsed={setTimeElapsed} />
                  {item.isLoading && <svg
                    viewBox="8 4 8 16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flicker"
                  >
                    <rect x="10" y="6" width="1" height="100%" fill="#000000" />
                  </svg>}
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
      <form onSubmit={handleSubmit} autoComplete='off' noValidate className={'chat_history_messenger'} style={{ height: formHeight }}>
        <div className={'chat_history_messenger_input'}>
          <textarea
            placeholder='Enter your question'
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button type="button"
            className={classNames('chat_history_messenger_input_voice', { ['listening']: listening })}
            onTouchStart={startListening}
            onMouseDown={startListening}
            onTouchEnd={SpeechRecognition.stopListening}
            onMouseUp={SpeechRecognition.stopListening}
            disabled={!browserSupportsSpeechRecognition}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15.9333 7.60001C15.6083 7.60001 15.35 7.85834 15.35 8.18334V9.50001C15.35 12.45 12.95 14.85 10 14.85C7.05 14.85 4.65 12.45 4.65 9.50001V8.17501C4.65 7.85001 4.39167 7.59167 4.06667 7.59167C3.74167 7.59167 3.48334 7.85001 3.48334 8.17501V9.49168C3.48334 12.8833 6.09167 15.675 9.41667 15.975V17.75C9.41667 18.075 9.675 18.3333 10 18.3333C10.325 18.3333 10.5833 18.075 10.5833 17.75V15.975C13.9 15.6833 16.5167 12.8833 16.5167 9.49168V8.17501C16.5083 7.85834 16.25 7.60001 15.9333 7.60001Z" fill="#595973" />
              <path d="M9.99998 1.66669C7.96665 1.66669 6.31665 3.31669 6.31665 5.35002V9.61669C6.31665 11.65 7.96665 13.3 9.99998 13.3C12.0333 13.3 13.6833 11.65 13.6833 9.61669V5.35002C13.6833 3.31669 12.0333 1.66669 9.99998 1.66669ZM11.0917 7.45835C11.0333 7.67502 10.8417 7.81669 10.625 7.81669C10.5833 7.81669 10.5417 7.80835 10.5 7.80002C10.175 7.70835 9.83332 7.70835 9.50832 7.80002C9.24165 7.87502 8.98332 7.71669 8.91665 7.45835C8.84165 7.20002 8.99998 6.93335 9.25832 6.86669C9.74998 6.73335 10.2667 6.73335 10.7583 6.86669C11.0083 6.93335 11.1583 7.20002 11.0917 7.45835ZM11.5333 5.84169C11.4583 6.04169 11.275 6.15835 11.075 6.15835C11.0167 6.15835 10.9667 6.15002 10.9083 6.13335C10.325 5.91669 9.67498 5.91669 9.09165 6.13335C8.84165 6.22502 8.55832 6.09169 8.46665 5.84169C8.37498 5.59169 8.50832 5.30835 8.75832 5.22502C9.55832 4.93335 10.4417 4.93335 11.2417 5.22502C11.4917 5.31669 11.625 5.59169 11.5333 5.84169Z" fill="#595973" />
            </svg>
          </button>
        </div>
        <button type="submit" className={'chat_history_messenger_submit'}>
          <img src="https://app.aitprotocol.ai/icons/icon-send.svg" alt="Send Icon" width={16} height={16} />
        </button>
      </form>
    </div>
  );
});

export default StepThree;
