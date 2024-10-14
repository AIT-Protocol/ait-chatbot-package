import React, { ReactElement, useState } from "react";
import classNames from "classnames";
import { TypoLabel } from "./components/Typo";
import StepThree from './components/StepThree';

export const Chatbot = (): ReactElement => {
  const [toggleChatBot, setToggleChatBot] = useState<boolean>(false);

  return (
    <React.Fragment>
      <button className={classNames('chat_bubble', { ['toggle']: toggleChatBot })}
        onClick={(e) => {
          e.stopPropagation();
          setToggleChatBot(true);
        }}
      >
        <img src="https://app.aitprotocol.ai/icons/chat-bubble.png" alt="chat-bubble" width="100%" height="100%" />
      </button>
      <div className={classNames('chat_box', { ['toggle']: toggleChatBot })}>
        <div className={'chat_box_header'}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <img src="https://app.aitprotocol.ai/icons/logo-ait-node.svg" alt="logo" width="28px" height="28px" style={{
              width: '28px',
              height: '28px',
              borderRadius: '4px',
            }} />
            <TypoLabel size={14} className="leading-[150%]" color='gray'>
              Powered by AIT
            </TypoLabel>
          </div>
          <button className={'chat_box_header_close'} onClick={() => setToggleChatBot(false)}>
            <img src="https://app.aitprotocol.ai/icons/arrow-down.svg" alt="close-icon" width="24" height="24" />
          </button>
        </div>
        <StepThree />
      </div>
    </React.Fragment>
  )
}
