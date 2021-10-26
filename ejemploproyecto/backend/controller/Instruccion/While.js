const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")

/*
    - SE AGREGÓ ESTA PORCIÓN DE CODIGO EN EL ARCHIVO DE AMBITO, YA QUE NECESITAMOS BUSCAR LA VARIABLE
    EN CUALQUIER AMBITO PARA ACTUALIZARLA, Y NO SOLO EN EL AAMBITO ACTUAL

    - TAMBIÉN EN EL ARCHIVO ASIGNACIÓN EN VEZ DE UTILIZAR .existeSimbolo SE HACE USO DE ESTA NUEVA
    FUNCIÓN
    ###################
    ###################
    existeSimboloActualizar(_s) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase())
        if (encontrado != null) {
            return true
        }
        }
        return false
    }
 */

function CicloWhile(_instruccion, _ambito){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        while(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            var ejec =Bloque(_instruccion.instrucciones, nuevoAmbito)
            //mensaje+=Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje+=ejec
            //actualizamos
            operacion = Operacion(_instruccion.expresion, _ambito)
            //console.log(_ambito)
        }
        return mensaje
    }
    return `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = CicloWhile