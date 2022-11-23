function Header (){
   const handleClick = () => {
    console.log("btn has been clicked")
    }
    return(
        <header>
            This ths th
            <button onClick={handleClick}>Submit</button>
        </header>
        
    )
}
export default Header