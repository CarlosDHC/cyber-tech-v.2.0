import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Se não tiver o CSS específico, pode usar o './Blog.css' ou criar um vazio
import './Blog.css'; 

import { 
  collection, getDocs, orderBy, query, 
  addDoc, deleteDoc, where, onSnapshot, doc 
} from "firebase/firestore";
import { db, auth } from "../../../FirebaseConfig"; 

const PostCard = ({ post }) => {
  // Lógica simplificada de Like para brevidade
  const [likesCount, setLikesCount] = useState(0);
  // ... (pode manter a mesma lógica de likes dos outros arquivos)
  
  const linkDestino = post.slug ? `/${post.slug}` : `/blog/post/${post.id}`;

  return (
    <div className="post-card-alg">
      <Link to={linkDestino} className="read-more-link">
        <div className="post-image">
           <img 
            src={post.imagem || "/placeholder-blog.png"} 
            alt={post.titulo} 
            className="post-img-blog"
            onError={(e) => e.target.src = "https://placehold.co/600x400?text=Marketing"}
          />
        </div>
        <div className="post-info">
          <h3 className="post-title">{post.titulo}</h3>
          <div className="post-meta">
            <p>{post.data} • {post.autor || "Equipe"}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

function Marketing() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // --- AQUI ESTÁ A LÓGICA DO FILTRO ---
        // Certifique-se de que no Admin você salva o campo como "categoria": "Marketing"
        const q = query(
          collection(db, "blog"), 
          where("categoria", "==", "Marketing"), 
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
        console.error("Erro ao buscar posts de Marketing:", error);
        // Dica: Se der erro de índice no console, clique no link que o Firebase fornece para criar o índice.
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-page">
      <div className='hero-section-marketing' style={{
          backgroundColor: '#8e44ad', 
          padding: '60px 20px', 
          textAlign: 'center', 
          color: 'white',
          marginBottom: '30px'
      }}>
          <h1>Marketing Digital & Estratégia</h1>
      </div>

      <div className="post-container-blog">
        {loading && <p>Carregando...</p>}
        {!loading && posts.length === 0 && <p>Nenhum post de Marketing encontrado.</p>}
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default Marketing;