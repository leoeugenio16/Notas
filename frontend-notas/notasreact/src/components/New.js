import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Global from "../Global";

const New = () => {
  const url = Global.url;

  const [article, setArticle] = useState({
    title: null,
    content: null,
    author: null,
    visible: true
  });

  const [redirect, setRedirect] = useState(false);

  let titleRef = React.createRef();
  let contentRef = React.createRef();
  let authorRef = React.createRef();

  const changeState = () => {
    setArticle({
      title: titleRef.current.value,
      content: contentRef.current.value,
      author: authorRef.current.value,
    });
    console.log(article);
  };

  const sendData = async (event) => {
    event.preventDefault();
    changeState();

    try {
      const res = await axios.post(url + "save", article);
      console.log(res.data);
      setRedirect(true);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="nueva-publicacion">
      <div
        id="formulario"
        className="card mx-auto mb-3 mt-5"
        style={{ width: "30em" }}
      >
        <div className="card-header text-dark">
          <h4>Publicar nuevo artículo</h4>
        </div>
        <div className="card-body">
          <form onSubmit={sendData}>
            <div className="mb-3">
              <label>Título</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                ref={titleRef}
                onChange={changeState}
                required
              />
            </div>
            <div className="mb-3">
              <label>Contenido</label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                rows="6"
                cols="30"
                ref={contentRef}
                onChange={changeState}
                required
              />
            </div>
            <div className="mb-3">
              <label>Autor</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                ref={authorRef}
                onChange={changeState}
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control btn btn-primary"
                type="submit"
                id="publish"
                value="Publicar"
                required
              />
            </div>
          </form>
        </div>
      </div>

      {redirect && <Navigate to="/articles" />}
    </div>
  );
};

export default New;
