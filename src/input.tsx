function InputBox() {
    function onSubmitted() {
        alert("ur sus");
        return false;
    }
    return(
        <form className="input-form" onSubmit={onSubmitted}>
    <textarea name="messageArea"></textarea>
    <input type="submit" value="Send" formAction=""></input>
    </form>
    );
}
export default InputBox;