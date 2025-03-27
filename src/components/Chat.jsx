import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = ({ targetUserName, targetProfilePicture }) => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const user = useSelector(store => store.user)
  const userId = user?._id;


  const fetchChat = async () => {
    const chat = await axios.get(BASE_URL+"/chat/"+targetUserId, {
      withCredentials: true
    })
    console.log(chat.data.messages)
    const chatMessages = chat?.data?.messages.map(message => {
      return {firstName: message.senderId.firstName, lastName: message.senderId.lastName, text: message.text}})
      setMessages(chatMessages)

  }

  
  useEffect(() => {
    fetchChat()
  }, [])

  useEffect(() => {
    if(!userId) return null;
    // As soon as the page loads, the socket connection is made and joinChat event is emitted
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", ({firstName, lastName, text}) => {
      console.log(firstName+ "::  "+ text)
      setMessages(messages => [...messages, {firstName, lastName, text}])
      
    })

    return () => {
      socket.disconnect()
    }
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {firstName: user.firstName, lastName: user.lastName, userId, targetUserId, text: newMessage})
    setNewMessage("")
  }

  

  return (
    <div className="w-3/4 mx-auto border border-gray-600 h-[70vh] flex flex-col justify-between">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-y-scroll p-5">
        {messages.map((message, index) => 
            <div key={index} className={"chat " + (user.firstName === message.firstName ? "chat-end" : "chat-start")}>
            <div className="chat-header">
              {message.firstName} {message.lastName}
              <time className="text-xs opacity-50"> 2 hours ago</time>
            </div>
            <div className="chat-bubble">{message.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between">
        <input value={newMessage} type="text" className="w-3/4 border border-gray-600" onChange={(e) => setNewMessage(e.target.value)}></input>
        <button onClick={sendMessage} className=" w-1/4 btn btn-primary rounded-none">Send</button>
      </div>
    </div>
  );
};

export default Chat;
