import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Importamos o mesmo CSS module usado na ChallengeList para garantir o design idêntico
import styles from "../Home/Home.module.css"; 

function Blog() {
  const navigate = useNavigate();

  return (
    // Reutilizando as classes container e challengeListContainer do CSS da Home
    <div className={`container ${styles.challengeListContainer}`}>
      <h1 className={styles.pageTitle}>Blog</h1>
      <p className={styles.pageSubtitle}>
        Explore nossos artigos por categoria.
      </p>

      <div className={styles.challengeCardsList}>
        {/* Tecnologia */}
        <Link to="/tecnologia" className={styles.challengeCard}>
          {/* Tenta usar a imagem local específica do blog, com fallback */}
          <img 
            src="/Tec-blog.png" 
            alt="Tecnologia" 
            onError={(e) => e.target.src = "https://imgur.com/A6MA8Ua.jpg"} 
          />
          <p>Tecnologia</p>
        </Link>

        {/* Direito */}
        <Link to="/direito" className={styles.challengeCard}>
          <img 
            src="/Dir-blog.png" 
            alt="Direito" 
            onError={(e) => e.target.src = "https://imgur.com/6RTD2WO.jpg"} 
          />
          <p>Direito</p>
        </Link>

        {/* Engenharia */}
        <Link to="/engenharia" className={styles.challengeCard}>
          <img 
            src="/Eng-blog.png" 
            alt="Engenharia" 
            onError={(e) => e.target.src = "https://imgur.com/5KHksLP.jpg"} 
          />
          <p>Engenharia Civil</p>
        </Link>

        {/* Marketing */}
        <Link to="/marketing" className={styles.challengeCard}>
          <img 
            src="/Mk-blog.png" 
            alt="Marketing" 
            onError={(e) => e.target.src = "Mk.jpg"} 
          />
          <p>Marketing Digital</p>
        </Link>

        {/* RH */}
        <Link to="/rh" className={styles.challengeCard}>
          <img 
            src="/Rh-blog.png" 
            alt="RH" 
            onError={(e) => e.target.src = "https://imgur.com/NRn7mwt.jpg"} 
          />
          <p>Recursos Humanos</p>
        </Link>
      </div>

      {/* --- BOTÃO FLUTUANTE DO FÓRUM --- */}
      <button
        onClick={() => navigate('/forum')}
        title="Abrir Fórum de Dúvidas"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          backgroundColor: '#ffffff',
          border: '2px solid #2563EB',
          borderRadius: '50%',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'transform 0.2s ease',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#2563EB' }}>
          <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.132 20.177 10.244 17.819 10.022C17.369 6.634 14.475 4 11 4C7.034 4 3.755 6.84 3.1 10.605C1.353 11.238 0 12.937 0 15C0 17.761 2.239 20 5 20H17.5V19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8" cy="14" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="14" r="1.5" fill="currentColor"/>
          <circle cx="16" cy="14" r="1.5" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
}

export default Blog;