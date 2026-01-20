import React, { useState, useEffect } from 'react';
import styles from './Forum.module.css';

// Imports do Firebase
import { db, auth } from "../../../FirebaseConfig";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  updateDoc, 
  doc, 
  arrayUnion,
  arrayRemove 
} from "firebase/firestore";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para os Tópicos em Alta (Sidebar)
  const [trendingTags, setTrendingTags] = useState([]);
  
  // NOVO: Estado para o Filtro Ativo (Tag clicada na sidebar)
  const [activeFilter, setActiveFilter] = useState(null);

  // Estados para nova pergunta
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [selectedTags, setSelectedTags] = useState(["Geral"]); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para comentários
  const [commentInputs, setCommentInputs] = useState({}); 

  // Lista de Tags Disponíveis para criar pergunta
  const availableTags = [
    "Geral", "Python", "JavaScript", "React", "HTML/CSS", 
    "Lógica", "Carreira", "Banco de Dados", "Mobile", "DevOps"
  ];

  const getSafeUserName = (user) => {
    if (user.displayName) return user.displayName;
    if (user.email) return user.email.split('@')[0];
    return "Usuário da Comunidade";
  };

  // 1. Carregar posts e Calcular Tags
  useEffect(() => {
    const q = query(collection(db, "forum_posts"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);

      // Lógica de Trending Topics
      const tagCounts = {};
      postsData.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });

      const sortedTags = Object.entries(tagCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5) // Top 5
        .map(([tag, count]) => ({ tag, count }));

      setTrendingTags(sortedTags);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // NOVO: Lógica para ativar/desativar filtro ao clicar na sidebar
  const handleFilterClick = (tag) => {
    if (activeFilter === tag) {
      setActiveFilter(null); // Remove filtro se clicar no mesmo
    } else {
      setActiveFilter(tag); // Ativa novo filtro
    }
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo
  };

  // NOVO: Filtra os posts para exibição
  const displayedPosts = activeFilter 
    ? posts.filter(post => post.tags && post.tags.includes(activeFilter))
    : posts;

  // ... (Funções toggleTag, handlePublish, handleLike, handleAddComment mantidas iguais) ...
  // Repetindo brevemente para contexto:
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      const newTags = selectedTags.filter(t => t !== tag);
      setSelectedTags(newTags);
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    if (selectedTags.length === 0) { alert("Selecione pelo menos uma categoria."); return; }
    const user = auth.currentUser;
    if (!user) { alert("Faça login para publicar."); return; }

    setIsSubmitting(true);
    try {
      const safeName = getSafeUserName(user);
      await addDoc(collection(db, "forum_posts"), {
        title: newTitle, content: newContent, author: safeName, authorId: user.uid,
        authorInitial: safeName[0].toUpperCase(), createdAt: serverTimestamp(),
        tags: selectedTags, likedBy: [], comments: [] 
      });
      setNewTitle(""); setNewContent(""); setSelectedTags(["Geral"]);
      setActiveFilter(null); // Reseta filtro para ver o novo post
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) { console.error(error); } finally { setIsSubmitting(false); }
  };

  const handleLike = async (postId, likedByArray = []) => {
    const user = auth.currentUser;
    if (!user) { alert("Faça login."); return; }
    const postRef = doc(db, "forum_posts", postId);
    const safeLikedBy = Array.isArray(likedByArray) ? likedByArray : [];
    const hasLiked = safeLikedBy.includes(user.uid);
    try {
      if (hasLiked) await updateDoc(postRef, { likedBy: arrayRemove(user.uid) });
      else await updateDoc(postRef, { likedBy: arrayUnion(user.uid) });
    } catch (error) { console.error(error); }
  };

  const handleAddComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;
    const user = auth.currentUser;
    if (!user) return alert("Faça login.");
    try {
      const safeName = getSafeUserName(user);
      const postRef = doc(db, "forum_posts", postId);
      await updateDoc(postRef, {
        comments: arrayUnion({
          id: Date.now(), text: text, author: safeName, authorId: user.uid, createdAt: new Date().toISOString()
        })
      });
      setCommentInputs(prev => ({ ...prev, [postId]: "" }));
    } catch (error) { console.error(error); }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "...";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.forumPage}>
      <div className={styles.contentWrapper}>
        
        {/* FEED PRINCIPAL */}
        <main className={styles.feedSection}>
          <div className={styles.pageTitle}>
            Fórum da Comunidade
            <span>Tire dúvidas, compartilhe conhecimento e evolua.</span>
            
            {/* NOVO: Feedback visual do filtro ativo */}
            {activeFilter && (
              <div className={styles.activeFilterBadge}>
                Exibindo: <strong>#{activeFilter}</strong>
                <button onClick={() => setActiveFilter(null)} className={styles.clearFilterBtn}>
                  ✕ Limpar filtro
                </button>
              </div>
            )}
          </div>

          {loading && <p className={styles.loadingMsg}>Carregando discussões...</p>}

          {!loading && displayedPosts.length === 0 && (
            <div className={styles.postCard}>
              <h3>Nenhum post encontrado {activeFilter ? `na categoria #${activeFilter}` : ''}.</h3>
              <p>{activeFilter ? "Tente limpar o filtro ou" : "Seja o primeiro a"} criar uma pergunta!</p>
              {activeFilter && (
                <button onClick={() => setActiveFilter(null)} className={styles.submitBtn} style={{marginTop: '10px'}}>
                  Ver todos os posts
                </button>
              )}
            </div>
          )}
          
          {/* Renderiza APENAS os posts filtrados */}
          {displayedPosts.map((post) => {
            const likedBy = post.likedBy || [];
            const userHasLiked = auth.currentUser && likedBy.includes(auth.currentUser.uid);

            return (
              <div key={post.id} className={styles.postCard}>
                <div className={styles.postHeader}>
                  <div className={styles.avatar}>{post.authorInitial || "?"}</div>
                  <div className={styles.authorInfo}>
                    <h4>{post.author}</h4>
                    <span>{formatTime(post.createdAt)}</span>
                  </div>
                </div>

                <div className={styles.postContent}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <div className={styles.tags}>
                    {post.tags?.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className={styles.tag} 
                        onClick={() => handleFilterClick(tag)} // Clicar na tag do post também filtra
                        style={{cursor: 'pointer'}}
                        title="Filtrar por esta tag"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.postFooter}>
                  <button 
                    className={`${styles.actionBtn} ${userHasLiked ? styles.liked : ''}`}
                    onClick={() => handleLike(post.id, likedBy)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={userHasLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {likedBy.length} Relevância
                  </button>
                  <button className={styles.actionBtn}>
                    💬 {post.comments?.length || 0} Comentários
                  </button>
                </div>

                <div className={styles.commentsSection}>
                  {post.comments && post.comments.length > 0 && (
                    <div className={styles.commentsList}>
                      {post.comments.map((comment, idx) => (
                        <div key={idx} className={styles.comment}>
                          <span className={styles.commentAuthor}>{comment.author}:</span>
                          <span className={styles.commentText}>{comment.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className={styles.commentInputGroup}>
                    <input 
                      type="text" 
                      placeholder="Escreva uma resposta..."
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    />
                    <button className={styles.commentBtn} onClick={() => handleAddComment(post.id)}>
                      Responder
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* NOVA PERGUNTA */}
          <div className={styles.newQuestionArea}>
            <h3>Tem alguma dúvida?</h3>
            {!auth.currentUser ? (
              <p className={styles.loginWarn}>Faça login para publicar uma pergunta.</p>
            ) : (
              <form onSubmit={handlePublish} className={styles.inputGroup}>
                <input 
                  type="text" 
                  placeholder="Título da sua pergunta..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  disabled={isSubmitting}
                  className={styles.mainInput}
                />
                
                <div className={styles.tagsLabel}>Selecione as categorias:</div>
                <div className={styles.tagSelectorContainer}>
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`${styles.tagOption} ${selectedTags.includes(tag) ? styles.tagOptionSelected : ''}`}
                    >
                      {tag}
                      {selectedTags.includes(tag) && <span style={{marginLeft:'4px'}}>✓</span>}
                    </button>
                  ))}
                </div>

                <textarea 
                  rows="4" 
                  placeholder="Descreva seu problema..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  disabled={isSubmitting}
                  className={styles.mainTextarea}
                />
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? "Publicando..." : "Publicar Pergunta"}
                </button>
              </form>
            )}
          </div>
        </main>
        
        {/* BARRA LATERAL (Agora interativa) */}
        <aside className={styles.sidebarSection}>
          <div className={styles.sidebarCard} style={{background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)', color: 'white'}}>
            <h3 className="font-bold text-lg mb-2"><span style={{
              color:'whitesmoke'
            }}>Comunidade Cyber Tech</span></h3>
            <p className="text-sm opacity-90 mb-4">Participe, ajude e ganhe relevância na plataforma.</p>
          </div>

          <div className={styles.sidebarCard}>
            <div className={styles.sidebarTitle}><span>🔥</span> Tópicos em Alta</div>
            
            {trendingTags.length === 0 ? (
              <p style={{fontSize: '0.9rem', color:'#666', fontStyle: 'italic'}}>Ainda sem dados suficientes.</p>
            ) : (
              <ul className={styles.topicList}>
                {trendingTags.map((item) => (
                  <li 
                    key={item.tag} 
                    // Aplica estilo extra se for o filtro ativo
                    className={`${styles.topicItem} ${activeFilter === item.tag ? styles.topicItemActive : ''}`}
                    onClick={() => handleFilterClick(item.tag)}
                  >
                    <span>#{item.tag}</span>
                    <span className={styles.topicCount}>{item.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.sidebarCard}>
            <div className={styles.sidebarTitle}><span>⚠️</span> Regras Rápidas</div>
            <ul className={styles.rulesList}>
              <li>Seja respeitoso.</li>
              <li>Use as tags corretas.</li>
              <li>Não compartilhe senhas.</li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Forum;