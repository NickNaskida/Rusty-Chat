import { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { Card, Input, Text } from "@nextui-org/react";

import "./ChatWindow.scss"

const ChatWindow = () => {
  const [inputValue, setInputValue] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://127.0.0.1:8080/ws/');

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'connecting ...',
    [ReadyState.OPEN]: 'open',
    [ReadyState.CLOSING]: 'closing',
    [ReadyState.CLOSED]: 'closed',
    [ReadyState.UNINSTANTIATED]: 'uninstantiated',
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage.data));
    }
  }, [lastMessage, setMessageHistory]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = useCallback(() => {
    sendMessage(inputValue);
    setInputValue('');
  }, [inputValue, sendMessage]);

  return (
    <Card css={{ mw: "400px" }}>
      <Card.Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.2rem",
        }}
      >
        <Text size="$xs">The WebSocket is currently {connectionStatus}</Text>
      </Card.Header>
      <Card.Body>
        <div className="chat_message_box">
          {messageHistory.map((message: string, idx) => (
            <div className="chat_message" key={idx}>
              {message.toString()} 
            </div>
          ))}
      </div>
      </Card.Body>
      <Card.Footer>
        <Input 
          bordered
          width='100%'
          size='sm'
          placeholder="Type a message..."
          color="primary" 
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyPress={handleKeyPress}
          disabled={readyState !== ReadyState.OPEN} 
        />
      </Card.Footer>
    </Card>

    // <div className="chat_window">
    //   <span>The WebSocket is currently {connectionStatus}</span>

    //   <div className="chat_message_box">

        
    //   </div>
    //   <div className="chat_message_input">
    //     <input
    //       type="text"
    //       placeholder="Type a message..."
    //       value={inputValue}
    //       onChange={(event) => setInputValue(event.target.value)}
    //       onKeyPress={handleKeyPress}
    //       disabled={readyState !== ReadyState.OPEN}   
    //     />
    //   </div>
    // </div>
  )
}

export default ChatWindow