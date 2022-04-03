import Login from './Login';
import Inbox from './Chat/Inbox';
import './app.css';
import { useState } from 'react';
export default function App(){
    const [change, setChange] = useState(false);
    function handleSendMessage(){
        setChange(true);
      }
      function makeChangeFalse(){
        setChange(false);
      }
    return (
        <div className='app-container'>
            <Inbox makeChangeFalse={makeChangeFalse} handleSendMessage={handleSendMessage} change={change} id="62497be654ae7cce4cbf91c8"/>
        </div>
    )
}