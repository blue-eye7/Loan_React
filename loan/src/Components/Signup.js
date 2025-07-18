import {  useState } from "react"
import { Validateform } from "./Validate";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";


function Signup(){

    let Navigate=useNavigate()
    let initialdata={
        username:"",
        pass:'',
        rpass:'',
        email:'',
        mobile:"",
        gender:''
    }
    let[formdata,setformdata]=useState(initialdata)
    let[error,seterror]=useState(initialdata)

    function handlechange(d){
        let {type,name,value}=d.target;
           if (type === "tel" && name === "mobile") {
        value = value.replace(/\D/g, ''); // remove non-digits
        setformdata({ ...formdata, [name]: Number(value.trim()) }); // 👈 convert to number
    } else if (type === "select-one") {
        setformdata({ ...formdata, [name]: value });
    } else {
        value=value.trim()
        let formerror = Validateform(name, value, formdata);
        setformdata({ ...formdata, [name]: value });
        seterror({ ...error, [name]: formerror });
    }
    }
    async function handlesubmit(e){
        e.preventDefault();
        console.log(formdata);
        if (Object.values(error).some((er) => er))
        { 
            alert("enter correct details")
            return;
        }
        let response;
        try{
         response=await axios.post("http://localhost:8080/AddUser",formdata,{headers:{"Content-Type":"application/json"}});
        console.log(response.data);
        Navigate('/Login')
    }
   catch (error) {
    if (error.response) {

        
        alert(`Error: ${error.response.data}`);
    }  else {
       return;
    }
}

 }
        
    
        
        
       


        return(
            <form onSubmit={handlesubmit}>
                <input type="text" value={formdata.username} name="username" placeholder="Enter the username" onChange={handlechange} required/>
                {error.username&&<p>{error.username}</p>}
                <input type="password" value={formdata.pass} name="pass" placeholder="Enter the password" onChange={handlechange} required/>
                {error.pass&&<p>{error.pass}</p>}
                <input type="password" value={formdata.rpass} name="rpass" placeholder="Reenter the password" onChange={handlechange} required/>
                {error.rpass&&<p>{error.rpass}</p>}
                <input type="email" value={formdata.email} name="email" placeholder="email" onChange={handlechange}  onKeyDown={(e) => {
    if (e.key === ' ' || e.key === 'Tab') {
      e.preventDefault();}} // prevent inserting space/tab
    } required/>
                {error.email&&<p>{error.email}</p>}
                <input type="tel" value={formdata.mobile} name="mobile" placeholder="Reenter the mobilenumber" onChange={handlechange} required/>
                {error.mobile&&<p>{error.mobile}</p>}
                <select name="gender" value={formdata.gender} onChange={handlechange} required >
                    <option value={""} disabled>Select gender</option>  
                    <option value={"Male"} >Male</option> 
                    <option value={"Female"}>Female</option> 
                    <option value={"Other"}>Other</option>    
                </select>
                <button type="submit">click</button>
                <br></br><Link to={'/Login'}>Already have an account?Login</Link>
            </form>
        )
}
export default Signup;