import React from 'react';
import { useState } from "react";
import axios from 'axios';

export const UserInput = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    
    // what to do when someone hits submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const requestBody = {
                user: username,
                mess: message
            };
            const response = await axios.post("http://localhost:5001/message", requestBody);
        } catch (error) {
            setError(error.message);
        }
    }
      
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
        </>
    )
}