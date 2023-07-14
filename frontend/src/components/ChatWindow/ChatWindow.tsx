import "./ChatWindow.scss"

const ChatWindow = () => {
  return (
    <div className="chat_window">
      <div className="chat_message_box">
        <div className="chat_message">Hello, I'm Ferris. What's your name?</div>
      </div>
      <div className="chat_message_input">
        <input type="text" placeholder="Type a message..." />
        <button>
          <i className="fa-solid fa-paper-plane"></i>
          </button> 
      </div>
    </div>
  )
}

export default ChatWindow