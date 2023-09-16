import { useState, useRef, useEffect } from "react";
import "./App.css";
import ChatMessage from "./components/ChatMessage";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isOpen,setIsOpen] = useState(false)
  const Scroll = useRef();

  function clearChat() {
    setChatLog([]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    let chatLogNew = [...chatLog, { user: "user", message: `${input}` }];

    setInput("");
    setChatLog(chatLogNew);

    const messages = chatLogNew.map((message) => message.message).join("\n");
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messages }),
      });
      const data = await response.json();
      console.log(data?.data?.content,'the response')
      if(data?.data?.content){
        setChatLog([
          ...chatLogNew,
          { user: "assistant", message: `${data?.data?.content}` },
        ]);
      }else{
        setIsOpen(true)
      }
    } catch ({ error }) {
      setIsOpen(true)
    }
  };

  useEffect(() => {
    Scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  return (
    <div className="App">

      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-content">
          <span className="close" onClick={()=>{
            setIsOpen(false)
          }}>
            &times;
          </span>
          <h4>Facing An Eror Try Later</h4>
        </div>
      </div>

      <section className="chatBox">
        <div className="clearChat" onClick={clearChat}>
          <span style={{ paddingRight: "3px" }}>+</span> New Chat
        </div>
        {chatLog.length === 0 && <h1 className="heading">ChatBotix</h1>}
        <div className="chat-log">
          {chatLog.map((message, index) => {
            return <ChatMessage message={message} key={index} />;
          })}
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="chat-input-holder" ref={Scroll}>
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              className="chat-input-textArea"
              placeholder="Send a message"
              rows="1"
            ></input>
            <p className="send-button" onClick={handleSubmit}>
              <i class="fa-regular fa-paper-plane"></i>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default App;
