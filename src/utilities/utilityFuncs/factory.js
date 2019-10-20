const maskAccountNumber = (num,noOfdigitsmasked,maskStr=".") => {
    // taking num as string, masks the first digits
   // console.log(num,noOfdigitsmasked,maskStr);
    num = num.toString().trim().split("");
    num.splice(0,noOfdigitsmasked-1);
   // console.log(num,noOfdigitsmasked);
    num = maskStr.repeat(noOfdigitsmasked) + num.join("");
  //  console.log(num);
    return num;  
}

export const maskAccountArray = (arr,key,noOfdigitsmasked,maskStr=".") => {
    if(!arr && !arr.length) return;
    if(!noOfdigitsmasked) return;
    let updatedArr = [];

    for(let i=0; i<arr.length; i++){
       let masked = maskAccountNumber(arr[i][key],noOfdigitsmasked,maskStr);
       updatedArr.push({
           ...arr[i],
           [key]:masked
       });
    }
    return updatedArr;
}


const setSizeBtn = (oldText,newText) => {
    let width = document.body.clientWidth;
    if(width <= 374){        
        return newText;
    }else if(width >= 375 && width <= 767.98){        
        return newText;
    }
    else if(window.matchMedia("(orientation: portrait)").matches) {
        // you're in PORTRAIT mode
        if(width > 767.98){            
            return oldText;
        }
    }
    else if (window.matchMedia("(orientation: landscape)").matches) {
        // you're in LANDSCAPE mode
        if(width >= 375 && width <= 991.98){           
            return newText;
        }
    } 
   
    return oldText;
}


const extractReference = (completepath) => {
    /* let completepath = props.history.location.pathname;    */  
    console.log(completepath);
    let path = completepath.split("/");

    if(path.length <= 2) { return; }
    const transactionReference = completepath.split("/")[2];
    console.log("Extracted Transaction Reference",transactionReference); 

   /*  validateTransactionReference(transactionReference);  */
   return transactionReference;
}


export default ({
    maskAccountArray,
    setSizeBtn,
    extractReference
})
