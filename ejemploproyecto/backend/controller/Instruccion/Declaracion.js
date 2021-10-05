const Simbolo = require("../Ambito/Simbolo")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")

function Declaracion(_instruccion, _ambito){
    if(_instruccion.tipo_dato ===TIPO_DATO.DECIMAL){
        var valor = 0.0
        //Declaracion con asignación
        if(_instruccion.valor != null){
            var op = Operacion(_instruccion.valor, _ambito)
            var tipo = op.tipo
            if(tipo === TIPO_DATO.DECIMAL){
                valor = op.valor
            }
            else{
               return `Error: No es posible asignar un valor de tipo ${tipo} a la variable ${_instruccion.id} que es de tipo DECIMAL... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id.toLowerCase(), valor, TIPO_DATO.DECIMAL, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolo(nuevoSimbolo.id) != false){
            return `Error: La variable ${nuevoSimbolo.id} ya existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo);
        //console.log(_ambito)
        return null
    }
    else if(_instruccion.tipo_dato ===TIPO_DATO.CADENA){
        var valor = ""
        //Declaracion con asignación
        if(_instruccion.valor != null){
            var op = Operacion(_instruccion.valor, _ambito)
            valor = String(op.valor)
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id.toLowerCase(), valor, TIPO_DATO.CADENA, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolo(nuevoSimbolo.id) != false){
            return `Error: La variable ${nuevoSimbolo.id} ya existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo);
        //console.log(_ambito)
        return null
    }
    else if(_instruccion.tipo_dato ===TIPO_DATO.BANDERA){
        var valor = false
        //Declaracion con asignación
        if(_instruccion.valor != null){
            var op = Operacion(_instruccion.valor, _ambito)
            var tipo = op.tipo
            if(tipo === TIPO_DATO.BANDERA){
                valor = Boolean(op.valor)
            }
            else{
               return `Error: No es posible asignar un valor de tipo ${tipo} a la variable ${_instruccion.id} que es de tipo BADERA... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id.toLowerCase(), valor, TIPO_DATO.BANDERA, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolo(nuevoSimbolo.id) != false){
            return `Error: La variable ${nuevoSimbolo.id} ya existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo);
        //console.log(_ambito)
        return null
    }
}

module.exports = Declaracion