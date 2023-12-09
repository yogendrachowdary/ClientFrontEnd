import React from "react";
import axios from "axios"
import { useState } from "react";
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"
const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

export default Auth;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_,setCookies]= useCookies(["access_token"])
    const navigate=useNavigate()

    const handleSubmit=async (event)=>{
        event.preventDefault();
        try {
             const response=await axios.post("https://recipe-app-49ai.onrender.com/auth/login", {
                username,
                password
            });

            setCookies("access_token",response.data.token)
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");

          } catch (error) {
            console.error(error);
            alert("Incorrect Credentials")
          }
        };
  
    return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={"Login"} handleSubmit={handleSubmit} /> 
  }

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit=async (event)=>{
    event.preventDefault();
    try {
         await axios.post("https://recipe-app-49ai.onrender.com/auth/register", {
            username,
            password
        });
        alert("registration completed!!")
      
      } catch (error) {
        console.error(error);
      }
    };
  
  return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={"Register"} handleSubmit={handleSubmit} /> 
}


const Form=({username,setUsername,password,setPassword,label,handleSubmit})=>{
    
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2> {label} </h2>{" "}
        <div className="form-group">
          <label htmlFor="username"> Username: </label>{" "}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password"> Password: </label>
          <input
            type="password"
            id="username"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <button type="submit">{label} </button>
      </form>
    </div>
  );
}