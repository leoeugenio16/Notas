'use strict'

//importamos express 
var express = require('express');
var Article = require('../controllers/article')


//llamamos al objeto rutes de express
var router = express.Router();

//Rutas para los articulos
//ruta para poder guardar lños artioculos, usando el metodo ruter de expres
//con el metodo post, pasandole la ruta a la que se va a dirigir, y el controlador
//save que creamos en la parte de controladores
router.post('/save',Article.save)


//ruta para poder obtener los articulos ,usando el metodo router de expres, al cual
//le pasamos la ruta ,y luego le pasamos el metodo detArticle que creamos en el controlador

router.get('/articles',Article.getArticles);

// ruta para poder eliminar los articulos, usanod el metodo ruter de expres,al cual 
//le pasamos la ruta y como parametro el id, y luego el metodo delete que creamos en controladores

router.delete('/delete/:id',Article.delete);


module.exports = router;
