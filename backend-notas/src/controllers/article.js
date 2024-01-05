'use strict'

//importamos el archivo aricle, creado en la carpera de models
var Article = require('../models/article')

//cramos un objeto para disponer de todos los metodos de ruta que vamos a definir

var controller = {
    //metodo para guardar articulo: el metodo va a recibir un request y una ruta
    save: (req, res) => {
        //en una variable obtenemos el contenido del body
        var params = req.body;
        // esos datos lo guardamos en una variable, generando un nuevoa rticulo
        var article = new Article()
        // asignamos los valores
        //en esta caso al crear arriba un nuevo Article() le podemos pasar
        //los parametros
        article.title = params.title;
        article.content = params.content;
        article.author = params.author;

        //guardmaos el articulo
        // guardamos el artículo
        article.save()
            .then(articleStored => {
                // Si el artículo se guarda correctamente
                return res.status(200).send({
                    status: 'success',
                    articleStored
                });
            })
            .catch(err => {
                // Si hay un error al guardar el artículo
                return res.status(404).send({
                    status: 'error',
                    message: 'El artículo no se ha guardado',
                    error: err  // Puedes incluir más detalles del error si lo deseas
                });
            });

    },

    //metodo mara listar los articulos, para poder mostrar los articulos

    getArticles: async (req, res) => {
        try {
            // Utilizamos el método find() directamente y luego sort() y exec() en cadena
            const articles = await Article.find({}).sort('-date').exec();

            if (!articles || articles.length === 0) {
                // En el caso de que no existan datos, devolvemos un status de error 404
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay artículos para mostrar'
                });
            }

            // En el caso de que todo vaya bien, devolvemos un status 200 y el objeto con los artículos
            return res.status(200).send({
                status: 'success',
                articles
            });
        } catch (error) {
            // En caso de error, devolvemos un status con problema 500
            return res.status(500).send({
                status: 'error',
                message: 'Error al extraer los datos'
            });
        }
    },


    // método para eliminar un artículo
    delete: async (req, res) => {
        try {
            // recoger el id a través de la url
            const articleId = req.params.id;

            // utilizamos la función findOneAndDelete para eliminar el artículo
            const articleRemove = await Article.findOneAndDelete({ _id: articleId });

            if (!articleRemove) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha encontrado el artículo a eliminar'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemove
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: 'Error al eliminar',
                error: error.message
            });
        }
    }



}

//exportamos el controlador

module.exports = controller;