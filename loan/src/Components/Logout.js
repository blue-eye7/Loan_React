import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LoginMe } from "../Actions/LoginAction"



export default function Logout(){
    let dispatch=useDispatch()
    let Navigate=useNavigate()
    function handleLogut(){
        const confirmed = window.confirm("Are you sure you want to log out?");
        if(confirmed){
        dispatch(LoginMe(false,{}))
        Navigate('/')}
    }



    return <button onClick={handleLogut}>Logut</button>
}