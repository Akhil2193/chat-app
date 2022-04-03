import './message.css';
import NoMessage from './NoMessage';
import NoSelectedUser from './NoSelectedUser';
import Message from './Message';
import { useState,useEffect } from 'react';
import SendMessage from './SendMessage';
export default function Messages(props){
    const [message,setMessage] = useState([]);
    const [inbox,setInbox] = useState(props.inbox);
    useEffect(() => {
        setInbox(props.inbox);
    },[props.change]);
    useEffect(() => {
        let mounted = true;
        setMessage(props.clickedUser.length>0&&inbox.filter(selected => selected.id === props.clickedUser));
        props.makeChangeFalse();
        return () => (mounted = false);
      }, [props.clickedUser,inbox,props.change]);
    return (<div>
        {props.clickedUser.length>0?<div className="messages">
            {message.length>0?message.map((element) => {
                return (
                    <Message key={element._id} content = {element.message} sent = {element.sent} />
                )
            }):<NoMessage />}
        </div>:<NoSelectedUser />}
            <SendMessage id={props.id} clickedUser={props.clickedUser} handleSendMessage={props.handleSendMessage}/>
        </div>
    )
}

