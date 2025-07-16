import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import {Link ,Outlet,Navigate, useNavigate} from 'react-router-dom'
import { LoginMe } from '../Actions/LoginAction';
import Logout from './Logout';


function Home(){
    let Navigate=useNavigate()
    let user=useSelector(state=>state.LoginReducer);
    let dispatch=useDispatch()
    let Authed=user.Authed;

    function handleclick(){
        Navigate("/Login")
    }
    function handleApply(){
        if(user?.Authed){

        
        if(user?.userdata?.kyc){
            alert("apply for loan")
            console.log(user.userdata.kyc);
            console.log(user.userdata);
            Navigate('/Loan');

        }
        else{
            Navigate('/Kyc')
        }}
        else{
            alert("first Login")
            Navigate('/Login')
        }
        
    }

    return (
        <> { !user.Authed&&
            <div className='Nav'><div className='btn'><button onClick={handleclick}>Login</button> <Link className='link' to="/Signup">Signup</Link></div></div>
            }
        <div>
            <h1>Welcome {user?.userdata?.username}</h1>
            {Authed &&
            <Logout/>}
          
            <h2>Get loans Easily</h2>
            <h3>At lowest interest</h3>
        </div>
        <div className='Apply'>
            <button onClick={handleApply}>Apply Loan</button>
           { Authed&&<>
           {!user.userdata.kyc &&<button onClick={()=>Navigate('/Kyc')}>Add Kyc dteails</button>}
           <button onClick={()=>Navigate('/GetLoan')}>My Loans</button>
           <button onClick={()=>Navigate('/PaidLoan')}>Completed</button></>}
        </div>
         </>
    )
}
export default Home;