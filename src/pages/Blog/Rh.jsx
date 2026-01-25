import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css'; 

import { 
  collection, getDocs, orderBy, query, 
  addDoc, deleteDoc, where, onSnapshot, doc 
} from "firebase/firestore";
import { db, auth } from "../../../FirebaseConfig"; 

const PostCard = ({ post }) => {
  const linkDestino = post.slug ? `/${post.slug}` : `/blog/post/${post.id}`;
  return (
    <div className="post-card-alg">
      <Link to={linkDestino} className="read-more-link">
        <div className="post-image">
           <img 
            src={post.imagem || "/placeholder-blog.png"} 
            alt={post.titulo} 
            className="post-img-blog"
            onError={(e) => e.target.src = "https://placehold.co/600x400?text=RH+e+Gestão"}
          />
        </div>
        <div className="post-info">
          <h3 className="post-title">{post.titulo}</h3>
          <div className="post-meta">
            <p>{post.data} • {post.autor || "RH Team"}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

function Rh() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // --- FILTRO PARA RH ---
        const q = query(
          collection(db, "blog"), 
          where("categoria", "==", "Rh"), // Verifique se salva como "Rh" ou "RH" no Admin
          orderBy("dataCriacao", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const listaPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          data: doc.data().dataCriacao ? new Date(doc.data().dataCriacao).toLocaleDateString('pt-BR') : "Recente"
        }));
        setPosts(listaPosts);
      } catch (error) {
        console.error("Erro ao buscar posts de RH:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-page">
      <div className='hero-section-rh' style={{
          backgroundColor: '#27ae60', 
          padding: '60px 20px', 
          textAlign: 'center', 
          color: 'white',
          marginBottom: '30px'
      }}>
          <h1>Gestão de Pessoas & RH</h1>
      </div>

      <div className="post-container-blog">
        {loading && <p>Carregando...</p>}
        {!loading && posts.length === 0 && <p>Nenhum post de RH encontrado.</p>}
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default Rh;