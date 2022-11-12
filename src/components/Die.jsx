export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }


    return (
        <div className="die-face shadow" 
            style={styles} 
            onClick={props.holdDice}>
            <span>{props.value}</span>
        </div>
    )
}