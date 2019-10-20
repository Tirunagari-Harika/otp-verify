import styled from "styled-components";

const ResetTimerStyles = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;

    /* padding: 24px 0px; */

    & > div {
        color: rgb(176, 185, 192);
        font-family: OpenSans-Semibold;
       /*  font-size: 16px; */
        font-weight: 600;
        height: 22px;
        text-align: center;
        width: 41px;
        margin-right:24px;
        align-self:flex-end;
    }

    img{
        height:18px;
        width:18px;
        margin-right:4px;
    }    

`;

export default ({
    ResetTimerStyles
});
