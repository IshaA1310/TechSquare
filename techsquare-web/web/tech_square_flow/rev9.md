🔙 BACKEND SIDE 🔙
build the UI for chat window /chat/targetUserId
setup socket.io on backend
used crypto library for hashed socket room id (sha26)


🕸️ FRONTEND SIDE 🕸️
intsall library npm install socket.io-client
make new file on utils folder -> socket.js (for new socket connection on client side)

new component chat.jsx 
register in app.jsx (/chat/:targetUserId)

useParams() extract exact param variable what you're defining - :targetUserId
useEffect (()=> {
  scoket connection basically events are trigerred
}, []);
