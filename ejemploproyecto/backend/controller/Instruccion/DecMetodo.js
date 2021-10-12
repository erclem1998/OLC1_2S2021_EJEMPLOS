const Metodo = require("../Ambito/Metodo")

function DecMetodo(_instruccion, _ambito){
    //Creamos un objeto de tipo metodo que contendrá la información del metodo creado
    const nuevoMetodo = new Metodo(_instruccion.nombre, _instruccion.lista_parametros, _instruccion.instrucciones, _instruccion.linea, _instruccion.columna)
    //verficar si el nombre del metodo en una variable
    if(_ambito.existeSimbolo(nuevoMetodo.id)!=false){
        return `Error: no se puede declarar un metodo con el mismo nombre de la variable '${nuevoMetodo.id}'`
    }
    //verificamos si el metodo ya existe
    else if(_ambito.existeMetodo(nuevoMetodo.id)!=false){
        return `Error: no se puede declarar el metodo porque ya existe el metodo '${nuevoMetodo.id}''`
    }
    //agregar el metodo
    _ambito.addMetodo(nuevoMetodo.id, nuevoMetodo)
    //console.log(_ambito.tablaMetodos)
    return null

}

module.exports = DecMetodo