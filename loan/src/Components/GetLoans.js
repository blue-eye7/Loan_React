import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function GetLoan(){
    let Navigate=useNavigate();
    let user=useSelector (state=>state.LoginReducer.userdata);
      useEffect(() => {
    if (user && user.loans) {
      console.log(user.loans);
    }
  }, [user]);

  if (!user || !user.loans) {
    return <h1>Loading...</h1>; // Or handle unauthenticated users
  }
  function handlepay(id,balance){
    Navigate(`/PayLoan/${id}/${user.id}/${balance}`)
  }

    return(
        <>
        {user.loans.length===0 ? <h1>No loans</h1>:<div className="getloans">
        
        {
            user.loans.map((e)=><div className="loandetails" key={e.id}>

            <h1>Loan amount:{e.loan_amount}</h1>
            <h1>paid:{e.paid}</h1>
            <h1>Balance :{e.balance}</h1>
            <button onClick={()=>handlepay(e.id,e.balance)}>Pay Loan</button>
            <button onClick={()=>Navigate('/')}>Home</button>


            </div>)
        }
        
        
        </div>}
        </>
    )
}
export default GetLoan;