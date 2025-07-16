import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import { LoginMe } from "../Actions/LoginAction"
import { useNavigate } from "react-router-dom"



function Loan(){
    let user=useSelector(state=>state.LoginReducer.userdata)
    let limit=user.loanlimit
    let[amount,setamount]=useState(0);
    let dispatch=useDispatch();
    let Navigate=useNavigate ();


    function handlechange(e){
        let newamount=e.target.value
            setamount(newamount)
            
        }
    async function handleapply(){
        if(amount===0){return;}
        try{
        let res=await axios.post("https://loanapp-4ios.onrender.com/ApplyLoan",null,{
            params:{
                id:user.id,
                amount:amount
            }
        });
        console.log(res.data);
        if(res.data){
            alert("loan applied")
            try{
            let state=await axios.get("https://loanapp-4ios.onrender.com/GetUser",{
                params:{
                    id:user.id
                }
            })
            console.log(state.data);
            dispatch(LoginMe(true,state.data));
        }
        catch{
            console.log("cant get the user");
        }
        }
        else{
            alert(`problem${res.data}`)
        }
    
    }
    catch{
        alert("something err..")
    }

    }
        useEffect(() => {
  console.log("Updated amount:", amount);
  console.log("updated limit:",limit);
}, []);

    return(
        

        <>
            <h2>your Limit:{limit}</h2>
            <div>
                <h3>Select the Loan amount</h3>
            <select value={amount} onChange={handlechange}>
                <option value={0}>Select the amount</option>
                {Array.from({ length: Math.floor(user.loanlimit / 500) }, (_, index) => {
                    const value = (index + 1) * 500;
                    return <option value={value} key={value}>Get: {value}</option>;
                })}
            </select>
            </div>
            <button onClick={handleapply}>Apply loan</button>
            <button onClick={()=>Navigate('/GetLoan')}>my loans</button>
        </>
    )
}
export default Loan;