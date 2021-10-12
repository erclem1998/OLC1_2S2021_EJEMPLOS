const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")

function StartWith(_instruccion, _ambito){
    var cadena = ""
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)
    if(metodoEjecutar!=null){
        var nuevoAmbito = new Ambito(_ambito)
        if(metodoEjecutar.lista_parametros!=null){

        }
        else {
            var ejec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
            var mensaje = ejec
            return mensaje
        }
    }
    else{
        return `Error: el metodo '${_instruccion.nombre}' no existe`
    }
}

module.exports = StartWith