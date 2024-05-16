import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Chat from './Chat.js';
import Whisper from './Whisper.js';
import Conversation from './Conversation.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/whisper" element={<Whisper />} />
        <Route path="/conversation" element={<Conversation />} />
      </Routes>
    </Router>
  );
}

export default App;

