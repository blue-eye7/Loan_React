import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Transaction() {
    const user = useSelector(state => state.LoginReducer.userdata);
    const [transaction, setTransaction] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.transactions) {
            console.log("User transactions:", user.transactions);
            setTransaction(user.transactions);
        } else {
            console.warn("No transactions found or user is not defined.");
        }
    }, [user]);

    return (
        <>
            <h1>User name: {user?.username}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Loan ID</th>
                        <th>Loan Amount</th>
                        <th>Loan Issued Time</th>
                        <th>Transaction Amount</th>
                        <th>Transaction Time</th>
                        <th>Account Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transaction.map((e) => (
                            <tr key={e.transaction_id}>
                                <td>{e.transaction_id}</td>
                                <td>{e.loan?.id}</td>
                                <td>{e.loan?.loan_amount}</td>
                                <td>{e.loan?.issued_date}</td>
                                <td>{e.transaction_amount}</td>
                                <td>{e.transaction_time}</td>
                                <td>{user.kyc?.bank}, {user.kyc?.accno}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button onClick={() => navigate('/')}>Home</button>
        </>
    );
}
