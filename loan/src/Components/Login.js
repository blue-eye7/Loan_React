import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { LoginMe } from "../Actions/LoginAction";


function Login(){
    let dispatch=useDispatch()
    
    let Navigate=useNavigate()
    let[form,setForm]=useState({
        eMob:"",
        
        pass:""
    })

    function handlechange(e){
        let {name,value}=e.target
        setForm({...form,[name]:value.trim()})
    }
    async function handlesubmit(e){
        e.preventDefault()
        if(form.eMob&&form.pass){
        let send=form.eMob.includes('@')
        let verifydata=send?{email:form.eMob,pass:form.pass}:{mobile:form.eMob,pass:form.pass}
        console.log(verifydata);
        try{
        let verifiy=await axios.post("http://localhost:8080/Login",verifydata)
            console.log(verifiy.data);
            const confirmed = window.confirm("Are you sure you want to log in?");
            if(confirmed){
            dispatch(LoginMe(true,verifiy.data) )
            Navigate("/")}
            return;
        
        }
        catch(err){
            if(err.response){
                alert(`error${err.response.data}`);
            }
            else{
                console.log("axios err...");
            }
        }}
        else{
            alert("field cannot be empty");
        }

    }
    return(<form onSubmit={handlesubmit}>
        <label>Enter The Email or Mobile</label>
        <input type="text"name="eMob" value={form.eMob} placeholder="enter the Mobile or email" onChange={handlechange} required/>
        <input type="password"name="pass" value={form.pass} placeholder="enter the password" onChange={handlechange} required/>
        <button >Login</button><br/>
        <Link to={'/Signup'} >Dont have an account?Signup</Link>



    </form>)
}
export default Login;