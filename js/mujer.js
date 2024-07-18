
const validarFormulario1=()=>{
    let email1=document.querySelector('#emailm').value;

    if(!validarEmail1(email1)){
        erroresm.push("El email no es válido")
    }
    
    if(erroresm.length>0){
        mostrarErroresm(erroresm);
        //return false;
    }
    return true; 
    
}
let erroresm=[];
const validarEmail1=(email1)=>{
    let regexEmail1=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;//Expresión regular
    return regexEmail1.test(email1);
}

const mostrarErroresm=(erroresm)=>{
    let mensajem ="";
    for(let i=0; i<erroresm.length;i++ ){
        mensajem+="*" +erroresm[i]+ "\n";
    }
    alert (mensajem);
}
