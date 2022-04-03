import './message.css';
export default function Message(props){
    return (
        <div className="message" style={
            {
                textAlign: `${props.sent?"right":"left"}`}}>
            <div style={
                {
                    background:`${props.sent?"#fcaf45":"#843ab4"}`,
                    color:`${props.sent?"#261c16f7":"#ffc2f0"}`,
                    borderRadius: `${props.sent?"1rem 0rem 1rem 1rem":"0rem 1rem 1rem 1rem"}`   
                }}>
                {props.content}
            </div>
        </div>
    )
}