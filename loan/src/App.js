
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Login from './Components/Login';
import Kyc from './Components/Kyc';
import Loan from './Components/Loan';
import GetLoan from './Components/GetLoans';
import PayLoan from './Components/PayLoan';
import PaidLoans from './Components/PaidLoans';
import Transaction from './Components/Transaction';


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Kyc' element={<Kyc/>}/>
        <Route path='/Loan' element={<Loan/>}></Route>
        <Route path='/GetLoan' element={<GetLoan/>}/>
         <Route path='/PayLoan/:loanid/:userid/:balance/:userid' element={<PayLoan/>}/>
         <Route path='/PaidLoan' element={<PaidLoans/>}/>
         <Route path='/Transaction' element={<Transaction/>}/>


        
      </Routes>
    </BrowserRouter>
  )
  
}

export default App;
