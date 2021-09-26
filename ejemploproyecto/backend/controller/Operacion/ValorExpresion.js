const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_VALOR = require("../Enums/TipoValor");

function ValorExpresion(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL){
        return {
            valor: Number(_expresion.valor),
            tipo: TIPO_DATO.DECIMAL,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.BANDERA){
        return {
            valor: _expresion.valor.toLowerCase()==='true' ? true: false,
            tipo: TIPO_DATO.BANDERA,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.CADENA){
        return {
            valor: _expresion.valor.substring(0,_expresion.valor.length),
            tipo: TIPO_DATO.CADENA,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
}

module.exports = ValorExpresion