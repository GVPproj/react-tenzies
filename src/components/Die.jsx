export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }


    return (
        <div className="die-face shadow is-held" style={styles}>
            <span>{props.value}</span>
        </div>
    )
}