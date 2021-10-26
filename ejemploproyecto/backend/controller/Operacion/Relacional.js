const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Aritmetica = require("./Aritmetica");
const ValorExpresion = require("./ValorExpresion");

function Relacional(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BANDERA || 
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA){
        return Aritmetica(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL){
        return igualigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MENOR){
        return menor(_expresion.opIzq, _expresion.opDer, _ambito)
    }
}

function igualigual(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if(opIzq.tipo == opDer.tipo){
        var resultado = false;
        if(opIzq.valor == opDer.valor){
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

function menor(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if(opIzq.tipo == opDer.tipo){
        var resultado = false;
        if(opIzq.valor < opDer.valor){
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

module.exports = Relacional