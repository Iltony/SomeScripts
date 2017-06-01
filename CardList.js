//Un aeropuuerto desea controlar los despegues de las avionetas. 
//Para ello se crea un sistema en el que por cada avioneta que va a despegar se registra cierta informacion. 
//Al final del dia se quiere contar con un listado de todas las avionetas que despegaron de la pista y se quiere discriminar las avionetas de fumigacion.



//////////// PROGRAMA //////////////////
// Defino el objeto avioneta con la informacion que registro de la misma (sin datos ya que despues se van a llenar cada vez que la avioneta vaya a despiegar)

// se define la variable inicializar dia que sera la que almacenara el dia
var elDiaDeHoy = {
    fecha: new Date(),

    /* aca se almacanara cada avioneta que va despegando */
    despeguesDeAvionetas: [],
    cantidadDeFumigacion: 0,
    cantidadTotal: 0
};

function getAvioneta() {
    return {
        placa: "",
        cantidadPilotos: 0,
        esDeFumigacion: false,
    };
}

function getDespegueDeAvioneta() {
    return {
        hora: new Date(),
        Avioneta: {}
    };
}


// La siguiente funcion registra el despegue de la avioneta que recibe. 
function registrarAvionetaADespegar(avioneta) {

    // se valida si la avioneta es valida y se ingresa.
    if (esValidaLaAvioneta(avioneta)) {
        var despegue = getDespegueDeAvioneta();

        despegue.hora = new Date();
        despegue.Avioneta = avioneta;

        // se agrega el elemento en la ultima posicion
        elDiaDeHoy.despeguesDeAvionetas[elDiaDeHoy.despeguesDeAvionetas.length] = despegue;

        // Se actualizan los totales del dia de hoy. 
        actualizarCantidad();

    }
    else {

        console.log('La avioneta no es válida. NO SE PUEDE REGISTRAR!');
    }
}

function esValidaLaAvioneta(avioneta) {

    var esValida = true;

    // Se arranca con una avioneta valida y si alguna regla no se cumple se vuelve invalida.

    // se valida la placa de la avioneta, que este definida.
    if (avioneta.placa == undefined || avioneta.placa == null || avioneta.placa == '') {
        esValida = false;
    }

    // se valida la cantidad de pilotos entre 1 y 2.
    if (avioneta.cantidadPilotos < 0 || avioneta.cantidadPilotos > 2) {
        esValida = false;
    }

    return esValida;
}

// Esta funcion actualiza las cantidades del dia, se puede hacer de mejores maneras. 
function actualizarCantidad() {

    var total = 0;
    var cantidadFumigacion = 0;
    var contador = 0;

    // Se recorren todos los despegues
    while (contador < elDiaDeHoy.despeguesDeAvionetas.length) {

        // Se toma la avioneta y se evalua si es de fumigacion
        if (elDiaDeHoy.despeguesDeAvionetas[contador].Avioneta.esDeFumigacion) {

            // si la avioneta es de fumigacion se incrementa el contador de fumigacion en  uno;
            cantidadFumigacion++;
        }

        // se incrementa el total en uno.
        total++;

        // se avanza en uno el contador
        contador++;
    }

    // Se actualizan los totales del dia. 
    elDiaDeHoy.cantidadTotal = total;
    elDiaDeHoy.cantidadDeFumigacion = cantidadFumigacion;
}

// La siguiente funcion recorre los despegues y los imprime a pantalla. 
function listarAvionetasDespegadasDuranteElDia() {
    var contador = 0;

    console.log('-------------INICIO LISTADO-----');
    console.log('Fecha: ' + describirFecha(elDiaDeHoy.fecha));
    console.log('Total de Avionetas: ' + elDiaDeHoy.cantidadTotal);
    console.log('Total de Fumigación: ' + elDiaDeHoy.cantidadDeFumigacion);

    console.log('');
    console.log('-----Detalle de despegues-----');

    // Se recorren todos los despegues
    while (contador < elDiaDeHoy.despeguesDeAvionetas.length) {

        console.log('Despegue: ' + contador);

        console.log('Hora: ' + describirHora(elDiaDeHoy.despeguesDeAvionetas[contador].hora));
        console.log('Placa: ' + elDiaDeHoy.despeguesDeAvionetas[contador].Avioneta.placa);
        console.log('Numero De Pilotos: ' + elDiaDeHoy.despeguesDeAvionetas[contador].Avioneta.cantidadPilotos);

        // Se toma la avioneta y se evalua si es de fumigacion para el resultado
        if (elDiaDeHoy.despeguesDeAvionetas[contador].Avioneta.esDeFumigacion) {
            console.log('Avioneta de Fumigacion: Si');
        }
        else {
            console.log('Avioneta de Fumigacion: No');
        }

        console.log('');

        // se avanza en uno el contador
        contador++;
    }

    console.log('-------------FIN LISTADO-----');
}

function describirHora(fecha) {
    return fecha.getHours() + ':' + fecha.getMinutes();
}

function describirFecha(fecha) {
    return (fecha.getDate() + '/' + fecha.getMonth() + 1) + '/' + fecha.getFullYear();
}

///////////PRUEBAS///////////////////

EjecutarPrueba();


function EjecutarPrueba() {

    var avioneta1 = getAvioneta();
    var avioneta2 = getAvioneta();
    var avioneta3 = getAvioneta();

    avioneta1.placa = "APU-5666"
    avioneta1.cantidadPilotos = 2;
    avioneta1.esDeFumigacion = false;

    avioneta2.placa = "CPU-6541"
    avioneta2.cantidadPilotos = 2;
    avioneta2.esDeFumigacion = true;

    avioneta3.placa = "KPU-2012"
    avioneta3.cantidadPilotos = 2;
    avioneta3.esDeFumigacion = false;

    registrarAvionetaADespegar(avioneta1);
    registrarAvionetaADespegar(avioneta2);
    registrarAvionetaADespegar(avioneta3);

    listarAvionetasDespegadasDuranteElDia();
}
