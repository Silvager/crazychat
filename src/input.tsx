import { useRef } from "react";

interface Props {
    newMessage: (text: string) => void;
    placeholder:string;
}

function InputBox({ newMessage, placeholder }:Props) {
    const textRef = useRef<HTMLInputElement | null>(null);
    function buttonClicked(e:React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const textValue = (textRef.current?.value ?? '').trim();
        if (textValue.length > 0) {
            newMessage(textValue);
            textRef.current!.value = "";
        }
    }
    return(
        <form id="inputBox" onSubmit={buttonClicked}>
            <input type="text" ref={textRef} placeholder={placeholder}></input>
            <button type='submit'>Send</button>
        </form>
    );
}
export default InputBox;