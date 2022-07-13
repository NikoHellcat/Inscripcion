// SCRIPT INSCRIPCION SUCURSAL

// Se ejecuta el scrip luego de cargado el DOM
document.addEventListener('DOMContentLoaded', function(){

//Bloqueo de acciones predeterminadas
window.addEventListener('dragover', (e)=>{e.preventDefault()});
window.addEventListener('drop', (e)=>{e.preventDefault()});

// Variables
const d = document;
const form = d.getElementById('formulario');

const enviar = d.getElementById('enviar');
const borrar = d.getElementById('borrar');
const subir_img = d.getElementById('subir_img');
const subir_file = d.getElementById('subir_file');

const puesto = d.getElementById('puesto');
const apellido = d.getElementById('apellido');
const nombre = d.getElementById('nombre');
const tipo_doc = d.getElementById('tipo_doc');
const nro_doc = d.getElementById('nro_doc');
const mail = d.getElementById('mail');
const fecha_nac = d.getElementById('fecha_nac');
const prof_pic = d.getElementById('prof_pic');
const curriculum = d.getElementById('file');

var init = { 
    method: 'POST'
};

// Event listeners

// enviar
enviar.addEventListener('click', e =>{

    e.preventDefault();

    //Validacion del formulario
    var estado = form.checkValidity();

    // Se Valida el estado del formulario
    if(estado==true){

        // Se valida el tamaño de la imagen
        if(d.getElementById('prof_pic').files[0].size < 512000){

           enviar_datos();

        }else{
            check();
            subir_img.classList.remove('subir');
            subir_img.classList.add('error_img');
            subir_img.innerHTML = 'La imagen debe de ser menor a 500kb';
            
        }

    }else{
        check();
    }

});

// borrar
borrar.addEventListener('click', e =>{

    e.preventDefault();
    location.reload();

});

// subir img
subir_img.addEventListener('click', e =>{

    e.preventDefault();
    prof_pic.click();

});

// subir file
subir_file.addEventListener('click', e =>{

    e.preventDefault();
    curriculum.click();

});

//Drag Over
subir_img.addEventListener("dragover", e => {
    e.preventDefault();
    subir_img.innerHTML = "Suelta para subir la imagen";
    subir_img.classList.add('hover');
    e.dataTransfer.dropEffect = 'copy';
});

//Drag Leave
subir_img.addEventListener("dragleave", e => {
    e.preventDefault();
    subir_img.innerHTML = "Seleccione una imagen";
    subir_img.classList.remove('hover');
});

//Drop
subir_img.addEventListener("drop", e => {
    e.preventDefault();
    e.stopPropagation();
    subir_img.innerHTML = "Seleccione una imagen";
    subir_img.classList.remove('hover');

    // validar archivos admitidos antes de enviarlos
    var archivos = e.dataTransfer.files[0];
    var valid_img = ['image/jpeg', 'image/png'];
    var tipo_archivo = archivos.type;

    if(valid_img.includes(tipo_archivo)){

        console.log('es imagen');
        prof_pic.files = e.dataTransfer.files[0];
    }else{

        console.log('no es imagen');
    }
});

// Funciones

// Se envian los datos
function enviar_datos(){

    var perfil = new FormData(document.getElementById("formulario"));
    init.body = perfil;
    
    var url = "php/grabar_perfil.php";
    var req = new Request(url, init);				
    
    fetch(req)
        .then(recuperar)
        .then(cargar)
        .catch(error);
}

// Se recuperan los datos
function recuperar(rta){

    return rta.json();
}

// Se realiza la accion de envio de formulario (submit)
function cargar(){

    form.submit();
}

// En caso de haberlos, se checkean los errores que contenga el formulario
function check(){

    //Checkear campos con errores

        //Puesto
        if(puesto.validity.valueMissing==true){
            puesto.classList.remove('input');
            puesto.classList.add('error');
        }else{
            puesto.classList.remove('error');
            puesto.classList.add('input');
        }

        //Apellido
        if(apellido.validity.valueMissing==true){
            apellido.classList.remove('input');
            apellido.classList.add('error');
            apellido.placeholder = 'Falta Apellido!';
        }else{
            apellido.classList.remove('error');
            apellido.classList.add('input');
            apellido.placeholder = 'Apellido';
        }

        //Nombre
        if(nombre.validity.valueMissing==true){
            nombre.classList.remove('input');
            nombre.classList.add('error');
            nombre.placeholder = 'Falta Nombre!';
        }else{
            nombre.classList.remove('error');
            nombre.classList.add('input');
            nombre.placeholder = 'Nombre';
        }

        //Tipo de documento
        if(tipo_doc.validity.valueMissing==true){
            tipo_doc.classList.remove('input');
            tipo_doc.classList.add('error');
        }else{
            tipo_doc.classList.remove('error');
            tipo_doc.classList.add('input');
        }

        //Nro documento
        if(nro_doc.validity.valueMissing==true){
            nro_doc.classList.remove('input');
            nro_doc.classList.add('error');
            nro_doc.placeholder = 'Falta Documento!';
        }else{
            nro_doc.classList.remove('error');
            nro_doc.classList.add('input');
            nro_doc.placeholder = 'Nro Documento';
        }

        //E-mail
        if(mail.validity.valueMissing==true){
            mail.classList.remove('input');
            mail.classList.add('error');
            mail.placeholder = 'Falta E-mail!';
        }else{
            mail.classList.remove('error');
            mail.classList.add('input');
            mail.placeholder = 'E-mail';
        }

        //Fecha de nacimiento
        if(fecha_nac.validity.valueMissing==true){
            fecha_nac.classList.remove('input');
            fecha_nac.classList.add('error');
        }else{
            fecha_nac.classList.remove('error');
            fecha_nac.classList.add('input');
        }

        //Imagen
        if(prof_pic.validity.valueMissing==true){
            subir_img.classList.remove('subir');
            subir_img.classList.add('error_img');
        }else{
            subir_img.classList.remove('error_img');
            subir_img.classList.add('subir');
        }

        //Curriculum
        if(curriculum.validity.valueMissing==true){
            subir_file.classList.remove('subir');
            subir_file.classList.add('error_img');
        }else{
            subir_file.classList.remove('error_img');
            subir_file.classList.add('subir');
        }

}

});