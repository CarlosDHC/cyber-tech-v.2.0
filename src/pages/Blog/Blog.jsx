import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

// Imports do Firebase
import {
  collection, getDocs, orderBy, query,
  addDoc, deleteDoc, where, onSnapshot, doc
} from "firebase/firestore";
import { db, auth } from "../../../FirebaseConfig";

const postsOriginais = [

];

// CARD INDIVIDUAL DE LIKE
function PostCard({ post }) {
  const [likesCount, setLikesCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [likeDocId, setLikeDocId] = useState(null);

  // Monitora os likes deste post 
  useEffect(() => {
    const q = query(collection(db, "likes"), where("postId", "==", post.id));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLikesCount(snapshot.size);

      if (auth.currentUser) {
        const meuLike = snapshot.docs.find(d => d.data().userId === auth.currentUser.uid);
        if (meuLike) {
          setUserLiked(true);
          setLikeDocId(meuLike.id);
        } else {
          setUserLiked(false);
          setLikeDocId(null);
        }
      } else {
        setUserLiked(false);
      }
    });

    return () => unsubscribe();
  }, [post.id]);

  const handleLike = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Você precisa estar logado para curtir!");
      return;
    }

    try {
      if (userLiked && likeDocId) {
        await deleteDoc(doc(db, "likes", likeDocId));
      } else {
        await addDoc(collection(db, "likes"), {
          postId: post.id,
          postTitle: post.title,
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          data: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Erro ao curtir:", error);
      alert("Erro ao processar curtida.");
    }
  };

  const linkDestino = post.slug ? `/${post.slug}` : `/blog/post/${post.id}`;

  return (
    <div className="post-card-alg">
      <Link to={linkDestino} className="read-more-link">
        <div className="post-image">
          <img
            src={post.imagem || "/placeholder-blog.png"}
            alt={`Imagem sobre ${post.titulo}`}
            className="post-img-blog"
            onError={(e) => e.target.src = "https://placehold.co/600x400?text=Blog+CyberTech"}
          />
        </div>

        <div className="post-info">
          <h3 className="post-title">{post.titulo}</h3>
          <div className="post-meta">
            {/* CORREÇÃO VISUAL: Se não tiver autor, usa um padrão */}
            <p><img src='/user.png' className='user' alt="Autor" /> {post.autor || "Autor Desconhecido"}</p>
            <p><img src='/calendar.png' alt="Data" className='user' /> {post.data}</p>
            <p>
              <img src='/time-left.png' className='user' alt="Tempo" />
              {post.tempoLeitura}
            </p>
          </div>
        </div>
      </Link>

      <div className="post-feedback">
        <button
          className={`like-btn ${userLiked ? 'curtido' : ''}`}
          onClick={handleLike}
          aria-label="Curtir esta postagem"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <span className="heart-icon" style={{ fontSize: '1.4rem' }}>
            {userLiked ? '❤️' : '🤍'}
          </span>
          <span style={{ fontWeight: 'bold', color: '#555', fontSize: '1rem' }}>
            {likesCount > 0 ? likesCount : ''}
          </span>
        </button>
      </div>
    </div>
  );
}

// COMPONENTE PRINCIPAL
function Blog() {
  const [mostrarMais, setMostrarMais] = useState(false);
  const [postsDinamicos, setPostsDinamicos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca posts novos do Firebase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "blog"), orderBy("dataCriacao", "desc"));
        const querySnapshot = await getDocs(q);

        const novosPosts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const dataFormatada = data.dataCriacao
            ? new Date(data.dataCriacao).toLocaleDateString('pt-BR')
            : "Recente";

          return {
            id: doc.id,
            titulo: data.titulo,
            autor: data.autor || "Equipe CyberTech",
            data: dataFormatada,
            tempoLeitura: data.tempoLeitura ? `${data.tempoLeitura} min` : "Leitura rápida", // Formata o tempo
            imagem: data.imagemUrl,
            slug: null
          };
        });

        setPostsDinamicos(novosPosts);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const todosOsPosts = [...postsDinamicos, ...postsOriginais];

  return (
    <div className="blog-page">
      <div className='hero-section'></div>

      <div className="post-container-blog">
        {loading && <p style={{ textAlign: 'center', width: '100%', color: '#666' }}>Carregando posts...</p>}

        {todosOsPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Seção de Curiosidades */}
      <div className="curiosidade-card">
        <h2>Curiosidades sobre Python</h2>
        <strong>O nome “Python” não vem da cobra</strong>
        <p>
          Apesar do símbolo ser uma cobra, o nome Python veio do grupo de
          comédia britânico “Monty Python’s Flying Circus”, que o criador da linguagem,
          Guido van Rossum, adorava assistir.
        </p>

        <strong>É uma linguagem muito simples de ler</strong>
        <p>
          O Python foi criado para ser fácil de entender até por quem não programa.
          O próprio Guido dizia que o código Python deve parecer “inglês legível”.
        </p>
        <p style={{ fontFamily: 'monospace', background: '#f0f0f0', padding: '10px', borderRadius: '4px', marginTop: '5px' }}>
          if idade &gt;= 18: <br /> print("Você é maior de idade!")
        </p>
        <br />

        {mostrarMais && (
          <div className="conteudo-extra">
            <strong>É uma das linguagens mais populares do mundo</strong>
            <p>
              Python está entre as 3 linguagens mais usadas atualmente —
              junto com JavaScript e Java — graças à sua simplicidade e versatilidade.
            </p>

            <strong>É usada em áreas muito diferentes</strong>
            <p>Python é usada em:</p>
            <p>- Inteligência Artificial e Machine Learning</p>
            <p>- Desenvolvimento Web (com frameworks como Django e Flask)</p>
            <p>- Ciência de dados</p>
            <p>- Automação</p>
            <p>- Jogos e Robótica</p>

            <strong>Não precisa compilar</strong>
            <p>
              Python é uma linguagem interpretada, ou seja, roda diretamente sem
              precisar compilar o código antes. Isso facilita muito os testes e a aprendizagem.
            </p>

            <strong>Possui uma comunidade gigantesca</strong>
            <p>
              Há milhões de desenvolvedores Python no mundo. A comunidade cria novas
              bibliotecas todos os dias, o que torna a linguagem cada vez mais poderosa.
            </p>

            <strong>Dá pra usar até em arte digital e música</strong>
            <p>
              Com bibliotecas como Turtle, Pygame e Sonic Pi, é possível criar desenhos,
              jogos e até músicas usando código Python!
            </p>

            <strong>É usada em grandes empresas</strong>
            <p>
              Empresas como Google, Instagram, Netflix, Spotify e NASA usam
              Python em partes de seus sistemas.
            </p>
          </div>
        )}

        <button className="btn-ver-mais" onClick={() => setMostrarMais(!mostrarMais)}>
          {mostrarMais ? 'Ver menos ▲' : 'Ver mais curiosidades ▼'}
        </button>
      </div>
    </div>
  );
}

export default Blog;