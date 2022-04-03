export default function Message(props){
    return (
        <div className="message">
            <p style={{color:`${props.sent?"red":"green"}`}}>
                {props.content}
            </p>
        </div>
    )
}