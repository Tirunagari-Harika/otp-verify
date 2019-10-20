import React from "react";
import timerImg from "../images/timer/ic_Clock.svg";
import styles from "../styles/reset-timer-styles";
import * as btnStyles from "../styles/btn-styles";

const ResetTimer = (props) => {
    //console.log("Reset ",props);
    let intervalRef = React.useRef(null);
    const [timer,setTimer] = React.useState(0);
    const [disableReset,setReset] = React.useState(false);

    const clearState = () => {       
        clearInterval(intervalRef.current);
        setTimer(0);        
    }

    React.useEffect(() => {
     // console.log("timer useEffect ",timer,props.resendOtpTimer);
     // if(intervalRef.current === null) return;
        if(timer >= props.resendOtpTimer || props.stopTimer === true){
            console.log("timer Stop ",timer,props.resendOtpTimer);        
            clearState();           
        }
        if(timer >= props.resendOtpTimer){
            setReset(false);
        }       

     // return () => clearInterval(intervalRef.current);
    },[timer,props.resendOtpTimer,props.stopTimer]);
    
    const incrementTimer = () => {       
       // if(intervalRef.current !== null) return;       
        intervalRef.current = setInterval(() => {       
           // console.log("Set Interval ",timer,props.resendOtpTimer);
            setTimer(timer => timer + 1);         
        },1000);     
    }

    const onClick = () => {
        setReset(true);
        props.resendOtp();
        setTimer(timer+1);
        incrementTimer();        
    }

     // works for lessthan 60*60 = 3600 seconds
    const formatTime = (t) => {
       // console.log("format",t);
        if(t > 3600) return;
        if(t >= 0 && t <= 9){
            return "00:0" + t;
        }else if(t <= 60){
            return "00:" + t;
        }else if(t%60 === 0){
            let d = t/60;
            if(d >=0 && d <= 9){
                return "0" + d + ":00";
            }
        }else if(t%60 !== 0){
          /*   let d = parseInt(t/60); */

            

        }
        return "00:" + t;

    }

    const updateTimer = () => {        
        return formatTime(props.resendOtpTimer - timer);
    }


    return (<styles.ResetTimerStyles>
        <img src={timerImg} alt={"no-timer-img"} />
        <div>
          {/*  00:30 */}
          {updateTimer()}
        </div>
        <btnStyles.ResendSMSBtn capsule={true} solid={true}
            disabled={disableReset}
            onClick={onClick}>
            Resend SMS Otp
        </btnStyles.ResendSMSBtn>

    </styles.ResetTimerStyles>)
}

export default ResetTimer;
