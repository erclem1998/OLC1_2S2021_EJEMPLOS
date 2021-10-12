const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const Asignacion = require("./Asignacion")
const Declaracion = require("./Declaracion")
const DecMetodo = require("./DecMetodo")
const StartWith = require("./StartWith")

function Global(_instrucciones, _ambito){
    var cadena = ""
    //1ERA PASADA: VERIFICA QUE SEMANTICAMENTE VENGA 1 SOLA VEZ LA INSTRUCCION START WITH
    var contadorSW=0;
    for(let i = 0; i<_instrucciones.length; i++){
        if(_instrucciones[i].tipo===TIPO_INSTRUCCION.STARTWITH){
            contadorSW++;
        }
    }
    if(contadorSW==0){
        return `Error: no se detectó la instruccion 'START WITH'`
    }
    else if(contadorSW>1){
        return `Error: se detectó la instruccion 'START WITH' mas de una vez`
    }
    //2DA PASADA: SE DECLARAN VARIABLES Y METODOS, ADEMAS SE REALIZAN ASIGANCIONES (TODO EN EL AMBITO GLOBAL)
    for(let i = 0; i<_instrucciones.length; i++){
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(_instrucciones[i], _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACION){
            var mensaje = Asignacion(_instrucciones[i], _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DEC_METODO){
            var mensaje = DecMetodo(_instrucciones[i], _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
    }

    //3ERA PASADA: UTILIZADO PARA EJECUTAR LA INSTRUCCION START WITH
    for(let i=0; i<_instrucciones.length;i++){
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.STARTWITH){
            var mensaje = StartWith(_instrucciones[i], _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
            break
        }
    }
    return cadena
}

module.exports = Global