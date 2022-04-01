import { useState } from 'react';
import axios from "axios";
import './login.css';
export default function Login(){
    
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    function handleChange(event) {
        const { name, value } = event.target
        setForm(prevValue => {
            return (
                {
                    ...prevValue,
                    [name]: value
                }
            )
        })
    }
    function handleSubmit(event){
        event.preventDefault();
        axios.post("http://localhost:5000/login", form, {
            withCredentials: true
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div className="login">
            <div className="login-container">
            <form className="login-container-form" onSubmit={handleSubmit}>
                    <p className="login-form-creds">Username</p>
                    <input type="text" name="username" placeholder="example@example.com" className="login-form-input" onChange={handleChange}/>

                    <p className="login-form-creds">Password</p>
                    <input type="password" name="password" placeholder="Enter Password" className="login-form-input" onChange={handleChange}/>
                    <button type="submit" className="login-form-submit">Log in</button>

                    {/* <p className="register-link"> New User? <Link to="/authenticate/register" style={{ textDecoration: 'none' }}> Sign up</Link></p> */}
                </form>
            </div>
        </div>
    )
}