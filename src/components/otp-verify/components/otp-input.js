import React from "react";
/* import * as style from "./styles/otp-styles"; */
import * as styles from "../styles/otp-input-styles";

const Input = styles.otpInput;
const Wrapper = styles.Wrapper;

class OtpInput extends React.Component {
    myRefs = [];
    changeTriggered = false;
    
    state = {
        otp:[]
    }

    constructor(props){
        super(props);
        //create refs and initialize otp arr
        for(let i=0; i<this.props.maxLength; i++){
            this.myRefs[i] = React.createRef();
            this.state.otp[i] = "";
        }        
    }

    componentDidMount(){
        this.myRefs[0].current.focus();
    }

    nullifyOtp = () => {
        let newOtp = [...this.state.otp];
        for(let i=0; i<newOtp.length; i++){
            newOtp[i] = "";
        }
        this.setState({
            otp:newOtp
        },() => {
            this.myRefs[0].current.focus();
        });
    }

    focusRef = (i) => {
        this.myRefs[i].current.focus();
    }

    checkValueCondition = (val) => {        
        val = parseInt(val.trim());
        if(val === 0)   return true;        
        if(val >= 1 && val <= 9) return true;
        return false;
    }

    onFocus = (i,ev) => {
        if(i === 0) return;
        for(let j=0; j<this.state.otp.length; j++){
            let val = this.state.otp[j];
            if(j < i && !this.checkValueCondition(val)){
                this.focusRef(j);
            }
        }
    }

    handleBackspaceKey = (i) => {
       //console.log("Backspace ",this.state.otp[i],i);
        //first index or it has value
        if(i === 0 /* || this.checkValueCondition(this.state.otp[i]) */){
            this.focusRef(i);
        }else if(i > 0){
            this.focusRef(i-1);
        }        
    }

    handledeleteKey = (i) => {

    }

    onKeyUp = (i,ev) => {        
        let keyCode = ev.which || ev.keyCode;
       // console.log("keyUp ",keyCode);
        //backspace
        //can add delete !keyCode===8 && !keyCode===46 
        if(!keyCode === 8 && !keyCode === 46) return;
        if(this.changeTriggered === true){
            this.changeTriggered = false;
            return;
        }
        if(keyCode === 8){           
            this.handleBackspaceKey(i);
        }else if(keyCode === 46){
            this.handledeleteKey(i);
        }

    }

    handleEnterKey = (i) => {
        //last index
        if(i === this.props.maxLength - 1) this.focusRef(i);
        //not last index
        else if(i < this.props.maxLength - 1 && 
            this.checkValueCondition(this.state.otp[i])){
                this.focusRef(i+1);
        }
    }

    
    onKeyDown = (i,ev) => {
        let keyCode = ev.which || ev.keyCode;        
        //enter
        if(!keyCode === 13 && !keyCode === 8) return;
        if(keyCode === 13){
            this.handleEnterKey(i);
        }

    }

    handlechange = (val,i) => {   
        let newotp = [...this.state.otp];
        newotp[i] = val;
        this.setState({
            otp:newotp
        },() => {
            if(val === "" || i >= this.props.maxLength - 1){                
                this.focusRef(i);
                this.changeTriggered = true;
            }else{
                this.focusRef(i+1);               
            }            
            let otp = this.state.otp.join("");
            this.props.otpChangeHandler(otp);
        })
    }

    onChange = (i,ev) => {
        let val = ev.target.value.trim();
       // console.log("CHange ",val);              
        if(val === "" || this.checkValueCondition(val)){
            this.handlechange(val,i);           
        }else if(val > 9){
            // if two digit. value can never be empty
            let newVal = val[val.length-1];
            if(this.checkValueCondition(newVal)){
                if(i === this.props.maxLength - 1){
                    return;
                }
                this.handlechange(newVal,i+1);                
            }
        }
    }

   
  
    getInputArr = () => {
        let inputArr = [];
        for(let i=0; i<this.props.maxLength; i++){
            inputArr.push(<Input 
                        key = {i}  
                        ref = {this.myRefs[i]}
                        value = {this.state.otp[i]} 
                        onChange = {this.onChange.bind(this,i)} 
                        onKeyUp = {this.onKeyUp.bind(this,i)} 
                        onKeyDown = {this.onKeyDown.bind(this,i)}
                        onFocus = {this.onFocus.bind(this,i)} />)
        }
        return inputArr;
    }



    render(){
        return (<Wrapper>
            <div>
            {this.getInputArr()}
            </div>
           
        </Wrapper>)
    }
}

export default OtpInput;

/* onChange = (i,ev) => {
    let newOtp = [...this.state.otp];
    newOtp[i] = ev.target.value;
    this.setState({ otp:newOtp },() => {
        let otp = this.state.otp.join("");
        this.props.otpChangeHandler(otp);
    })
} */

/* onChange = (i,ev) => {
    let val = ev.target.value.trim();
    if(val === "" || this.checkValueCondition(val)){
        let newotp = [...this.state.otp];
        newotp[i] = val;
        this.setState({
            otp:newotp
        },() => {
            if(i === this.props.maxLength - 1){
                this.focusRef(i);
            }else{
                this.focusRef(i+1);
            }
            let otp = this.state.otp.join("");
            this.props.otpChangeHandler(otp);
        });
    }else if(val > 9){
        // if two digit. value can never be empty
        let newVal = val[val.length-1];
        if(this.checkValueCondition(newVal)){
            let newotp = [...this.state.otp];
            newotp[i+1] = newVal;
            this.setState({
                otp:newotp
            },() => {
                if(i === this.props.maxLength - 1){
                    this.focusRef(i);
                }else{
                    this.focusRef(i+1);
                }
                let otp = this.state.otp.join("");
                this.props.otpChangeHandler(otp);
            })
        }
    }
}
 */
