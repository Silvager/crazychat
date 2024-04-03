import { useRef } from "react";

interface Props {
    setUsername:Function,
    setLoggedIn:Function
}

export default function Login({setUsername, setLoggedIn}:Props) {
    const textRef = useRef<HTMLInputElement | null>(null);
    function loginButtonClicked() {
        if (textRef.current) {
        if (textRef.current.value != "") {
        setUsername(textRef.current.value);
        setLoggedIn(true);
        }
        }
    }
    return(<>
    <h1>I bid thee welcome to the CHAT</h1>
    <input type="text" ref={textRef} placeholder="Your Username"></input>
    <button onClick={loginButtonClicked}>Join the Party!</button>
    </>);
}