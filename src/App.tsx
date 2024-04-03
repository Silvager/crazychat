import { useEffect, useRef, useState } from 'react';
import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase, onValue, ref } from 'firebase/database';

import { Chat } from './chat.tsx';
import { Auth, getAuth, signInAnonymously } from 'firebase/auth';
import Login from './login.tsx';
function App() {
  const [messages, setMessages] = useState(new Array<string>);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [loggedIn, setLoggedIn] = useState(false);
  const firebaseConfig = {
    apiKey: "AIzaSyCZghDGcpsVmY_3gtoUkbnIp0AiGKZpu8A",
    authDomain: "crazychat-bf465.firebaseapp.com",
    projectId: "crazychat-bf465",
    storageBucket: "crazychat-bf465.appspot.com",
    messagingSenderId: "437651132269",
    appId: "1:437651132269:web:db915da6204966fbb5d464",
    databaseURL: "https://crazychat-bf465-default-rtdb.firebaseio.com"
  };
  const appRef=useRef<FirebaseApp>();
  const dbRef=useRef<Database>();
  const authRef=useRef<Auth>();

  function connectToFirebase() {
      //Initialize firebase
      appRef.current = initializeApp(firebaseConfig);
      if (appRef.current) {
        dbRef.current = getDatabase(appRef.current);
        if (!dbRef.current) {setError("no database")}
        else {
          //If there is a database
          authRef.current = getAuth();
          signInAnonymously(authRef.current).then(() => {
            // If authenticated properly
            setConnected(true);
            const messagesRef = ref(dbRef.current!, 'messages/');
            onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            setMessages(data);
          })
          }).catch(() => {setError("Authentication error")});
        }
      } else {
        setError("no app");
      }
  }
  useEffect(() => {
    connectToFirebase();
  }, []);
  //Go through and return various things depending on the state
  if (error) {
    return (<p>{error}</p>);
  }
  if (!connected) {
    return (<p>Loadin'</p>);
  }
  if (!loggedIn) {
    return <Login setUsername={setUsername} setLoggedIn={setLoggedIn}></Login>
  } else {
    //If the user is logged in
    return (
      <Chat database={dbRef.current} username={username!} messages={messages} ></Chat>
    )
  }
}

export default App
