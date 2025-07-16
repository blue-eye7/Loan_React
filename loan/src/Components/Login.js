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
        setForm({...form,[name]:value})
    }
    async function handlesubmit(e){
        e.preventDefault()
        let send=form.eMob.includes('@')
        let verifydata=send?{email:form.eMob,pass:form.pass}:{mobile:form.eMob,pass:form.pass}
        console.log(verifydata);
        try{
        let verifiy=await axios.post("https://loanapp-4ios.onrender.com/Login",verifydata)
        if(verifiy.data){
            console.log(verifiy.data);
            dispatch(LoginMe(true,verifiy.data) )
            Navigate("/")
            console.log(verifiy.data);
        }
        else{
            console.log("error");
            alert("use correct email and password")
        }
        }
        catch{
            console.log("err..");
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