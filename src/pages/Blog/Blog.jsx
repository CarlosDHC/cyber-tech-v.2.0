import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Importamos o mesmo CSS module usado na ChallengeList para garantir o design idêntico
import styles from "../Home/Home.module.css"; 

function Blog() {
  const navigate = useNavigate();

  return (
    // Fragmento para permitir múltiplos elementos raiz (Container + Botão)
    <>
      {/* Container Principal do Conteúdo */}
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
              src="/marketing-art.jpg" 
              alt="Marketing" 
              onError={(e) => e.target.src = "https://imgur.com/rjp7qWU.jpg"} 
            />
            <p>Marketing Digital</p>
          </Link>

          {/* RH */}
          <Link to="/rh" className={styles.challengeCard}>
            <img 
              src="/rh-art.jpg" 
              alt="RH" 
              onError={(e) => e.target.src = "https://imgur.com/NRn7mwt.jpg"} 
            />
            <p>Recursos Humanos</p>
          </Link>
        </div>
      </div>

      {/* --- BOTÃO FLUTUANTE DO FÓRUM (AGORA FORA DA DIV PRINCIPAL) --- */}
      <button
        onClick={() => navigate('/forum')}
        title="Abrir Fórum Geral"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: '#2563EB', // Fundo azul sólido
          color: 'white',
          border: 'none',
          borderRadius: '50px', // Pílula
          padding: '12px 24px',
          boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          zIndex: 9999, // Z-index alto para garantir sobreposição
          fontWeight: 'bold',
          fontSize: '1rem',
          transition: 'transform 0.2s ease, background 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.backgroundColor = '#1d4ed8';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#2563EB';
        }}
      >
        {/* Ícone de Chat */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Fórum Geral
      </button>
      {/* --- FIM DO BOTÃO FLUTUANTE --- */}
    </>
  );
}

export default Blog;