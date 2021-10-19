const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")
const DecParametro = require("./DecParametro")
const Instruccion = require("./Instruccion")

function StartWith(_instruccion, _ambito){
    var cadena = ""
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)
    if(metodoEjecutar!=null){
        var nuevoAmbito = new Ambito(_ambito)
        if(metodoEjecutar.lista_parametros!=null){
            //verificar que la cantidad de valores coincida con la de parametros del metodo
            if(_instruccion.lista_valores != null && metodoEjecutar.lista_parametros.length == _instruccion.lista_valores.length){
                var error = false;
                for(let i=0; i<metodoEjecutar.lista_parametros.length;i++){
                    var declaraAsignacion = Instruccion.nuevaDeclaracion(metodoEjecutar.lista_parametros[i].id, _instruccion.lista_valores[i],metodoEjecutar.lista_parametros[i].tipo_dato, _instruccion.linea, _instruccion.columna)
                    var mensaje = DecParametro(declaraAsignacion, nuevoAmbito)
                    if(mensaje!=null){
                        error = true;
                        cadena += mensaje+"\n"
                    }
                }
                if(error){
                    return cadena
                }
                var ejec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
                var mensaje = ejec
                return mensaje
            }
            else{
                return `Error: la cantidad de valores no corresponden a la cantidad de parametros`
            }
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