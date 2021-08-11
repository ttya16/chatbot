import React, { useState, useEffect } from 'react';
import './App.css';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdbIcon from '@material-ui/icons/Adb';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

// endpoint
let endPoint = "ws://localhost:5000/ws";
let socket = new WebSocket(`${endPoint}`);

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    maxWidth: 400,
    minWidth: 275,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}),
);

const App = () => {
  // create state using hooks
  const [messages, setMessages] = useState(
    [
      {
        type: 'text',
        text: "Welcome.",
        speaker: "BOT",
        date: new Date()
      }
    ]
  )

  const [message, setMessage] = useState("")

  useEffect(() => {
    socket.onmessage = (event) => {
      const newMsg = {
        type: 'text',
        text: event.data,
        speaker: "BOT",
        date: new Date()
      };
      setMessages([...messages, newMsg])
    };
    
  }, [messages.length]);

  const classes = useStyles();



  const handleChange = (value: React.SetStateAction<string>) => {
    setMessage(value);
  };

  const onClick = () => {
    if (message !== "") {
      const newMsg = {
        type: 'text',
        text: message,
        speaker: "USER",
        date: new Date()
      }
      setMessages([...messages, newMsg])
      // emit the message to server when button is clicked
      socket.send(message)
      setMessage("");
    } else {
      alert("Please add a message.")
    }
  };

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardContent>
          {messages.map((msg, index) => {
            return (
              <div style={{ width: '100%' }} key={index}>
                {msg.speaker === 'BOT' && (
                  <Box display="flex" justifyContent="flex-start">
                    <Avatar>
                      <AdbIcon />
                    </Avatar>
                    <Paper style={{ width: '70%' }} >
                      {msg.text}
                    </Paper>

                  </Box>
                )}
                {msg.speaker === 'USER' && (
                  <Box display="flex" p={1} m={1} justifyContent="flex-end">
                    <Paper style={{ width: '70%' }} >
                      {msg.text}
                    </Paper>
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </Box>
                )}
              </div>
            )

          })

          }
          <Divider/>
        </CardContent>
        <CardActions>
          <Box display="flex" justifyContent="center" className={classes.paper}>
            <Avatar className={classes.large}>
              <AccountCircleIcon />
            </Avatar>
            {/* <input value={message} name="message" onChange={e => handleChange(e)} /> */}
            <TextField
              multiline
              maxRows={4} 
              variant="outlined" 
              value={message} 
              name="message" 
              onChange={(event) => handleChange(event.target.value)}
            />
            <Button variant="contained" color="primary" onClick={() => onClick()}>Send Message</Button>
          </Box>

          </CardActions>

      </Card>
    </React.Fragment>
  )
}

export default App;
