import React from "react";

const Sample = () => {
    const [data,setData] = React.useState("");

    const changeDebit = (ev) => {
        let val = ev.target.value.replace(/\s/g, '');
        let newval = "";
        for(let i=0; i < val.length; i++) {
            if(i%4 === 0 && i > 0) newval = newval.concat(' ');
            newval = newval.concat(val[i]);
        }
        setData(newval);
    }

    /* const changeDebit = (ev) => {
       console.log(ev.target.value);
        let val = ev.target.value;
        if(val && val.length%4 ===0){
            let d = val.split(" ");
            if(d[d.length-1].length === 4){
                val += " ";
            }
           
        }
        setData(val);
    } */
    return (<input type="text" name="app" value={data} onChange={changeDebit}/>)
}

export default Sample;

/* if(data.length && data.length%4 === 0){
    console.log(data.length);
    let newval = data + " " + val.target.value;
    //console.log(newval);
    setData(newval);
    console.log(newval);
} */

/* $('#test_form').on('keyup', function(e){
    var val = $(this).val();
    var newval = '';
    val = val.replace(/\s/g, '');
    for(var i=0; i < val.length; i++) {
        if(i%4 == 0 && i > 0) newval = newval.concat(' ');
        newval = newval.concat(val[i]);
    }
    $(this).val(newval);
})  */
