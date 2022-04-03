import './user.css';
export default function User(props){
    function handleClick(){
        props.onUserClick(props.id);
    }
    return (
        <div className="user-list-user" onClick={handleClick} style={{background:`${props.clickedUser===props.id?"#8080805e":"transparent"}`, display:`${props.id===props.mainid?"none":"block"}`}}>
            {props.username}
        </div>
    )
}