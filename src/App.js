import React from 'react';
import './App.css';
import { Route } from "react-router-dom";

import Limit from "./containers/account-limit";
import DebitCardLogin from "./containers/login-comps/debitcardlogin";
import UserIdLogin from "./containers/login-comps/userIdlogin";
/* import OtpVerify from "./containers/otp-verify"; */
import OtpVerify from "./containers/otp-verify";

import * as modals from "./containers/modals";

import ctx  from "./context/appContext";

//no change in code

function App() {
 // console.log("Url ",process.env.PUBLIC_URL);
  return (
    <ctx.AppContextProvider>
        <div className="App"> 
      
          <Route path="/limit" component={Limit}/>
          <Route path="/debit_card_login" component={DebitCardLogin} />
          <Route path="/user_id_login" component={UserIdLogin} />
          <Route path="/otp_verify" component={OtpVerify} /> 

          <Route path="/session_expired" component={modals.SessionExpired} />
          <Route path="/session_timedout" component={modals.SessionTimedout} />
          <Route path="/account_error" component={modals.AccountError} />

      {/* <DebitCardLogin /> */}
      
      </div>
    </ctx.AppContextProvider>
    
  );
}

export default App;
