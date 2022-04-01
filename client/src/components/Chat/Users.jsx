import { useState, useEffect } from "react";
import User from './User';
import axios from "axios";


export default function Users() {


  const [users, setUsers] = useState([]);
  useEffect(() => {
    let mounted = true;
    axios
      .get(`http://localhost:5000/`)
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
        <User key={user._id} id={user._id} username={user.username} />
      ))}
    </div>
  );
}
