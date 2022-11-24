function Signup() {
    const handleClick = () => {
        console.log("btn has been clicked")
    }
    return (
        <div className="main-secton">
            <form>
                <label>Names: </label> <br></br>
                <input type="text" />
                <label>Email: </label> <br></br>
                <input type="text" />

                <label>Password: </label> <br></br>

                <label>Comfirm password: </label> <br></br>
                
            </form>
        </div>

    )
}
export default Signup 