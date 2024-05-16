import React, { useState } from "react";
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';

const Chat = () => {
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
    const [selectedLanguage, setSelectedLanguage] = useState('en'); 
  
    const toggleRecording = async (e) => {
      e.preventDefault();
      try {
        setIsRecording(!isRecording);
        const res = await axios.post('/audio', {language: selectedLanguage});
        setIsRecording(isRecording);
        const responseMessage = res.data;
        setQuestion(prevQuestion => prevQuestion + " " + responseMessage);
        console.log(res);
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    };
  
    const handleChange = (e) => {
      setQuestion(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('/', { message: question, model: selectedModel, language: selectedLanguage });
        const responseMessage = res.data;
        setMessages([...messages, { user: question, response: responseMessage }]);
        setQuestion('');
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    };
  
    const ClearChat = () => { setMessages([]) };
    const handleModelChange = (e) => {
      setSelectedModel(e.target.value);
    };
  
    const handleLanguageChange = (e) => {
      setSelectedLanguage(e.target.value);
    };
  
    return (
      <div className="chat-container">
        <div className="left-panel">
          <h2>Panel de Configuración</h2>
          <div>
            <label htmlFor="modelSelect">Seleccionar modelo:</label>
            <select id="modelSelect" value={selectedModel} onChange={handleModelChange}>
              <option value="gpt-3.5-turbo">GPT 3.5 Turbo</option>
              <option value="ft:gpt-3.5-turbo-0613:xrealityfactory:streamlit-test:8wrJg3Ol">Modelo FINE-TUNED</option>
              <option value="mistral">Mistral</option>
            </select>
          </div>
          <div>
            <label htmlFor="languageSelect">Seleccionar idioma:</label>
            <select id="languageSelect" value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <button onClick={ClearChat}>Limpiar Chat</button>
          <div>
          <Link to="/whisper">
            <button>🎧</button>
          </Link>
          </div>
  
        </div>
        <div className="chat-area">
          <h1 className="chat-title">SF CHATBOT</h1>
          <div className="message-container">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <strong>User:</strong> {msg.user}
                <br />
                <strong>Response:</strong> {msg.response}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="input-container">
            <input type="text" value={question} onChange={handleChange} className="input-field" placeholder="Escribe tu mensaje..." />
            <button type="submit" className="send-button">Enviar</button>
          </form>
        </div>
        <button
          type="button"
          className={`mic-button ${isRecording ? 'mic-on' : ''}`}
          onClick={toggleRecording}
          id="micButton"
        >
          🎤
        </button>
      </div>
    );
  };

  export default Chat;
