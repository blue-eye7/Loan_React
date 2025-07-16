
export function Validateform(name,value,originalform,){

    
    if(name==='email'){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let ok=emailRegex.test(value);
        if(!ok)
            return "invalid email";
  

    }
    else if(name==="mobile"){
       return (value.length!==10)?"invalid mobile":"";
    }
    else if(name==="pass"){
       return (value.length>=8)?"":"pasword must be greater than 8 digits";
    }
    else if(name==="username"){
        return (value===null)?"username cannot be null":"";
    }
    else{
        return(value===originalform.pass)?"":"password not matching";

    }
    return "";




}