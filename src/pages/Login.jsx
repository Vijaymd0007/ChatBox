import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import loginbg from "../assets/loginbg.avif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  background-image: url(${loginbg});
background-repeat: no-repeat;
background-size: cover;
height:100vh;
/* width:100vh; */
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;

.brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img {
            height:4rem;
            clip-path:circle(40%);
            
    }
    h1{
        color:#f8961e;
        font-weight: bolder;
        text-transform:uppercase;

    }
}
form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:transparent;
    border-radius:2rem;
    padding:3rem 5rem;
    

    


    input{


        background-color: black;
        opacity:0.7;
    
        padding:1rem;
        /* border:0.1rem solid #001d3d; */
        border:none;
        border-radius:0.4rem;
        
        width:100%;
        font-size:1.2rem;
        color:white;
        
    &:focus {
    border:0.1rem solid #001d3d;
    outline:none;
    background-color: black;
        opacity:0.9;
    
    &::selection{
        background-color: #f3722c;
        opacity:0.9;
    }
    &::active{
        background-color: black;
        opacity:0.9;
    }
    &::visited{
        background-color: black;
        opacity:0.9;
    }
}   


}
    button{
        background-color:#f3722c;
        color:white;
        padding:1rem 2rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition:0.5s ease-in-out;
        &:hover{
            background-color:#9d4edd;
        }
    }
    span{
        color:white;
        text-transform:uppercase;
        a{
            color:#f3722c;
            text-decoration:none;
            font-weight:bold;
        }
    }
   
}
`;
