import styled from "styled-components";
import timer  from "./reset-timer-styles";
import * as btnStyles from "./btn-styles";

const BtnStyles = btnStyles.BtnStyles;
const ResendSMSBtn = btnStyles.ResendSMSBtn;

const OtpBtnContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin-top: 32px;

    ${BtnStyles} {
        margin: 8px;  
    }

    /*  mobile devices */
    @media 
        (max-width:767.98px) and (orientation: portrait),
        (min-width:375px) and (max-width:991.98px) and (orientation:landscape),
        (max-width:374px) and (orientation:landscape)  
    {
        flex-direction:column;    

        ${BtnStyles} {
            width: 100%;
            margin: 6px;
        }      
    } 

`;

const OtpError = styled.div`
    display: ${props => props.showError === true? "block" : "none"};
    margin-top: 8px;
    margin-left: 18px;
    margin-right: 21px;

    color: rgb(255, 62, 62);
    font-family: OpenSans-Regular;
    /* font-size: 14px; */
    font-weight: normal;
    height: 38px;
    text-align: center;    

`;

const OtpContainerStyles = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    width: 478px;   

  
    & > div:first-child{
        border-radius: 4px;
        border: 1px solid rgba(23, 38, 51, 0.08);
        background-color: rgb(255, 255, 255);        
    }   

    ${timer.ResetTimerStyles} {
        padding-top: 24px;
        padding-bottom: ${props => props.showError === true? "36px" : "24px"};
    }

    @media 
        (max-width:767.98px) and (orientation: portrait),
        (max-width:374px) and (orientation:landscape),
        (min-width:375px) and (max-width:991.98px) and (orientation:landscape)
    {
        ${ResendSMSBtn} {
            width: 154px;           
        }

        ${OtpError} {
            margin-left: 16px;
            margin-right: 15px;
        }        
    }
    
    @media 
        (max-width:767.98px) and (orientation: portrait),
        (max-width:374px) and (orientation:landscape)
    {
        ${timer.ResetTimerStyles} {
            padding-top: ${props => props.showError === true? "19px" : "24px"};
            padding-bottom: 24px;
        }
    }

    @media 
        (min-width:375px) and (max-width:991.98px) and (orientation:landscape)
    {
        ${timer.ResetTimerStyles} {
            padding-top: ${props => props.showError === true? "19px" : "24px"};
            padding-bottom: ${props => props.showError === true? "0px": "24px"};
        }
    }

    @media 
        (min-width:375px) and (max-width:991.98px) and (orientation:landscape),
        (max-width:767.98px) and (orientation: portrait)
    {
        width: 375px;  

        & > div:first-child{
            border-radius: none;
            border: none; 
            background: none;         
        } 
    }

    /*  mobile devices potrait mode */
    @media (max-width:767.98px) and (orientation: portrait)
    {
        ${OtpBtnContainer} {
            padding: 0px 16px;
           /*  margin-top: 66px; */
           margin-top: 42px;
           
        }
    }

    /*  mobile devices landscape mode */
    @media         
        (max-width:374px) and (orientation:landscape)
    {
        width:100vh;
        ${OtpBtnContainer} {
            margin-top: 42px;
        }
    }

    @media 
        (min-width:375px) and (max-width:991.98px) and (orientation:landscape)
    {
        ${OtpBtnContainer} {
            margin-top: ${props => props.showError === true? "32px": "42px"};
        }
        
    }

    

    @media         
    (max-width:374px) and (orientation:portrait)  
    {
        width:100vw; 

    }
   

`;


export default ({
    OtpBtnContainer,
    OtpError,
    OtpContainerStyles
});



/* export * from "./sms-wrapper-styles"; */
