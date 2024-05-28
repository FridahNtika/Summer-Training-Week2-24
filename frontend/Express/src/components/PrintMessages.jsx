import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';

export const PrintMessages = () => {
    const [messages, setMessages] = useState([]);

    // retrieve the question from the database
    const fetchMessages = async () => {
        const response = await axios.get("http://localhost:5001/message");
        console.log("response", response.data);
        setMessages(response.data);
    };

    useEffect(() => {
        fetchMessages();
    }, []);
    
    return (
        <>
        <h4>Responses so far are: </h4>
        {messages.map((message,index) => (
            <div key={index}>
                <p>{message}</p>
            </div>
        ))}
        </>
    )
}