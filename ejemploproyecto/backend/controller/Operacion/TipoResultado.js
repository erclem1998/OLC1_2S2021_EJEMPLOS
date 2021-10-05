const TIPO_DATO = require("../Enums/TipoDato");

function TipoResultado(_tipo1, _tipo2){
    if(_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.DECIMAL){
        return TIPO_DATO.DECIMAL
    }
    return null
}

module.exports = TipoResultado