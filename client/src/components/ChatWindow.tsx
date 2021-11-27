import React, { useState, useEffect } from 'react';


import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdbIcon from '@material-ui/icons/Adb';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { isConstructorDeclaration } from 'typescript';
import { Typography } from '@material-ui/core';

import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import icon from "../images/icon.png";


const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    width: '100%',
    // maxWidth: 400,
    minWidth: 275,
  },
  cardroot: {
    maxHeight: 250,
    overflowY: 'scroll',
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


const ChatWindow = (props: any) => {
    const socket = props.socket
    // create state using hooks
    const [messages, setMessages] = useState(
        [
        {
            type: 'text',
            text: "ようこそ！",
            speaker: "BOT",
            date: new Date()
        }
        ]
    )

    const [message, setMessage] = useState("")
    const [activated, setActivated] = useState(false)

    useEffect(() => {
        socket.onmessage = (event: { data: any; }) => {
            const newMsg = {
            type: 'text',
            text: event.data,
            speaker: "BOT",
            date: new Date()
            };
        setMessages([...messages, newMsg])
    };

    }, [messages.length]);

    // メッセージ追加でチャットエリアのスクロールを一番下へ
    useEffect(() => {
        var chatAreaHeight = document.getElementById("chatarea")!.scrollHeight
        document.getElementById("chatarea")!.scrollTop=chatAreaHeight
    }, [messages.length])

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

    const onAccordionExpand = () => {
    if (activated){
        console.log("")
    } else {
        socket.send("activated")
        setActivated(true)
    }
    };

    return (
    <React.Fragment>
        <Accordion style={{ width: "33%", position: 'absolute', bottom: '10px', right: '16px'}} onChange={() => onAccordionExpand()}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
            <Typography variant="button">Try Chatbot from here!</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Card className={classes.root}>
            <CardContent className={classes.cardroot} id="chatarea">
                {messages.map((msg, index) => {
                return (
                    <div style={{ width: '100%' }} key={index}>
                    {msg.speaker === 'BOT' && (
                        <Box display="flex" p={1} m={1} justifyContent="flex-start">
                            <Avatar src={icon} size="large" />
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
                <Avatar icon={<UserOutlined />} size="large" />
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
        </AccordionDetails>
        </Accordion>
    </React.Fragment>
    )
}


export default ChatWindow;