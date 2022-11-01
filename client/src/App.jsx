import React, { useState } from "react";
import io from "socket.io-client";
import { Hero, Chat } from "./pages";
import { Navbar } from "./components";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import heroBG from './assets/hero.png';

const socket = io.connect("http://localhost:5000/");

const App = () => {
  
  const [bgImage, setBgImage] = useState('/');

  const bgImages = {
    '/': heroBG,
  }
  return (
    <div 
      className="w-screen max-w-full h-screen hero px-3 sm:px-8 lg:px-12 overflow-y-auto overflow-x-clip" 
      style={bgImage === '/chat' ? {background: '#1e1e1e'} : {backgroundImage: `url(${bgImages[bgImage]})`}}
    >
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<Hero setBgImage={setBgImage}/>}/>
          <Route path="/chat" element={<Chat setBgImage={setBgImage} socket={socket}/>} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;