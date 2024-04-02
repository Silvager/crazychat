import InputBox from './input.tsx';
import { useState } from 'react';
function App() {
  const [messages, setMessages] = useState(new Array<string>);
  const MAX_MESSAGES = 10;

  function newMessage(message:string):void {
    let newMessages:Array<string> = [...messages];
    newMessages.push(message);
    if (newMessages.length > MAX_MESSAGES) {
      newMessages.shift();
    }
    setMessages(newMessages);
  }
  function getMessagesSection() {
    let paragraphs = [];
    for (let i=messages.length-1; i > -1; i--) {
      paragraphs.push(<p className='message'>{messages[i]}</p>);
    }
    return (<div id='messagesDiv'>
      {paragraphs}
    </div>)
  }

  return (

    <>
    <InputBox newMessage={newMessage}></InputBox>
    {getMessagesSection()}
    </>
  );
}

export default App
