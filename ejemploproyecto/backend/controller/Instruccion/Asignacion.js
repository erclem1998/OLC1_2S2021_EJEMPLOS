const Operacion = require("../Operacion/Operacion")

function Asignacion(_instruccion, _ambito){
    const id = _instruccion.id
    const existe = _ambito.existeSimboloActualizar(id)
    if(existe){
        var valor = Operacion(_instruccion.expresion, _ambito)
        var simbolo = _ambito.getSimbolo(id)
        var tipos = {
            tipoSimbolo: simbolo.tipo,
            tipoNuevoValor: valor.tipo
        }
        if(tipos.tipoSimbolo===tipos.tipoNuevoValor){
            simbolo.valor = valor.valor
            _ambito.actualizar(id,simbolo)
            return null
        }
        return `Error: No es posible asignar un valor de tipo ${tipos.tipoNuevoValor} a la variable '${id}' que es de tipo ${tipos.tipoSimbolo}`
    }
    return `Error: La variable '${id}' no existe`
}

module.exports = Asignacion