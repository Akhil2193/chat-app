import './user.css';
export default function User(props){
    function handleClick(){
        props.onUserClick(props.id);
    }
    return (
        <div className="user-list-user" onClick={handleClick}>
            {props.username}
        </div>
    )
}