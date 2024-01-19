import Global from "../Global";
import { React, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Article from "./article";



//cremoas el componenete articulos

const Articles = () => {
    //vamos a buscar los articulos creados con use State inicialmente vacio por que
    //se vana  cargar varios articxulos
    const [articles, setArticles] = useState({})
    //vamos a crear un estado para la eliminacion
    const [deleting, setDeleting] = useState(false)
    const url = Global.url;

    //declaramos el useEfecct que es el hook para que cuanod se renderice la ventana haga
    //cierta accion, en este caso traer los articulos de nuestra base de datos
    //Y LE INDICAMOS CON [articcles.lenght] al final que no pare hasta que no traiga todos los articulos
    // Envuelve la definición de getArticulos en useCallback
    const getArticulos = useCallback(async () => {
        try {
            const res = await axios.get(url + '/articles');
            if (res.data.articles) {
                setArticles(res.data.articles);

            }
        } catch (error) {
            console.error('Error al obtener los artículos:', error);
        }
    }, [url]);


    useEffect(() => {
        // Llama a la función para obtener los artículos
        getArticulos();
    }, [getArticulos.length]);
    //definimos una funcion encargada de obtener los articulos

    const deleteArticle = (id) => {
        //en la siguiente linea lo que hacmos es mediante el id que viene por parametros
        //obtener la posicion en la que se encuentra el articlo que queremos borrar, y ahi
        //obtenemos el  id del mismo
        const idArticle = articles[id]._id
        setDeleting(true);
        axios.delete(url + "/delete/" + idArticle)
            .then(res => {
                console.log('Respuesta del servidor:', res);
                console.log('Artículo eliminado con éxito', res.data);
                // Vuelve a obtener los artículos después de la eliminación
                setDeleting(false)
                getArticulos();
                if (articles.length === 1) {
                    window.location.reload();
                }

            })
            .catch(error => {
                setDeleting(false)
                console.error('Error al eliminar el artículo:', error);
            });
    }
    return (
        <div className="publicaciones">
            <h1 className="mt-5">Articulos</h1>
            <div className="container mt-3">
                {/* row-cols-1 es para indicar que si la pantalla es pequeña
                solo se muestre un solo articulo
                    row-cols-md-2 para que en el caso de que sea pantalla mediana
                    se muestren 2
                    row-cols-lg-2 para que ene l caso de ser pantalla grande tambien 
                    se muestren tres articulos
                */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2">
                    {/* cremoas un condicional para que en el caso de tener articulos mapeamos los mismos
                y los mostramos por pantalla, en el caso contrario mostramos un cartel
                por pantalla con un mensaje */}
                    {
                        articles.length > 0 && !deleting ? (

                            articles.map((article, i) => {
                                return (
                                    /* 
                                    a continuacion le pasamos los props es decir parametros que va a usar 
                                    la funcion Article */
                                    <Article
                                        key={i}
                                        id={i}
                                        articleData={article}
                                        delArticle={deleteArticle}
                                    />

                                )
                            })
                        ) : (
                            <h3 className="mx-auto">No hay articulos que mostrar</h3>
                        )
                    }

                </div>

            </div>
        </div>
    )

}

export default Articles;