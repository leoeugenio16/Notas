import React, { useLayoutEffect } from "react";

//le vamos a pasar los porps dentro de los parentesis los props que v aa recibir
//y dentro de llaves
const Article = ({ id, articleData, delArticle }) => {
    //primero recogemos esos datos que nos trae article data
    const { title, date, content, author } = articleData
    //cambiamos el formato de la fecha
    const formatDate = (date) => {
        return date.substring(8, 10) + date.substring(4, 8) + date.substring(0, 4)
    }
    const del =()=>{
        console.log(id)
        delArticle(id)
    }
    return (
        <div className="col">
            <div className="card mx-auto mb-3">
                <div className="card-header">
                    <h3 className="card-title">
                        {title}
                    </h3>
                </div>
                <div className="card-body">
                    <label className="card-text text-start">{content}</label>
                </div>
                <ul className="list-group-flush">
                    <li className="list-pub list-group-item">publicado el: {formatDate(date)} </li>
                    <li className="list-pub list-group-item">Autor: {author} </li>
                </ul>
            </div>
            <div className="card-footer">
                <button className="btn btn-danger btn-sm" type="button" onClick={del}>Eliminar</button>
            </div>
        </div>
    )
}

export default Article;