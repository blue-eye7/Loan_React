import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginMe } from "../Actions/LoginAction";
import { useNavigate } from "react-router-dom";



function Kyc(){
    let user=useSelector(state=>state.LoginReducer?.userdata);
    let dispatch=useDispatch();
    let Navigate=useNavigate();

    let[kyc,setkyc]=useState({
        bank:"",
        accno:0,
        address:""
    });
    function handlechange(e){
        setkyc({...kyc,[e.target.name]:e.target.value})
        
    }
    async function handleSubmit(e){
        e.preventDefault();
        console.log(user);
        
        try{
        let k=await axios.post(`http://localhost:8080/AddKyc?id=${user.id}`,kyc)
            console.log(k.data);
            alert("kyc verified")
            dispatch(LoginMe(true,k.data))
            Navigate('/')
    }
    catch(error){
       if(error.response){
        alert(error.response.data)
       }
       alert("axios err..")
    }

    }
    return(
        <form onSubmit={handleSubmit}>
            <input name="bank" type="text" value={kyc.bank} placeholder="Enter the Bank name" onChange={handlechange} required></input>
            <input name="accno" type="number" value={kyc.accno} placeholder="Enter the Acoount number" onChange={handlechange} minLength={13} required></input>
            <input name="address" type="text" value={kyc.address} placeholder="Enter your address" onChange={handlechange} required></input>
            <button>Verify</button>
        </form>
    )
}
export default Kyc;