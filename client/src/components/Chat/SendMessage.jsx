import { useState } from "react";
import axios from "axios";
export default function SendMessage(props) {
  const [message, setMessage] = useState("");
  function handleChange(event) {
    setMessage(event.target.value);
  }
  function handleSubmit() {
    setMessage("");
    if(message.length>0){
        axios.post('http://localhost:4000/sendmessage',{
            fromid:props.id,
            toid:props.clickedUser,
            message:message
        }).then(function (response) {
            console.log(response);
            props.handleSendMessage();
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }
  return (
    <div className="send-message" style={{display:`${props.clickedUser.length>0?"flex":"none"}`}}>
      <input
        type="text"
        name="content"
        placeholder="Type your message here..."
        className="send-message-content"
        onChange={handleChange}
        value={message}
      />
      <span className="send-message-button" onClick={handleSubmit}>
          <img src="./send_white_24dp.svg" />
      </span>
    </div>
  );
}
