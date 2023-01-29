import Landing from "./landing";
import Login from "./auth/login";
import Register from "./auth/register";
import Main from "./app/main";
import Lobby from "./app/lobby";

import React from "react";
import { Route, Routes } from 'react-router-dom';


function App() {
  return (<Routes>
    <Route exact path="/" element = {<Landing/>} />
    <Route path="/login" element = {<Login/>} />
    <Route path="/register" element = {<Register/>} />
    <Route path="/lobby" element = {<Lobby/>} />
    <Route path="/main" element = {<Main/>} />
  </Routes>
  );
}

export default App;
