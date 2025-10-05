import React from "react"
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Customize from "./pages/Customize";

import { useContext } from "react";
import { userDataContext } from "./context/UserContext";
import Home from "./pages/Home";
import Customize2 from "./pages/Customize2";


function App() {
 const {userData,loading}=useContext(userDataContext);

    if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }
  return (
    <>
    <Routes>
      <Route path="/" element={(userData?.assistantImage && userData?.assistantName)?<Home/>:<Navigate to="/customize"/> }/>
      <Route path="/signup" element={!userData ? <Signup/>:<Navigate to="/"/>}/>
        <Route path="/login" element={!userData?<Login/>:<Navigate to="/"/>}/>
        <Route path="/customize" element={userData?<Customize/>:<Navigate to="/signup"/>}/>
          <Route path="/customize2" element={userData?<Customize2/>:<Navigate to="/signup"/>}/>

    </Routes>
    </>
  )
}

export default App;
