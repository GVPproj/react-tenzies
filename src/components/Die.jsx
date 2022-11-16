export default function Die(props){
    const styles = {
        // backgroundColor: props.isHeld ? "#41ead4" : "white"
        backgroundImage: props.isHeld ? `url(/dice_png/inverted-dice-${props.value}.png)` : `url(/dice_png/${props.value}.png)`,
        backgroundSize: "100%"
    }

    return (
        <div className="die-face shadow" 
            style={styles} 
            onClick={props.holdDice}>
            {/* <span>{props.value}</span> */}
        </div>
    )
}