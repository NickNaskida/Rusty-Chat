import { useState } from 'react';

import "./ChatWindow.scss"

const ChatWindow = () => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('sendButton')?.click();
    }
  };

  const handleButtonClick = () => {
    console.log(inputValue);
  };

  return (
    <div className="chat_window">
      <div className="chat_message_box">
        <div className="chat_message">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        </div>
        <div className="chat_message">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis ad, nesciunt dolorem accusamus saepe rem 
        </div>
        <div className="chat_message">
          Sure! I'll send you a link.
        </div>
      </div>
      <div className="chat_message_input">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyPress={handleKeyPress}   
        />
        <button
          id="sendButton"
          onClick={handleButtonClick}
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button> 
      </div>
    </div>
  )
}

export default ChatWindow