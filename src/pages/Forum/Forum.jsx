import React, { useState } from 'react';
import styles from './Forum.module.css';

const Forum = () => {
  // Estado para armazenar as postagens
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Carlos Tech",
      initial: "C",
      time: "2 horas atrás",
      title: "Como centralizar uma div verticalmente?",
      content: "Estou tentando usar flexbox mas a div continua no topo da tela. Alguém tem um snippet rápido?",
      tags: ["CSS", "Frontend"],
      likes: 12,
      comments: [
        { id: 101, author: "Ana Dev", text: "Tente usar 'align-items: center' no pai e defina uma altura (height: 100vh)." },
        { id: 102, author: "Mario", text: "Ou use 'display: grid' e 'place-items: center'. É mais moderno!" }
      ]
    },
    {
      id: 2,
      author: "Julia Code",
      initial: "J",
      time: "5 horas atrás",
      title: "Qual a diferença real entre let e const?",
      content: "Sei que const é constante, mas vejo gente alterando arrays declarados com const. Como isso funciona?",
      tags: ["JavaScript", "Iniciante"],
      likes: 24,
      comments: [
        { id: 201, author: "Roberto Sr", text: "O 'const' protege a referência da variável, mas não o valor interno do objeto/array. Você não pode reatribuir, mas pode mudar propriedades." }
      ]
    },
    {
      id: 3,
      author: "Pedro H.",
      initial: "P",
      time: "1 dia atrás",
      title: "Melhores práticas para React Hooks",
      content: "Estou começando agora e fico confuso com o useEffect. Devo usar ele para tudo?",
      tags: ["React", "Hooks"],
      likes: 8,
      comments: []
    }
  ]);

  // Estados para novo post
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: "Você",
      initial: "V",
      time: "Agora mesmo",
      title: newTitle,
      content: newContent,
      tags: ["Geral"],
      likes: 0,
      comments: []
    };

    setPosts([...posts, newPost]);
    setNewTitle("");
    setNewContent("");
    
    // Scroll suave para o final da página após postar
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className={styles.forumPage}>
      <div className={styles.contentWrapper}>
        
        {/* === SESSÃO PRINCIPAL (ESQUERDA) === */}
        <main className={styles.feedSection}>
          
          {/* Mapeando os Posts Existentes */}
          {posts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              {/* Header do Post */}
              <div className={styles.postHeader}>
                <div className={styles.avatar}>{post.initial}</div>
                <div className={styles.authorInfo}>
                  <h4>{post.author}</h4>
                  <span>{post.time}</span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className={styles.postContent}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                
                {/* Tags */}
                <div className={styles.tags}>
                  {post.tags.map(tag => (
                    <span key={tag} className={styles.tag}>#{tag}</span>
                  ))}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className={styles.postFooter}>
                <button className={styles.actionBtn}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  {post.likes} Votos
                </button>
                <button className={styles.actionBtn}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {post.comments.length} Respostas
                </button>
              </div>

              {/* Sessão de Comentários (Estilo Fórum) */}
              {post.comments.length > 0 && (
                <div className={styles.commentsSection}>
                  {post.comments.map(comment => (
                    <div key={comment.id} className={styles.comment}>
                      <div style={{fontWeight: 'bold', fontSize: '0.9rem', minWidth: '80px'}}>
                        {comment.author}:
                      </div>
                      <div style={{fontSize: '0.9rem', color: '#333'}}>
                        {comment.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* === INPUT DE NOVA PERGUNTA (NO FINAL) === */}
          <div className={styles.newQuestionArea}>
            <h3>Tem alguma dúvida?</h3>
            <form onSubmit={handlePublish} className={styles.inputGroup}>
              <input 
                type="text" 
                placeholder="Título da sua pergunta (ex: Dúvida sobre Python)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea 
                rows="4" 
                placeholder="Descreva detalhadamente seu problema ou dúvida..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <button type="submit" className={styles.submitBtn}>Publicar Pergunta</button>
            </form>
          </div>

        </main>

        {/* === BARRA LATERAL (DIREITA - STICKY) === */}
        <aside className={styles.sidebarSection}>
          
          {/* Card de Boas Vindas */}
          <div className={`${styles.sidebarCard} bg-blue-600 text-white`} style={{background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)', color: 'white'}}>
            <h3 className="font-bold text-lg mb-2"><span style={{color: 'whitesmoke'}}>Comunidade Cyber Tech</span></h3>
            <p className="text-sm opacity-90 mb-4">
              Junte-se a discussões, compartilhe conhecimento e evolua sua carreira na programação.
            </p>
            <div className="flex -space-x-2 overflow-hidden">
               <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200"></div>
               <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-300"></div>
               <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-400"></div>
               <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-500 text-xs text-white font-bold">+99</div>
            </div>
          </div>

          {/* Tópicos Populares */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarTitle}>
              <span className="material-symbols-outlined">trending_up</span>
              Tópicos em Alta
            </div>
            <ul className={styles.topicList}>
              <li className={styles.topicItem}>
                <span>#javascript</span>
                <span className={styles.topicCount}>24</span>
              </li>
              <li className={styles.topicItem}>
                <span>#python</span>
                <span className={styles.topicCount}>18</span>
              </li>
              <li className={styles.topicItem}>
                <span>#reactjs</span>
                <span className={styles.topicCount}>12</span>
              </li>
              <li className={styles.topicItem}>
                <span>#carreira</span>
                <span className={styles.topicCount}>9</span>
              </li>
            </ul>
          </div>

          {/* Regras Rápidas */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarTitle}>
              <span>⚠️</span> Regras
            </div>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
              <li>Seja respeitoso com todos.</li>
              <li>Pesquise antes de perguntar.</li>
              <li>Use tags corretas.</li>
            </ul>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default Forum;