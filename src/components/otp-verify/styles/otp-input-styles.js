import styled from "styled-components";


export const otpInput = styled.input.attrs((props) => { 
    // console.log(props);
     return {
        type:"text",
        autoFocus:false,
        tabIndex:-1,
        value:props.value,
        onChange:props.onChange,
        onKeyUp:props.onKeyUp,
        onKeyDown:props.onKeyDown,
        onFocus:props.onFocus
     }
 })`   
    height: ${props => 32/3 + "px"}; 
    width: ${props => 32/3 + "px"};
    border-radius: 50%;
    background: ${props => props.value === ""? "rgb(176, 185, 192)" : "rgb(111, 121, 129)"};
 
    border: none;
    color: ${props => props.value === ""? "rgb(199, 207, 213)": "rgb(111, 121, 129)"};
    font-family: PingFangTC-Semibold;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: 0px;
    line-height: 32px;
    text-align: center;
    
 `;


export const Wrapper = styled.div`
   /*  height: 64px; */
    display:flex;
    flex-direction: row;
    justify-content:center;
    padding: 16px 0px;
    background: rgb(245, 247, 249);
    border-radius: 0px;
    box-shadow: inset 0px 1px 0px 0px rgb(221, 227, 231),
        0px 1px 0px 0px rgb(221, 227, 231);

    & > div{
        height: 32px;        
        width: 150px;

        display:flex;
        flex-direction:row;
        flex-wrap:nowrap;
        justify-content:space-between;
        align-items:center;
    }

   
    @media (max-width:767.98px) and (orientation: portrait),
    (max-width:374px) and (orientation:landscape), 
    (min-width:375px) and (max-width:991.98px) and (orientation:landscape)
    {
        background: rgb(255, 255, 255);
    }

    @media         
    (max-width:374px) and (orientation:landscape), 
    (min-width:375px) and (max-width:991.98px) and (orientation:landscape)
    {
        border-radius: 4px;
        border: 1px solid rgb(221, 227, 231);
        box-shadow: none;
    }
`;

