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
        acc_no:0,
        address:""
    });
    function handlechange(e){
        setkyc({...kyc,[e.target.name]:e.target.value})
        
    }
    async function handleSubmit(e){
        e.preventDefault();
        console.log(user);
        
        try{
        let k=await axios.post(`https://loanapp-4ios.onrender.com/AddKyc?id=${user.id}`,kyc)
        if(k.data){
            alert("Kyc verified")
            dispatch(LoginMe(true,k.data))
            Navigate('/');

        }
    }
    catch{
        console.log("something went wrong");
    }

    }
    return(
        <form onSubmit={handleSubmit}>
            <input name="bank" type="text" value={kyc.bank} placeholder="Enter the Bank name" onChange={handlechange} required></input>
            <input name="acc_no" type="number" value={kyc.acc_no} placeholder="Enter the Acoount number" onChange={handlechange} minLength={13} required></input>
            <input name="address" type="text" value={kyc.address} placeholder="Enter your address" onChange={handlechange} required></input>
            <button>Verify</button>
        </form>
    )
}
export default Kyc;