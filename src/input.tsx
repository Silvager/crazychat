function InputBox({ newMessage }) {
    function buttonClicked() {
        let textBox = document.getElementById("textBox") as HTMLInputElement;
        newMessage(textBox.value);
        textBox.value = "";
    }
    return(
        <div id="inputBox">
            <input type="text" id="textBox"></input>
            <button onClick={buttonClicked}>Send</button>
        </div>
    );
}
export default InputBox;