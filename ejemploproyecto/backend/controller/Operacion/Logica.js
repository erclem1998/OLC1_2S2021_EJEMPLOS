const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Aritmetica = require("./Aritmetica");
const Relacional = require("./Relacional");
const ValorExpresion = require("./ValorExpresion");

function Logica(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BANDERA || 
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA){
        return Aritmetica(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL){
        return Relacional(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.AND){
        return and(_expresion.opIzq, _expresion.opDer, _ambito)
    }
}

function and(_opIzq, _opDer, _ambito){
    const opIzq = Logica(_opIzq, _ambito)
    const opDer = Logica(_opDer, _ambito)
    if(opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.BANDERA){
        var resultado = false;
        if(opIzq.valor && opDer.valor){
            resultado = true;
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opDer.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor:"")+(opDer.tipo===null ? opDer.valor:"")
    return {
        valor: respuesta+`\nError: no se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Logica