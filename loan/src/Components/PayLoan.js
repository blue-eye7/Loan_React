import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoginMe } from "../Actions/LoginAction";

export default function PayLoan() {
  let params = useParams();
  let [amount, setamount] = useState("");
  let [error, seterror] = useState("");
  let dispatch=useDispatch();
  let Navigate=useNavigate();


  function handlechange(e) {
    seterror("");
    setamount(e.target.value);
  }

  async function handlepay() {
    const balance = Number(params.balance);
    const enteredAmount = Number(amount);

    if (enteredAmount > balance) {
      seterror("You need to pay less than " + balance);
      console.log("not working");
      return;
    }
    try{
    let res=await axios.post("http://localhost:8080/PayLoan",null,{
      params:{
        loanid:params.loanid,
        amount:amount,
        userid:params.userid
      }
    })
      console.log(res.data);
      alert("loan paid:",enteredAmount)
      dispatch(LoginMe(true,res.data))
      Navigate('/GetLoan')
    }
 

   catch{
      console.log("err");
    }

    
  }

  return (
    <>
      <p>Balance to pay: {params.balance}</p>
      <p>Enter the amount you want to pay:</p>
      <input
        value={amount}
        name="payamount"
        type="number"
        placeholder="Enter the amount"
        onChange={handlechange}
      />
      <button onClick={handlepay}>Pay</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={()=>{Navigate('/')}}>Home</button>
    </>
  );
}
