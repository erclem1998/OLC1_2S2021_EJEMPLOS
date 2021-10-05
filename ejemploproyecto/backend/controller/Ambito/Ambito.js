class Ambito{
    constructor(_anterior){
        this.anterior = _anterior
        this.tablaSimbolos = new Map()
    }

    addSimbolo(_s, _simbolo){
        this.tablaSimbolos.set(_s.toLowerCase(), _simbolo)
    }

    getSimbolo(_s){
        for(let e = this; e != null; e = e.anterior){
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase())
            if(encontrado != null) {
                return encontrado
            }
        }
        return null
    }

    actualizar(_s, _simbolo){
        for(let e = this; e != null; e = e.anterior){
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase())
            if(encontrado){
                e.tablaSimbolos.set(_s.toLowerCase(), _simbolo)
                return true
            }
        }
        return false
    }

    existeSimbolo(_s){
        for(let e = this; e != null; e = e.anterior){
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase())
            if(encontrado != null) {
                return true
            }
        }
        return false
    }

}

module.exports = Ambito