'use strict'
const express = require('express')
const bodParser = require('body-parser')
let cors = require('cors')

const app = express()
const parser = require('./sintactico')

app.use(bodParser.json({limit:'50mb', extended:true}))
app.use(bodParser.urlencoded({limit:'50mb', extended:true}))
app.use(cors())


app.get('/',(req,res)=>{
    var respuesta={
        message:"Todo bien, esto es Compi 1 B 2S2021"
    }
    res.send(respuesta)
})

app.post('/operar',(req,res)=>{
    var operacion = req.body.operacion;
    var analisis = parser.parse(operacion)
    console.log(analisis)
    var respuesta={
        message:"Resultado correcto",
        resultado:analisis
    }
    res.send(respuesta)
})

app.listen('3000', ()=>{
    console.log("Servidor en puerto 3000")
})