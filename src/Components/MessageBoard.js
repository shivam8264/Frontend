import React, { useEffect, useState,useRef } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux'; 
import styles from '../MessageBoard.module.css';

const socket = io('http://localhost:5000');

const MessageBoard = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const username = useSelector(state => state.auth.user?.username);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();
        socket.on('message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
        return () => {
            socket.off('message');
        };
    }, []);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/comments/messages');
            const data = await response.json();
            if (data.success) {
                setMessages(data.data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        
        if (!username) {
            console.error('User not logged in');
            return;
        }

        const newMessage = { username, message };
        socket.emit('message', newMessage);
        setMessage("");
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.container}>
            <h2 style={{textAlign:"center",fontWeight:"700"}}>NewsPlus Community Chat</h2>
            <div className={styles.messageList}>
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`${styles.messageItem} ${msg.username === username ? styles.myMessage : styles.otherMessage}`}
                    >
                        <div className={styles.messageText}>
                            <span className={styles.username}>{msg.username} :</span>
                            {msg.message}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form className={styles.form} onSubmit={handleSend}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit" className={styles.button}>Send</button>
            </form>
        </div>
    );
};

export default MessageBoard;