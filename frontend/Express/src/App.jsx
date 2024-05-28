import React from 'react';
import { useState, useEffect } from "react";
import "./App.css"
import axios from 'axios';

export const App = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);

    // retrieve the question from the database
    const fetchMessages = async () => {
        const response = await axios.get("http://localhost:5001/message");
        //console.log("response", response.data);
        setMessages(response.data);
    };

    useEffect(() => {
        fetchMessages();
    }, []);
    
    // what to do when someone hits submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const requestBody = {
                user: username,
                mess: message
            };
            const response = await axios.post("http://localhost:5001/new-message", requestBody);
            fetchMessages();
        } catch (error) {
            setError(error.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5001/delete/:${id}`)
            fetchMessages();
        } catch (error) {
            setError(error.message)
        }
    }

    /* const editMessage = async (id, username) => {
        try {
            const response = await axios.put(`http://localhost:5001/message/${username}`)
        }
    } */
      
    return (
        <>
        <form id = "input" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Post a Message</legend>
                <label> Create Username
                    <input type='text' onChange={(evt) => setUsername(evt.target.value)}></input>
                </label>
                <br></br>
                <label> Message
                    <input type='text' onChange={(evt) => setMessage(evt.target.value)}></input>
                </label>
                <br></br>
                <br></br>
                <button type='submit'>Submit response</button>
            </fieldset>
        </form>
        <h4>Responses so far are: </h4>
        {messages.map((message,index) => (
            <div key={index}>
                <p>{message.username}: {message.message}</p>
                <button>Edit</button>
                <button onClick={() => handleDelete(message.id)}>Delete</button>
            </div>
        ))}
        </>
    )
}