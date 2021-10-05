const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const Cout = require("./Cout")
const Declaracion = require("./Declaracion")

function Bloque(_instrucciones, _ambito){
    var cadena = ""
    _instrucciones.forEach(instruccion=>{
        if(instruccion.tipo === TIPO_INSTRUCCION.COUT){
            //realizar cierta acción
            cadena += Cout(instruccion,_ambito)+'\n'
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
    })
    return cadena
}

module.exports = Bloque