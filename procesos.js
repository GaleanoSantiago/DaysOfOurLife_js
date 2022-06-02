const date = new Date();
const dia = date.getDate();
const mes = date.getMonth();
const yyyy = date.getFullYear();
const hoy = `${yyyy}/${mes}/${dia}`; 
//console.log(hoy);

const diaSelect = document.getElementById("diaSelect");
const mesSelect = document.getElementById("mesSelect")
const yearSelect = document.getElementById("yearSelect");


const titulo = document.querySelector(".titulo");
const button = document.getElementById("boton");
const mostrarResultado = document.getElementById("mostrar_resultado");     //Div en donde se visualizarán los dias vivo

const nombresMeses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const diasMesNormales=[31,28,31,30,31,30,31,31,30,31,30,31]     //Año normal, con 365 dias
const diasMesBisiestos=[31,29,31,30,31,30,31,31,30,31,30,31]    //Dias del mes con 29 de febrero, para los años bisiestos
let yearBisiesto = false;       //Para determinar si es un año bisiesto. Inicializa en false

let diaSeleccionado = diaSelect.selectedIndex
let mesSeleccionado = mesSelect.selectedIndex
let yearSeleccionado = yearSelect.selectedIndex

mesSeleccionado=0;          //Defino al mes seleccionado como 0, esto evita errores relacionados al valor -1
diaSeleccionado=1;         //Defino al dia seleccionado como 0, esto evita errores relacionados al valor -1
yearSeleccionado=1950;         //Defino al dia seleccionado como 0, esto evita errores relacionados al valor -1

// console.log(`Dia Seleccionado Actual: ${diaSeleccionado}
// Mes Seleccionado Actual: ${mesSeleccionado}
// Año Seleccionado Actual: ${yearSeleccionado}

// `);


//Evento clic del boton de envio

button.addEventListener("click",(e)=>{
    boton()         //Llama a la funcion de boton()
    crearAnimaciones();     //Llama a la funcion de las animaciones top-resultado y bottom-resultado
});



const esBisiesto = (year) => {          //Funcion flecha para determinar si un año es bisiesto
    return (year % 400 === 0) ? true : 
                (year % 100 === 0) ? false : 
                    year % 4 === 0;
};



//Aca activo la funcion para los selects
contenidoSelectYears();
contenidoSelectMeses();
contenidoSelectDias();


function contenidoSelectYears(){

    for(i=1950;i<=yyyy;i++){
        const option = document.createElement("option");
        const valor = i;
        
        option.value=valor;
        option.text=valor;
        yearSelect.appendChild(option); 
    }
}


function contenidoSelectMeses(mesSeleccionado){
    mesSelect.innerHTML="";             //Primero vacio todos los options, si es que existen


    for(i=0;i<12;i++){
        const option = document.createElement("option");
        const valor = i;
        const texto = nombresMeses[i];
        option.value=valor;
        option.text=texto;
        mesSelect.appendChild(option);
    }

    if(mesSeleccionado==1){             //Si el mes que recibe al cambiar el mes es febrero
        contenidoSelectDias(mesSeleccionado);       //Vuelve a llamar a la funcion para mostrar los dias
    }


    // console.log(`Mes seleccionado por defecto: ${mesSeleccionado}`);
    if(mesSeleccionado != undefined){
        mesSelect.value=mesSeleccionado;
    
    }
    // console.log(`Mes seleccionado por defecto (Actualizado): ${mesSeleccionado}`);
    
};


function contenidoSelectDias(valor){
    diaSelect.innerHTML="";             //Primero vacio todos los options, si es que existen

    let meses = [];
    if(yearBisiesto===true){            //Para verificar si el año es bisiesto
        meses=diasMesBisiestos;
        // console.log("Meses: " + meses);
    }else{
        meses=diasMesNormales;
        // console.log("Meses:" + meses);
    }
    // console.log("Año Bisiesto: " + yearBisiesto);
    // console.log("Cantidad de dias: " + valor);

    if(valor==undefined){
        valor=0;
    }
    // console.log("Cantidad de dias: " + meses[valor]);


    //For para los dias del mes
    for(it=1;it<=meses[valor];it++){

        const option = document.createElement("option");
        const valor = it;
        option.value=valor;
        option.text=valor;
        diaSelect.appendChild(option);
        option.classList.add(`option_${valor}`);
    
    }
    diaSeleccionado=1;  //Reinicia el valor del dia seleccionado
}

// console.log("Cantidad de options " + diaSelect.options.length);      //FUNCIONAAAA :D

