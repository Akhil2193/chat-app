import Message from './Message';
import { useState,useEffect } from 'react';
export default function Messages(props){
    const [message,setMessage] = useState([]);
    const [inbox,setInbox] = useState(props.inbox);
    
    useEffect(() => {
        let mounted = true;
        setMessage(props.clickedUser.length>0&&inbox.filter(selected => selected.id === props.clickedUser));
        return () => (mounted = false);
      }, [props.clickedUser]);

    return (
        <div className="messages">
            {message.length>0?message.map((element) => (
                <Message key={element.id} content = {element.message} time ={element.time} sent = {element.sent} />
            )):"No messages"}
        </div>
    )
}

