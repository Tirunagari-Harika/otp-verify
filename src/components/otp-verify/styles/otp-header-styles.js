import styled from "styled-components";
import header from "../../../components/header/headerStyles";

const SecondHeader = styled.div`   
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
 
    padding-top:24px;
    padding-bottom:16px;
    background:rgb(255, 255, 255);

    & > div{
        text-align:center;
        color: rgb(23, 38, 51);
       /*  font-family: OpenSans-Regular; */
    }

    & > div:first-child{
        font-size:1.125rem;
        font-weight:600;
        height:24px;
    }

    & > div:last-child{
        margin-top:9px;
        font-size:0.875rem;
        font-weight:400;
        height:19px;
    }
   
`;

const OtpHeaderWrapper = styled.div`
    margin-bottom:48px;

    ${header.HeaderStyles} > div:last-child{
        border:none;
        box-shadow:none;
    }

    ${header.ImageWrapper}{
        border:1px solid rgba(23, 38, 51, 0.08);
        box-shadow: 0px 2px 2px 0px rgba(23, 38, 51, 0.04);
    }    

    @media
        (max-width:767.98px),
        (min-width:375px) and (max-width:991.98px) and (orientation:landscape)
    {
        margin-bottom:0px;
        
        ${header.ImageWrapper}{
            padding-bottom:22px;
            border:none;
            box-shadow:none;
        }

        ${SecondHeader}{
            padding-top:0px;
            padding-bottom:12px;
        }

        ${header.HeaderStyles} > div:last-child{
            border:1px solid rgba(23, 38, 51, 0.08);
            box-shadow:none;
        }

    } 


   
`;

export default ({
    OtpHeaderWrapper,
    SecondHeader
})
