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
  }, []);
  function onUserClick(value){
    setclickedUser(value);
  }
  return (
    <div className="inbox-container">
      <div className="inbox-container-users">
        <Users onUserClick = {onUserClick}/>
      </div>
      <div className="inbox-container-messages">
        {load?<Messages clickedUser={clickedUser} inbox={data.inbox} /> : "Loading..." }
      </div>
    </div>
  );
}
