//Declaración de variables
var nombreUsuario = "Juan Perez";
var codigoDeSeguridad = 1234;
var saldoCuenta = 6000;
var limiteExtraccion = 1500;
var cuentaAgua = 350;
var cuentaTelefono = 425;
var cuentaLuz = 210;
var cuentaInternet = 570;
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;
var contadorIniciarSesion = 0;



//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
    cambiarFondoSegunSaldo();
}

//Funciones generales
function sumarDinero (dinero) {
    saldoCuenta += dinero; 
}

function restarDinero (dinero) {
    saldoCuenta -= dinero;
}

function haySaldoDisponible(dinero) {
    return saldoCuenta >= dinero;    
}

function alertNoHaySaldoDisponible() {
    alert("No hay saldo disponible en tu cuenta para realizar esta operación");
}

function alertNoEsUnValorNumerico() {
    alert("Solo puedes ingresar valores númericos en este campo");
}

function corroborarSiNoEsUnNumero (valor) {
    return isNaN(valor) || valor == "" || valor == undefined;
}

function cambiarFondoSegunSaldo () {
    if (saldoCuenta == 0) {
        document.getElementById("green-container").style.backgroundColor = "#ee0c0c";
    } else {
        document.getElementById("green-container").style.backgroundColor = "#2cc197";
    }
} 

//Funciones que interactúan con el usuario
function extraerDinero() {
    var dineroExtraido = parseInt(prompt("¿Cuánto dinero deseas extraer?"));
    if (corroborarSiNoEsUnNumero(dineroExtraido) == true) {
        alertNoEsUnValorNumerico();
    } else if (dineroExtraido % 100 != 0) {
        alert("Solo puedes extraer billetes de $100");
    } else if (dineroExtraido > limiteExtraccion && dineroExtraido <= saldoCuenta) {
        alert("La cantidad de dinero que deseas extraer es mayor al límite de extracción");
    } else if (dineroExtraido <= saldoCuenta) {
        var saldoCuentaProvisorio = saldoCuenta;
        restarDinero(dineroExtraido);
        actualizarSaldoEnPantalla();
        cambiarFondoSegunSaldo();
        alert("Has extraido $" + dineroExtraido + 
        "\n" + "Tu saldo anterior era $" + saldoCuentaProvisorio+ 
        "\n" + "Tu saldo actual es $" +saldoCuenta);
    } else {
        alertNoHaySaldoDisponible();
    }
}

function depositarDinero() {
   var dineroDepositado = parseInt(prompt("¿Cuánto dinero deseas depositar?"));
    if (corroborarSiNoEsUnNumero(dineroDepositado) == true) {
       alertNoEsUnValorNumerico();
    } else {
        var saldoCuentaProvisorio = saldoCuenta;
        sumarDinero(dineroDepositado);
        actualizarSaldoEnPantalla();
        cambiarFondoSegunSaldo();
        alert("Has depositado $" + dineroDepositado + 
        "\nTu saldo anterior era $" + saldoCuentaProvisorio + 
        "\nTu saldo actual es $" + saldoCuenta)
    }
}

function pagarServicio() {
    var nombreServicio;
    var montoServicio;
    var servicio = prompt("Ingrese el número que corresponda al servicio que desea pagar " +
        "\n 1 - Agua \n 2 - Luz \n 3 - Internet \n 4 - Teléfono");
    if (corroborarSiNoEsUnNumero(servicio) == false) {
        var saldoCuentaProvisorio = saldoCuenta;
        switch (servicio) {
            case "1":
                nombreServicio = 'Agua';
                montoServicio = cuentaAgua;
                break;
            case "2":
                nombreServicio = 'Luz';
                montoServicio = cuentaLuz;
                break;
            case "3":
                nombreServicio = 'Internet';
                montoServicio = cuentaInternet;
                break;
            case "4":
                nombreServicio = 'Teléfono';
                montoServicio = cuentaTelefono;
                break;
            default:
                alert("No has seleccionado un servicio válido");
                return;
        }
        if (haySaldoDisponible(montoServicio)) {
            restarDinero(montoServicio);
            actualizarSaldoEnPantalla();
            cambiarFondoSegunSaldo();
            alert("Has pagado el servicio de " + nombreServicio + ". " +
                "\nSaldo anterior $" + saldoCuentaProvisorio +
                "\n" + "Dinero descontado $" + montoServicio +
                "\n" + "Tu saldo actual es $" + saldoCuenta);
        } else {
            alertNoHaySaldoDisponible();
        }
    } else {
        alertNoEsUnValorNumerico();
    }
}

function transferirDinero() {
    var montoTransferencia = prompt("Ingresar el monto que se desea transferir");
    if (corroborarSiNoEsUnNumero(montoTransferencia) == true) {
        alertNoEsUnValorNumerico();
    } else if (haySaldoDisponible(montoTransferencia) == true) {
        var cuentaTransferencia = prompt("Ingrese el número de cuenta a la que desea realizar la transferencia");
        if (corroborarSiNoEsUnNumero(cuentaTransferencia) == true) {
            alertNoEsUnValorNumerico();
        } else if (cuentaTransferencia == cuentaAmiga1 || cuentaTransferencia == cuentaAmiga2) {
            restarDinero(montoTransferencia);
            actualizarSaldoEnPantalla();
            cambiarFondoSegunSaldo();
            alert("Has transferido $" + montoTransferencia + " a la cuenta número " + cuentaTransferencia);
        } else {
            alert("Solo puede transferirse dinero a cuentas asociadas");
        }

    } else {
        alertNoHaySaldoDisponible();
    }
}

function cambiarLimiteDeExtraccion() {
    var nuevoLimiteDeExtraccion = prompt("Incerte nuevo límite de extracción");
    if (corroborarSiNoEsUnNumero(nuevoLimiteDeExtraccion) == true) {
        alertNoEsUnValorNumerico();
    } else {
        limiteExtraccion = nuevoLimiteDeExtraccion;
        actualizarLimiteEnPantalla();
        alert("Tu nuevo límite de extracción es $" + limiteExtraccion);
    }
}

function iniciarSesion() {
    var codigoIngresado = prompt("Ingresa tu código numérico");
    if (corroborarSiNoEsUnNumero(codigoIngresado) == false) {
        if (codigoIngresado == codigoDeSeguridad) {
            alert("Bienvenido/a " + nombreUsuario + " ya puedes comenzar a realizar operaciones");
            cargarNombreEnPantalla();
            actualizarSaldoEnPantalla();
        } else {
                saldoCuenta = 0;
                limiteExtraccion = 0;
                document.getElementById("nombre").style.display = "none";
                cambiarFondoSegunSaldo();
                alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad");
        }
    } else {
        alertNoEsUnValorNumerico();
        iniciarSesion();
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
