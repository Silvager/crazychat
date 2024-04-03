import processText from "./processtext";
import { set, ref, Database } from "firebase/database";
import InputBox from "./input";

interface Props {
    database:Database | undefined,
    username:string,
    messages:Array<string>
}
const MAX_MESSAGES:number = 15;
function Chat( {database, username, messages }:Props ) {

  function newMessage(message:string):void {
    message = username+": "+ processText(message);
    let newMessages:Array<string> = messages ? [...messages] : [];
    newMessages.push(message);
    if (newMessages.length > MAX_MESSAGES) {
      newMessages.shift();
    }
    set(ref(database!, 'messages/'), newMessages);
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
  return (
    <>
    <InputBox newMessage={newMessage} placeholder='Type here or you will be sorry'></InputBox>
    {getMessagesSection()}
    </>
  )

}
export {Chat};