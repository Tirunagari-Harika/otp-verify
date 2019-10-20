import styled from "styled-components";

const SMSWrapperStyles = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;   

    padding-top: 16px;
    padding-bottom: 24px;    
    padding-right: 15px;
    padding-left: 16px;

    img{
        height: 56px;
        width: 56px;
    }

    img, div{
        margin: 8px 0px;
    }

    div{        
        text-align:center;       
        color: rgb(69, 79, 87);
        font-family: OpenSans-Regular;
        /* font-size: 0.875rem; */
        font-weight: 400;
    }

    @media 
        (min-width: 768px) and (orientation: portrait),
        (min-width: 992px) 
    {
        div{
            width: 318px;
        }
    }

    /* for both landscape and potrait of mobile */
    @media (max-width:767.98px) /* and (orientation: portrait) */
    {
        padding-top: 28px;
        padding-bottom: 20px;      

        background: none;

        img, div{
            margin: 4px 0px;
        }

        div{
            width: 100%;

        }
    }

    /* landscape of mobile */
    @media 
    (min-width:375px) and (max-width:991.98px) and (orientation:landscape)
    {
      
    }  


`;

export default ({
    SMSWrapperStyles
});
