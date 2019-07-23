import React, { useEffect, useState, useContext } from "react";
import {Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import PostForm from "../components/PostForm";

function Login(props) {
  const auth = useContext(AuthContext); 

  const inputs = [
    { type: "text", name: "username", placeholder: "Username" },
    { type: "password", name: "password", placeholder: "Password" },
  ];

  const afterPost = () => {
    auth.afterLogin();
    props.history.push('/restaurantlayout');
  }

  return (
    <div>
      <PostForm apiPath="/api/login" inputs={inputs} afterPost={afterPost}/>
      <button><Link to="/signup">Signup</Link></button>

    </div>
  );
}

export default Login;