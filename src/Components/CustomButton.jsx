function CustomButton(props) {
    return(
        <button className={props.className} onClick={props.onClick} style={{backgroundColor:"#ff253a", marginLeft:"50px"}}>{props.children}</button>
    )
}
export default CustomButton