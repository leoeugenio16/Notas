'use strict'

const { response } = require('express');
//importamos mongoose
const mongoose = require('mongoose');

// dedclaramos una variable para asignar el schema de moongose
var Schema = mongoose.Schema;

//creamos un nuevo schema, donde vamos a definir los datos que guardamos
var ArticleSchema = new Schema({
    title:String,
    date: {type: Date,default:Date.now},
    content:String,
    author:String
})

//exporta el modelo de mongoose, que se utilizara para realizar operaciones CRUD(Crear,Leer,Actualizar,Eliminar)
module.exports = mongoose.model('Article', ArticleSchema);


