import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "./auth";
import { blogdata } from "./blogdata";

function BlogPost() {
  //permite navegar entre url
  const navigate = useNavigate();

  //trae el parametro desde la url
  const { slug } = useParams();

  const auth = useAuth();

  const blogpost = blogdata.find(post => post.slug === slug);

  //si existe un administrador y si no existe verificar si es igual al author
  const canDelete = auth.user?.isAdmin || blogpost.author === auth.user?.username;

  const returnToBlog = () => {
    //regresamos a la vista de blog
    // navigate('/blog');
    //truco regresa a la vista anterior
    navigate(-1);
  }

  return (
    <>
      <h2>{blogpost.title}</h2>
      <button onClick={returnToBlog}>volver al blog</button>
      <p>author: {blogpost.author}</p>
      <p>blog: {blogpost.content}</p>

      {canDelete && (
        <button>Eliminar blogpost</button>
      )}
    </>
  );
}

export { BlogPost }