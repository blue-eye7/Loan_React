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
        mobile:'',
        gender:''
    }
    let[formdata,setformdata]=useState(initialdata)
    let[error,seterror]=useState(initialdata)

    function handlechange(d){
        let {type,name,value}=d.target;
        if(type==="select-one"){
            setformdata({...formdata,[name]:value})
        }
        else{
          let formerror=  Validateform(name,value,formdata)
          setformdata({...formdata,[name]:value})
          seterror({...error,[name]:formerror})
        }
    }
    async function handlesubmit(e){
        e.preventDefault();
        console.log(formdata);
        if (Object.values(error).some((er) => er)) { alert("enter correct details")
      return;}
            let emailVer;
            let mobileVer;
            try{
                emailVer=await axios.get("https://loanapp-4ios.onrender.com/Validateemail",{
                    params:{
                        email:formdata.email,
                       
                    }
                })
                mobileVer=await axios.get("https://loanapp-4ios.onrender.com/Validatemobile",{
                    params:{
                        mobile:formdata.mobile,
                       
                    }
                })
            }
            catch{
                alert("something wrong...")
                return;
            }
            if(emailVer.data && mobileVer.data){storedetails() ; Navigate("/Login");}
            else{
                if(!emailVer){
                    seterror({...error,email:"email already found"})
                }
                else{
                    seterror({...error,mobile:"mobile no already found"})
                }
                return;
            }
        
    
        
        }
       async function storedetails(){
            try{
               let response= await axios.post("https://loanapp-4ios.onrender.com/AddUser",formdata)
               console.log(response);
            }
            catch{
                console.log("error..");
            }
           
        }


        return(
            <form onSubmit={handlesubmit}>
                <input type="text" value={formdata.username} name="username" placeholder="Enter the username" onChange={handlechange}/>
                {error.username&&<p>{error.username}</p>}
                <input type="password" value={formdata.pass} name="pass" placeholder="Enter the password" onChange={handlechange}/>
                {error.pass&&<p>{error.pass}</p>}
                <input type="password" value={formdata.rpass} name="rpass" placeholder="Reenter the password" onChange={handlechange}/>
                {error.rpass&&<p>{error.rpass}</p>}
                <input type="email" value={formdata.email} name="email" placeholder="email" onChange={handlechange}/>
                {error.email&&<p>{error.email}</p>}
                <input type="tel" value={formdata.mobile} name="mobile" placeholder="Reenter the mobilenumber" onChange={handlechange}/>
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