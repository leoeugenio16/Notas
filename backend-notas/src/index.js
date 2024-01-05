'use strict'
const express = require('express'); //importamos express
const bodyParser = require('body-parser') //intermediario para manejar los datos entre utl y el servidor

//importamos mongoose para poder usarlo
const mongoose = require('mongoose')

const app = express(); //creamos una constante para poder usarlo

const port = 3900; //creamos una constante ocn el numero de puerto
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
  });

//creamos una variable para conectarnos a la base de datos y le asiganmos un nombre
//a la coleccion ejemplo: api-restreactnotas
var url = 'mongodb://localhost:27017/api-rest_reactnotas'

//creamos una configuracion que tiene mongoose, para evitar ciertos datos
//sirve para evitar algunos fallos en la conexion de mongoDB
mongoose.Promise = global.Promise;

//hacemos la coneccion a las rutas con los articulos

var article_routes = require('./routes/article');

//en esta linea se configura body-parser para analizar datos codificado en url,
//para poder procesar los datos de formularios enviados desde el navegador
app.use(bodyParser.urlencoded({ extended: false }))

//lo siguiente que hacemos es utilizar nuevamente .use para hacer uso del middleware e indicarle al servidor
//que pueda trabajar con datos JSON
//es decir cualquier peticion la convertimos a json
app.use(bodyParser.json())

//Activamso el CORS para permitit las peticiones AJAX Y HTTP del frontend:
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//cargamos los archivos de ruta: siempre despues de los middleware 

//establecemos una ruta atravez de app.use() ejemplo /api y a travez de ella
//vamos a poder llamar las otras rutas que creamos en la carpeta rutes
//es decir con esto nos conectamos a la base de datos
app.use('/api', article_routes)



//realizamos la conexion a la base de datos de mongoDB utilizando mongoose
//y una vez que la conexion se establecio con ezito,se inicia el servidor express
//para escuchar las solicitudes http;
//mongoose.connect: Este método se utiliza para conectarse a una base de datos MongoDB utilizando Mongoose.
mongoose.connect(url).then(() => {
    console.log('Conexion a la base de datos realizada con exito');
    /*con le metodo .listen iniciamos el servidor en el puerto indicad */
    app.listen(port, () => {
        console.log("Lanzando la aplicacion en el puerto " + port)
    })
})
