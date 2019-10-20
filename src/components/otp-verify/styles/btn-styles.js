import styled from "styled-components";
import Button from "@webstudio/buttons";

export const BtnStyles = styled(Button).attrs((props) => {
    return {
        size:props.size,
        priority:props.priority,
        disabled:props.disabled
    }
})`
    width: 170px;

`;

export const ResendSMSBtn = styled(Button).attrs((props) => {
    return {
        capsule:props.capsule,
        solid:props.solid,
        disabled:props.disabled
    }
})`
    text-transform:uppercase;
    width: 153px;
    height: 28px;
`;




