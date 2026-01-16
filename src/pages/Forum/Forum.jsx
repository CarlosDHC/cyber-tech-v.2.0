import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../../FirebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import styles from './Forum.module.css';

const Forum = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useAuth();
  const scrollRef = useRef();

  useEffect(() => {
    const q = query(collection(db, "forum_messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "forum_messages"), {
      text: newMessage,
      userId: currentUser.uid,
      userName: currentUser.displayName || currentUser.email,
      createdAt: serverTimestamp(),
    });
    setNewMessage("");
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesList}>
        {messages.map((msg) => (
          <div key={msg.id} className={msg.userId === currentUser.uid ? styles.myMsg : styles.otherMsg}>
            <small>{msg.userName}</small>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <form onSubmit={sendMessage} className={styles.inputArea}>
        <input 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tire sua dúvida com a turma..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Forum;