import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import registerbg from "../assets/registerbg.avif";
import register2 from "../assets/register.avif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`

  background-image: url(${register2});
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
    gap:1.5rem;
    justify-content:center;
    img {
            height:4rem;
            clip-path:circle(40%);
            
            
    }
    h1{
        color:black;
        font-weight: bolder;
        text-transform:uppercase;

    }
}
form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    /* background-color:rgb(0,0,0,0.3);
    box-shadow: 10px 10px 10px black; */
    /* filter:drop-shadow(10px 10px 10px black) */
    
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
        background-color: black;
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
        background-color:black;
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
            background-color:rgb(f,f,f);
        }
    }
    span{
        color:white;
        text-transform:uppercase;
        a{
            color:black;
            text-decoration:none;
            font-weight:bold;
        }
    }
   
}
`;
