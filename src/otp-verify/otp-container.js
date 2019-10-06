import React from "react";
import OtpInput from "./otp-input";
import axios from "axios";
import styles from "./otp-styles";

const ErrorUI = styles.ErrorUI;


// contains submit, reset, opt-input
class OtpContainer extends React.Component {
    otpRef = React.createRef();
    state = {
        otp:"",
        failedOtp:0,
        disableSubmit:true,
        showError:false
    }
   
    otpChangeHandler = (val) => {
        let otp = val.trim();
        let disableSubmit = true;
        if(otp.length === this.props.maxLength){
            disableSubmit = false;
        }
        this.setState({
            otp:otp,
            disableSubmit:disableSubmit
        })
    }

    submitOtp = async () => {
        //api call 
        console.log("submit");        
        const result = await axios.get("/json/submit.json");
        let res = result.json();
        if(res.result === true){
            console.log("suceeded");
        }else{
            this.otpRef.current.nullifyOtp();
            let failedAttempts = this.state.failedOtp + 1;
            
            this.setState({
                showError:true
            });

        }

       

    }

    render(){
        return (<div>
            Got Otp - {this.state.otp}
            <OtpInput 
                ref={this.otpRef}
                maxLength={this.props.maxLength}
                otpChangeHandler={this.otpChangeHandler} 
                />
            {this.state.showError? (<ErrorUI>
                Wrong Failed attempts
            </ErrorUI>):null}
            
            <button 
                onClick={this.submitOtp}
                disabled={this.state.disableSubmit}>Submit</button>
        </div>)
    }
}

export default OtpContainer;

/* axios.get("/json/submit.json")
.then((data) => {
    console.log("JSON Called ",data);
    if(data)
})
.catch((e) => {
    console.log("Exception ",e);
}) */