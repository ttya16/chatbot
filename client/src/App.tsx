import React from 'react';
import './App.css';

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Divider, Typography } from '@material-ui/core';

import { teal } from "@material-ui/core/colors";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";

import TopBar from './components/TopBar';
import ChatWindow from './components/ChatWindow';



// let socket = new WebSocket(`${endPoint}`);

const App = () => {
  // endpoint
  let endPoint = "ws://localhost:5000/ws";
  const chatbotProps = {
    socket: new WebSocket(`${endPoint}`)
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: teal[500]
      },
      secondary: {
        main: "#00bcd4"
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <TopBar />
      <Divider />
      <ChatWindow {...chatbotProps} />
    </ThemeProvider>
  )
}

export default App;
