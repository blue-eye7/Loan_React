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
  let filteredloan=user.loans.filter(e=>e.balance!=0);

  if (!user || !user.loans) {
    return <h1>Loading...</h1>; // Or handle unauthenticated users
  }
  function handlepay(id,balance){
    Navigate(`/PayLoan/${id}/${user.id}/${balance}/${user.id}`)
  }

    return(
        <>
        {user.loans.length===0 ? <h1>No loans</h1>:<div className="getloans">
        
        {   
          
            filteredloan.map((e)=><div className="loandetails" key={e.id}>

            <h1>Loan amount:{e.loan_amount}</h1>
            <h1>paid:{e.paid}</h1>
            <h1>Balance :{e.balance}</h1>
            <button onClick={()=>handlepay(e.id,e.balance)}>Pay Loan</button>
           


            </div>)
        }
         <button onClick={()=>Navigate('/')}>Home</button>
        
        
        </div>}
        </>
    )
}
export default GetLoan;