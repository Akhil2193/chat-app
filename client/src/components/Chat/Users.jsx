import { useState, useEffect } from "react";
import User from './User';
import axios from "axios";


export default function Users(props) {


  const [users, setUsers] = useState([]);
  useEffect(() => {
    let mounted = true;
    axios
      .get(`http://localhost:4000/`)
      .then(function (response) {
        if (mounted) {
          const updateUsers = [...response.data];
          setUsers(updateUsers);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => (mounted = false);
  }, []);


  return (
    <div className="users-list">
      {users.map((user) => (
        <User key={user._id+"1234"} mainid={props.id} id={user._id} username={user.username} clickedUser={props.clickedUser} onUserClick={props.onUserClick}/>
      ))}
    </div>
  );
}
