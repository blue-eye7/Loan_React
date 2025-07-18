import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function PaidLoans(){


    let user=useSelector(state=>state.LoginReducer.userdata);
    let Navigate=useNavigate()


    return(
<>
        <table border={1}>
            <thead>
                <tr>
                <th>Username</th>
                <th>Loan amount</th>
                <th>Paid date</th>
                </tr>
            </thead>
            <tbody>
                {user.paid.map((e)=>
                <tr key={e.id}>
                    <td>{user.username}</td>
                    <td>{e.loanamount}</td>
                    <td>{e.createdDate}</td>
                </tr>
                )}
            </tbody>
        </table>
         <button onClick={()=>Navigate('/')}>Home</button>
    </>
    )



}