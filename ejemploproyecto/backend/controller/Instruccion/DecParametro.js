const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operacion/Operacion");

function DecParametro(_instruccion, _ambito){
    if(_instruccion.tipo_dato === TIPO_DATO.DECIMAL){
        var valor = 0.0
        if(_instruccion.valor!=null){
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if(tipo ===TIPO_DATO.DECIMAL){
                valor = op.valor
            }
            else{
                return `Error: No es posible asignar un valor de tipo ${tipo} al parametro ${_instruccion.id} que es de tipo ${_instruccion.tipo_dato}`
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.DECIMAL,_instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolo(nuevoSimbolo.id)!=false){
            return `Error: el parametro ${nuevoSimbolo.id} ya existe...`
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.CADENA){
        var valor = ""
        if(_instruccion.valor!=null){
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            valor = String(op.valor)
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CADENA,_instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolo(nuevoSimbolo.id)!=false){
            return `Error: el parametro ${nuevoSimbolo.id} ya existe...`
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.BANDERA){
        var valor = false
        if(_instruccion.valor!=null){
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if(tipo ===TIPO_DATO.BANDERA){
                valor = Boolean(op.valor)
            }
            else{
                return `Error: No es posible asignar un valor de tipo ${tipo} al parametro ${_instruccion.id} que es de tipo ${_instruccion.tipo_dato}`
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.BANDERA,_instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolo(nuevoSimbolo.id)!=false){
            return `Error: el parametro ${nuevoSimbolo.id} ya existe...`
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }
}

module.exports = DecParametro