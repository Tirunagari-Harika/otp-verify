import styled from "styled-components";

export const otpInput = styled.input.attrs((props) => { 
   // console.log(props);
    return {
        autoFocus:false,
        tabIndex:-1,
        value:props.value,
        onChange:props.onChange,
        onKeyUp:props.onKeyUp,
        onKeyDown:props.onKeyDown,
        onFocus:props.onFocus
    }
})`
    color:blue;

`;

export const ErrorUI = styled.div`
    color:red;
    height:50px;
    margin: 5px;

`;