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
  
  // Filtros
  const [activeFilter, setActiveFilter] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(""); 

  // Estados para nova pergunta
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  
  // Tags
  const [selectedTags, setSelectedTags] = useState(["Geral"]); 
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Comentários
  const [commentInputs, setCommentInputs] = useState({}); 

  // Sugestões
  const tagSuggestions = [
    "Geral", "Python", "JavaScript", "React", "HTML/CSS", 
    "Lógica", "Civil", "Banco de Dados", "ADM", "Logística",
    "Engenharia", "Direito Digital", "Marketing", "RH"
  ];

  const getSafeUserName = (user) => {
    if (user.displayName) return user.displayName;
    if (user.email) return user.email.split('@')[0];
    return "Usuário da Comunidade";
  };

  // 1. Carregar posts
  useEffect(() => {
    const q = query(collection(db, "forum_posts"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);

      const tagStats = {}; 
      postsData.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach(tag => {
            if (!tagStats[tag]) {
              tagStats[tag] = { count: 0, posts: [] };
            }
            tagStats[tag].count += 1;
            tagStats[tag].posts.push(post);
          });
        }
      });

      const sortedTags = Object.entries(tagStats)
        .sort(([, statA], [, statB]) => statB.count - statA.count)
        .slice(0, 5)
        .map(([tag, stat]) => {
          const topPost = stat.posts.sort((a, b) => {
            const likesA = a.likedBy ? a.likedBy.length : 0;
            const likesB = b.likedBy ? b.likedBy.length : 0;
            return likesB - likesA;
          })[0];

          return { 
            tag, 
            count: stat.count,
            topPostTitle: topPost ? topPost.title : "Sem discussões ainda"
          };
        });

      setTrendingTags(sortedTags);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFilterClick = (tag) => {
    if (activeFilter === tag) {
      setActiveFilter(null);
    } else {
      setActiveFilter(tag);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayedPosts = posts.filter(post => {
    const matchesTag = activeFilter ? (post.tags && post.tags.includes(activeFilter)) : true;
    const matchesSearch = searchQuery 
      ? (post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         post.content.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    return matchesTag && matchesSearch;
  });

  // --- LÓGICA DE TAGS ATUALIZADA ---
  
  // Adiciona via Teclado (Enter ou Vírgula)
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault(); // Impede envio do formulário
      addTagLogic();
    }
  };

  // Adiciona via Botão de Clique (+)
  const handleManualAddTag = (e) => {
    e.preventDefault();
    addTagLogic();
  };

  // Lógica centralizada de adicionar tag
  const addTagLogic = () => {
    const val = tagInput.trim();
    if (val) {
      // Verifica se já existe (case insensitive opcional, aqui exato)
      if (!selectedTags.includes(val)) {
        setSelectedTags([...selectedTags, val]);
      }
      setTagInput(""); // Limpa o input para a próxima tag
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  // Publicar
  const handlePublish = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    
    // Adiciona o que sobrou no input caso o usuário tenha esquecido de dar enter
    let finalTags = [...selectedTags];
    if (tagInput.trim() && !finalTags.includes(tagInput.trim())) {
      finalTags.push(tagInput.trim());
    }

    if (finalTags.length === 0) {
      alert("Adicione pelo menos uma tag.");
      return;
    }

    const user = auth.currentUser;
    if (!user) { alert("Faça login para publicar."); return; }

    setIsSubmitting(true);
    try {
      const safeName = getSafeUserName(user);
      await addDoc(collection(db, "forum_posts"), {
        title: newTitle, content: newContent, author: safeName, authorId: user.uid,
        authorInitial: safeName[0].toUpperCase(), createdAt: serverTimestamp(),
        tags: finalTags, likedBy: [], comments: [] 
      });
      setNewTitle(""); setNewContent(""); 
      setSelectedTags(["Geral"]); setTagInput("");
      setActiveFilter(null); 
      setSearchQuery("");
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
        
        <main className={styles.feedSection}>
          <div className={styles.headerRow}>
            <div className={styles.pageTitle}>
              Fórum Geral
              <span>Explore múltiplos assuntos e tire suas dúvidas.</span>
            </div>
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>🔍</span>
              <input 
                type="text" 
                placeholder="Pesquisar por título..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {activeFilter && (
            <div className={styles.activeFilterBadge}>
              Filtro: <strong>#{activeFilter}</strong>
              <button onClick={() => setActiveFilter(null)} className={styles.clearFilterBtn}>✕</button>
            </div>
          )}

          {loading && <p className={styles.loadingMsg}>Carregando discussões...</p>}

          {!loading && displayedPosts.length === 0 && (
            <div className={styles.postCard}>
              <h3>Nenhum resultado encontrado.</h3>
              <p>Tente buscar por outro termo ou seja o primeiro a postar!</p>
            </div>
          )}
          
          {displayedPosts.map((post) => {
            const likedBy = post.likedBy || [];
            const userHasLiked = auth.currentUser && likedBy.includes(auth.currentUser.uid);

            return (
              <div key={post.id} className={styles.postCard}>
                <div className={styles.postHeader}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{color: '#2563EB'}}>
                      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 21C20 18.2386 17.7614 16 15 16H9C6.23858 16 4 18.2386 4 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
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
                        onClick={() => handleFilterClick(tag)}
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

          <div className={styles.newQuestionArea}>
            <h3>Criar nova discussão</h3>
            {!auth.currentUser ? (
              <p className={styles.loginWarn}>Faça login para publicar.</p>
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
                
                {/* --- ÁREA DE TAGS MELHORADA --- */}
                <div className={styles.tagInputContainer}>
                  <label>Tags (Digite e clique em + ou pressione Enter):</label>
                  <div className={styles.tagsWrapper}>
                    {selectedTags.map(tag => (
                      <span key={tag} className={styles.selectedTagChip}>
                        {tag} 
                        <button type="button" onClick={() => removeTag(tag)}>×</button>
                      </span>
                    ))}
                    
                    <div style={{display:'flex', alignItems:'center', flex: 1}}>
                      <input 
                        type="text" 
                        list="tagSuggestions"
                        placeholder="Ex: React, Marketing..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown} // Intercepta o Enter
                        className={styles.tagTextInput}
                      />
                      {/* BOTÃO DE ADICIONAR TAG MANUALMENTE */}
                      <button 
                        type="button" 
                        onClick={handleManualAddTag}
                        className={styles.addTagBtn}
                        title="Adicionar Tag"
                      >
                        +
                      </button>
                    </div>

                    <datalist id="tagSuggestions">
                      {tagSuggestions.map(tag => <option key={tag} value={tag} />)}
                    </datalist>
                  </div>
                </div>

                <textarea 
                  rows="4" 
                  placeholder="Descreva seu tópico..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  disabled={isSubmitting}
                  className={styles.mainTextarea}
                />
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? "Publicando..." : "Publicar"}
                </button>
              </form>
            )}
          </div>
        </main>
        
        <aside className={styles.sidebarSection}>
          <div className={styles.sidebarCard} style={{background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)', color: 'white'}}>
            <h3 className="font-bold text-lg mb-2"><span style={{color:'white', fontWeight:'bolder', fontFamily:'sans-serif', fontSize:'19px'}}>Comunidade Cyber Tech</span></h3>
            <p className="text-sm opacity-90 mb-4"><span style={{fontWeight:'bolder', fontFamily:'sans-serif', fontSize:'13px', color:'white'}}>Conecte-se com diversas áreas do conhecimento.</span></p>
          </div>

          <div className={styles.sidebarCard}>
            <div className={styles.sidebarTitle}><span>🔥</span> Assuntos em Alta</div>
            {trendingTags.length === 0 ? (
              <p style={{fontSize: '0.9rem', color:'#666', fontStyle: 'italic'}}>Aguardando dados...</p>
            ) : (
              <ul className={styles.topicList}>
                {trendingTags.map((item) => (
                  <li 
                    key={item.tag} 
                    className={`${styles.topicItem} ${activeFilter === item.tag ? styles.topicItemActive : ''}`}
                    onClick={() => handleFilterClick(item.tag)}
                  >
                    <div className={styles.topicHeader}>
                      <span className={styles.topicName}>#{item.tag}</span>
                      <span className={styles.topicCount}>{item.count}</span>
                    </div>
                    <div className={styles.topicHighlight}>
                      <small><span style={{fontWeight:'bolder', fontFamily:'sans-serif', fontSize:'20px', color:'rgb(42 86 186)'}}>Relacionado <br /></span> <span style={{fontWeight:'bolder', fontFamily:'sans-serif', fontSize:'19px', color:'#493d3f'}}>{item.topPostTitle}</span></small>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.sidebarCard}>
            <div className={styles.sidebarTitle}><span>⚠️</span> Regras</div>
            <ul className={styles.rulesList}>
              <li>Respeite os colegas.</li>
              <li>Use tags adequadas.</li>
              <li>Evite spam.</li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Forum;