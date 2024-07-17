const validarFormulario=()=>{
    let nombre=document.querySelector('#nombre').value;
    let email=document.querySelector('#email').value;
    let mensaje=document.querySelector('#mensaje').value;

    let errores=[];

    if(nombre ===""){
        errores.push("El nombre es obligatorio");
    }

    if(!validarEmail(email)){
        errores.push("El email no es válido")
    }
    if(mensaje ===""){
        errores.push("El mensaje es obligatorio");
    }

    if(errores.length>0){
        mostrarErrores(errores);
        //return false;
    }
    return true;


}

const validarEmail=(email)=>{
    let regexEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;//Expresión regular
    return regexEmail.test(email);
}



const mostrarErrores=(errores)=>{
    let mensaje ="";
    for(let i=0; i<errores.length;i++ ){
        mensaje+="*" +errores[i]+ "\n";
    }
    alert (mensaje);
}