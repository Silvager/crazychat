import InputBox from './input.tsx';
import { useEffect, useRef, useState } from 'react';
import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase, onValue, ref, set } from 'firebase/database';

function App() {
  const [messages, setMessages] = useState(new Array<string>);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string>();
  const MAX_MESSAGES = 10;
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

  function connectToFirebase() {
      appRef.current = initializeApp(firebaseConfig);
      if (appRef.current) {
        setConnected(true);
        dbRef.current = getDatabase(appRef.current);
        if (!dbRef.current) {setError("no database")}
        else {
          const messagesRef = ref(dbRef.current, 'messages/');
          onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            setMessages(data);
          })
        }
      } else {
        setError("no app");
      }
  }
  useEffect(() => {
    connectToFirebase();
  }, []);

  function newMessage(message:string):void {
    let newMessages:Array<string> = messages ? [...messages] : [];
    newMessages.push(message);
    if (newMessages.length > MAX_MESSAGES) {
      newMessages.shift();
    }
    set(ref(dbRef.current!, 'messages/'), newMessages);
    //setMessages(newMessages);
  }
  function getMessagesSection() {
    if (!messages) {return('')}
    let paragraphs = [];
    for (let i=messages.length-1; i > -1; i--) {
      paragraphs.push(<p className='message'>{messages[i]}</p>);
    }
    return (<div id='messagesDiv'>
      {paragraphs}
    </div>)
  }
  if (error) {
    return (<p>{error}</p>);
  }
  if (!connected) {
    return (<p>Loadin'</p>);
  }

  return (

    <>
    <InputBox newMessage={newMessage} placeholder='Type here or you will be sorry'></InputBox>
    {getMessagesSection()}
    </>
  );
}

export default App
