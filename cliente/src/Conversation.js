import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './Conversation.css';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Comment, Bars } from 'react-loader-spinner'

const Conversation = () => {
  const location = useLocation();
  const selectedLanguage = location.state.selectedLanguage;
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const goBackToChat = () => {
    navigate('/');
  };

  const toggleRecording = async (e) => {
    e.preventDefault();

    try {
      setIsRecording(true);
      const response = await axios.post('/audio_recorder', {timeout :10000});
      setIsRecording(false);
      
      if (response.data.str === "ERROR: Try again") {
        console.log("Error: Try again");
        return;
      }

      setIsLoading(true);


      const response2 = await axios.post('/audio_response', {language: selectedLanguage});

      console.log(response2.data.url);
      setIsLoading(false);

      setIsPlaying(true);
      let audio = new Audio(response2.data.url);
      audio.onended = () => {
        setIsPlaying(false);
      };
      audio.play();
      
      

    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  const handleSwitchChange = async (e) => {
    if (e.target.checked) {
      try {
        setIsRecording(true);
        const response = await axios.post('/audio_recorder', {timeout :10000});
        setIsRecording(false);
        
        if (response.data.str === "ERROR: Try again") {
          console.log("Error: Try again");
          return;
        }

        setIsLoading(true);


        const response2 = await axios.post('/audio_response', {language: selectedLanguage});


        setIsLoading(false);
        setIsPlaying(true);
        let audio = new Audio(response2.data.url);
        audio.onended = () => {
          setIsPlaying(false);
          handleSwitchChange(e);
        };
        audio.play();
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    } else {
      console.log("Half-Duplex Mode is off");
    }
  };

  return (
    <div>
      {isLoading && 
        <div className="comment-wrapper">
          <Comment
            visible={true}
            height="80"
            width="80"
            ariaLabel="comment-loading"
            color="#fff"
            backgroundColor="#F4442E"
          />
          <p className="comment-text">Generating response...</p>
        </div>
      }
      {isPlaying &&
        <div className="comment-wrapper">
          <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          />
          <p className="comment-text">Playing response...</p>
        </div>
      }
      {isRecording && <p className="listeningText">I'm listening to you</p>}
      <button
        type="button"
        className={`mic ${isRecording ? 'micon' : ''}`}
        onClick={toggleRecording}
        id="micButton"
        disabled={isRecording}
      >
        🎙️
      </button>
      <button className="backButton" onClick={goBackToChat}>Go back to chat</button>
      <FormGroup>
        <FormControlLabel control={<Switch  onChange={handleSwitchChange} />} label="Half-Duplex Mode" />
      </FormGroup>
    </div>
  );
};

export default Conversation;