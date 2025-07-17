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
        let res=await axios.post("http://localhost:8080/ApplyLoan",null,{
            params:{
                id:user.id,
                amount:amount
            }
        });
        console.log(res.data);
        dispatch(LoginMe(true,res.data))

        }
    catch(err){
        alert(err.response.data)
    }

    }

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