//Funcion para determinar el value de los selects
function valorSelect(){

    //Evento change del select dia
	
    diaSelect.addEventListener('change', (event) => {
        diaSeleccionado = event.target.value;
        // console.log("Dia seleccionado: " + diaSeleccionado);
        // diaSeleccionado=diaSelected;
    });

    //Evento change del select mes
    
    mesSelect.addEventListener('change', (event) => {
        mesSeleccionado = event.target.value;
        if(mesSeleccionado==-1){            //Intento de quitar el molesto -1
            mesSeleccionado=0;
        }
        // console.log("Mes seleccionado: " + mesSeleccionado);
        // eliminarOptionsDias()
        contenidoSelectDias(mesSeleccionado);       //Aca envia el valor del mes

    });

    //Evento change del select año
    
    yearSelect.addEventListener('change', (event) => {
        yearSeleccionado = event.target.value;
        if(esBisiesto(yearSeleccionado)){              //Para verificar si es año bisiesto. 
            // console.log(`${yearSeleccionado} es año bisiesto`);
            yearBisiesto = true;
            // console.log(yearBisiesto);

        }else{
            yearBisiesto = false;
            // console.log(yearBisiesto);
        }
        // console.log(`Año seleccionado: ${yearSeleccionado}`);
        //Funcion que elimina los options
        // eliminarOptionsDias()
        contenidoSelectMeses(mesSeleccionado);      //Cada vez que se cambia el año, se vuelve a ejecutar
    });
}

valorSelect()        //Probablemente esto no deba ir en una funcion. Todavia no estoy seguro


//Boton de Calcular dias
function boton(){
    // let diaNac=diaNacimiento.value;
    // let mesNac=mesNacimiento.value;
    // let yearNac=yearNacimiento.value;

    let diaNac=diaSeleccionado;
    let mesNac=mesSeleccionado;
    let yearNac=yearSeleccionado;
    let fechaNacimiento = `${yearNac}/${mesNac}/${diaNac}`;

    // console.log(fechaNacimiento);
    // console.log(hoy);
    
    calcularDias(fechaNacimiento,hoy);

}


// Función para calcular los días transcurridos entre dos fechas
calcularDias = function(fecha1,fecha2){
 let arrayFecha1 = fecha1.split('/');                   //Crea un array con la fecha1
 let arrayFecha2 = fecha2.split('/');                   //Crea un array con la fecha2
 let milisegundosFecha1 = Date.UTC(arrayFecha1[0],arrayFecha1[1],arrayFecha1[2]);                   //Obtiene la cantidad de milisegundos de la fecha1 con respecto a la fecha universal
 let milisegundosFecha2 = Date.UTC(arrayFecha2[0],arrayFecha2[1],arrayFecha2[2]);                   //Obtiene la cantidad de milisegundos de la fecha2 con respecto a la fecha universal

 let resta = milisegundosFecha2 - milisegundosFecha1;                   //calcula la cantidad de milisegundos entre fecha1 y fecha2
 let dias = Math.floor(resta / (1000 * 60 * 60 * 24));                  //convierto a los milisegundos en dias y lo redondeo
 
 visualizarResultado(dias);
//  return console.log(dias);

}


//Funcion para mostrar el resultado
const visualizarResultado = (dias)=>{
    console.log("Dias con vida: " + dias);
    const h1Resultado = document.createElement("H1");

    mostrarResultado.innerHTML="";
    
    mostrarResultado.appendChild(h1Resultado);
    // h1Resultado.classList.add(`text-center`);
    // h1Resultado.classList.add(`mt-2`);
    h1Resultado.textContent=`Tienes ${dias} Dias`;
    h1Resultado.classList.add(`resultadoDias`);

}


function crearAnimaciones(){
    const contenedorTopResultado = document.getElementById("contenedor-top-resultado"); //Seleccionamos el elemento html por su id
    const contenedorBottomResultado = document.getElementById("contenedor-bottom-resultado")    //Seleccionamos el segundo elemento html por su id
    const bottomResultado = document.createElement("div");      //Creamos el div donde estará la animacion
    const topResultado = document.createElement("div");         //Creamos el div donde estará la segunda animacion
    
    contenedorTopResultado.innerHTML="";    //Primero vaciamos el contenedor

    contenedorTopResultado.appendChild(topResultado);       //Despues introducimos el elemento recien creado en el contenedor

    topResultado.classList.add("topResultado");             //Creamos la clase topResultado
    topResultado.classList.add("mx-auto");                  //Creamos la clase mx-auto para que este centrado
    topResultado.setAttribute("id", "top-resultado")        //Creamos el id top-resultado

    //

    contenedorBottomResultado.innerHTML="";    //Primero vaciamos el contenedor

    contenedorBottomResultado.appendChild(bottomResultado);

    bottomResultado.classList.add("bottomResultado");
    bottomResultado.classList.add("mx-auto");
    bottomResultado.setAttribute("id", "bottom-resultado")        //Creamos el id bottom-resultado

}