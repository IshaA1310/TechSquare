import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
const token = localStorage.getItem('token');
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [ messages, setMessages ] = useState([]);
  const [ newMessage, setNewMessage ] = useState('');
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;

  const fetchMessages = async() => {
    try {
      const chat = await axios.get(BASE_URL + '/chat/' + targetUserId, {
        headers: {
          'authorization': token
        }
      });
      const chatMessages = chat?.data?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        console.log(senderId[0]?.firstName, 'senderId', text, 'text')
        return {
          firstName: senderId?.firstName,
          text
        }
      });
      setMessages(chatMessages);
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(()=> {
    fetchMessages();
  }, []);

  useEffect(()=> {
    if(!userId) return
    const socket = socketConnection();
    socket.emit('joinChat', { firstName, userId, targetUserId });

    socket.on('messageRecieved', ({ firstName, text }) => {
      console.log(firstName, text)
      setMessages((messages) => [...messages, { firstName, text }])
    })
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = socketConnection();
    socket.emit('sendMessage', { firstName, userId, targetUserId, text: newMessage });
    setNewMessage('');
  }

  return (
    <div className="flex justify-center items-start bg-base-200 h-screen">
      <div className="card bg-base-100 shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col rounded-xl overflow-hidden mt-2">
        <div className="bg-primary text-primary-content py-3 px-4 flex justify-between items-center shadow-md">
          <h2 className="text-lg font-semibold tracking-wide">💬 Chat Room</h2>
          <span className="text-sm opacity-80">Online</span>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-base-100">
          {messages.length === 0 && (
            <p className="text-center text-sm text-base-content/60 mt-10">
              No messages yet — start the conversation 👋
            </p>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`}>
              <div className="chat-header text-xs">
                {msg.firstName}
              </div>
              <div className={`chat-bubble ${ user.firstName === msg.firstName ? "chat-bubble-primary" : "chat-bubble-secondary" }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-base-300 bg-base-100 p-3 flex gap-2 items-center">
          <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text" placeholder="Type a message..." className="input input-bordered w-full rounded-full px-4 h-11 text-sm"
          />
          <button onClick={sendMessage} className="btn btn-primary rounded-full px-6 h-11 text-sm normal-case" >
            Send
          </button>
        </div>
      </div>
    </div>
  )
};

export default Chat;
