import React, { Fragment } from "react";
import OtpContainer from "../../components/otp-verify/components";
import OtpHeader from "../../components/otp-verify/components/otp-header";
import styled from "styled-components";

import ctx from "../../context/appContext";
import Loading from "../../components/loading";
import transactionTypes from "../../context/transactionTypes";
import services from "../../utilities/utilityFuncs/loginservices";
import utilities from "../../utilities/utilityFuncs/factory";

const Styles = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center; 
    color:green;   
`;


const OtpVerify = (props) => {
    const otpctx = React.useContext(ctx.AppContext);
    console.log("Otp isContext",otpctx);
    const [load,showload] = React.useState(false);
    const [submitload,showsubmitload] = React.useState(false);

    const getOtp = () => {
        services.getOtp(otpctx.transactionReference,otpctx.transactionType).then((res) => {
            if(res.status === 200){
              //  return { result:true };
              console.log("Initial otp triggered",res);
            }
        })
        .catch((e) => {
            console.log("Error",e);
           // return { result:false };
           console.log("Initial otp triggered Error",e.response);
        })
    }

  


    const getReference = () => {
        let completepath = props.history.location.pathname;
        let transactionRef = utilities.extractReference(completepath);
        //validateTransactionReference(transactionRef);
    }

    const loadActions = () => {
        switch(otpctx.transactionType){
            case transactionTypes.EXPRESS_REGISTRATION:
            case transactionTypes.ADHOC_PAYMENT:
                getOtp();
                break;
            case transactionTypes.EXCEEDED_LIMIT:
            default:
                showload(true);
                getReference();
                break;  
        }
    }

    React.useEffect(() => {
        loadActions();
    },[]);

    const submitActions = () => {
        switch(otpctx.transactionType){
            case transactionTypes.EXPRESS_REGISTRATION:
                // call reg api 
                services.expressRegistrationApi(otpctx.transactionReference).then((res) => {
                   /*  /${otpctx.transactionReference} */
                    let url = `https://${res.data.redirectUrl}/${otpctx.transactionReference}`.toString();
                    console.log("Redirect Url ",url,res);
                    showsubmitload(true);
                   // window.location.href = "https://google.com";
                    window.location.href = url;
                    return { result:true };                    
                })
                .catch((e) => {
                    console.log("Express Registration failed",e.response);
                    return { result:false };
                });
                break;
               
                
            case transactionTypes.ADHOC_PAYMENT:
                return { result:true };
               
            case transactionTypes.EXCEEDED_LIMIT:
                return { result:true };
            default:
                return null;
        }
        

    }

    const submitOtp = (val) => {
        console.log("Submit otp ",val);
       /*  return axiosInstance.axiosInstance.get(axiosInstance.submitOtp())
        .then((res) => {
            console.log("submit otp ",res);
            if(res.data.result === true){
                return {result:true };
            }else if(res.data.result === false){
                console.log("submit otp ",res.data.result);
                return { result:false };
            }
        })
        .catch((e) => {
            console.log("Error in submitting otp ",e);
        }) */
        showsubmitload(true);

        return services.verifyOtp(otpctx.transactionReference,val).then((res) => {
            console.log("submit otp",res);            
            if(res.status === 200){
                console.log("Otp verified successfully",res);
                submitActions();
               // return { result:true };
            }

        })
        .catch((e) => {
            console.log("Error",e);
            console.log("Otp verified failed",e);
            showsubmitload(false);
            return { result:false };
        })
    }

    const resendOtp = () => {
       /*  return axiosInstance.axiosInstance.get(axiosInstance.resendOtp())
        .then((res)=>{
            console.log("Resend otp ",res);
            if(res.data.result === true){
                return { result:true }
            }else if(res.data.result === false){
                return { result:false }
            }
        })
        .catch((e) => {
            console.log("Error in Resend Otp",e);
        }) */

        return services.getOtp(otpctx.transactionReference,otpctx.transactionType).then((res) => {
            console.log("Verify otp ",res);
            if(res.status === 200){
                return {result:true};
            }
        })
        .catch((e) => {
            console.log("Error",e);
            return { result:false };
        })
    }

    return (<Fragment>
        {load? (<Loading />):(<Fragment>
            <OtpHeader />
            <Styles>   
                <OtpContainer 
                    maxLength = {6}
                    failedOtpAttempts = {5}
                    resendOtpAttempts = {3}
                    resendOtpTimer = {30}
                    submitOtp={submitOtp}
                    resendOtp={resendOtp}
                    />
            </Styles>
            {submitload?(<Loading />):null}
        </Fragment> )}
        
    </Fragment>)
}


export default OtpVerify;
