import Users from "./Users";
import Messages from './Messages';
import './inbox.css';
import axios from "axios";
import { useEffect,useState } from "react";
export default function Inbox(props) {
  
  const [data,setData] = useState({});
  const [load,setLoad] = useState(false);
  const [clickedUser,setclickedUser] = useState("");
  useEffect(() => {
    let mounted = true;
    axios
      .get(`http://localhost:4000/${props.id}`)
      .then(function (response) {
        if (mounted) {
          setData(response.data)
          setLoad(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => (mounted = false);
  }, [props.change]);
  
  function onUserClick(value){
    setclickedUser(value);
  }
  return (
    <div className="inbox">
      <div className="inbox-header">
        <span>Chat</span>
      </div>
      <div className="inbox-container">
      <div className="inbox-container-users">
        <div className="inbox-container-heading"> Users</div>
        <Users key="users" clickedUser={clickedUser} id={props.id} onUserClick = {onUserClick}/>
      </div>
      <div className="inbox-container-messages">
      <div className="inbox-container-heading" style={{color: '#fcaf45'}}> Inbox</div>
        {load?<Messages key="messages" id={props.id} makeChangeFalse={props.makeChangeFalse}handleSendMessage={props.handleSendMessage} clickedUser={clickedUser} change={props.change} inbox={data.inbox} /> : "Loading..." }
      </div>
      </div>
    </div>
  );
}
