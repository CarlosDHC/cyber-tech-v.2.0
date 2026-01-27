import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../../FirebaseConfig';
import styles from './Capitulos.module.css'; 

export default function CapitulosTecnologia() {
  const [categorias, setCategorias] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDesafios() {
      try {
        // Filtra apenas TECNOLOGIA
        const q = query(
          collection(db, "desafios"), 
          where("area", "==", "Tecnologia"),
          orderBy("dataCriacao", "asc")
        );
        
        const snapshot = await getDocs(q);
        const grupos = {};
        
        snapshot.forEach(doc => {
          const dados = doc.data();
          const nomeCategoria = dados.subcategoria || "Geral";
          
          if (!grupos[nomeCategoria]) grupos[nomeCategoria] = [];
          grupos[nomeCategoria].push({ id: doc.id, ...dados });
        });

        setCategorias(grupos);
      } catch (error) {
        console.error("Erro ao buscar desafios:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDesafios();
  }, []);

  if (loading) return <div className={styles.loading}>Carregando algoritmos...</div>;

  return (
    <div className={styles.pageContainer}>
      {/* Header com gradiente Azul/Tech */}
      <header className={styles.headerTec} style={{background: 'linear-gradient(135deg, #2980b9, #2c3e50)'}}>
        <h1>Trilha de Tecnologia</h1>
        <p>Algoritmos, Lógica de Programação e Desenvolvimento Web.</p>
      </header>

      <div className={styles.content}>
        {Object.keys(categorias).length === 0 && <p className={styles.emptyMsg}>Nenhum desafio de tecnologia disponível.</p>}

        {Object.keys(categorias).map((nomeCategoria) => (
          <section key={nomeCategoria} className={styles.chapterSection}>
            <div className={styles.chapterHeader}>
               <h2 className={styles.chapterTitle}>{nomeCategoria}</h2>
               <div className={styles.chapterLine}></div>
            </div>
            
            <div className={styles.cardsGrid}>
              {categorias[nomeCategoria].map((desafio) => (
                <Link key={desafio.id} to={`/desafios/resolver/${desafio.id}`} className={styles.challengeCard}>
                  <div className={styles.cardIcon}>
                    {/* Tenta usar a imagem do desafio, senão usa a padrão tec-art.jpg */}
                    <img src={desafio.imagemCapa || "/tec-art.jpg"} alt="Capa" onError={e => e.target.src='/tec-art.jpg'} />
                  </div>
                  <div className={styles.cardInfo}>
                    <h3>{desafio.titulo}</h3>
                    <div className={styles.cardMeta}>
                       <span className={styles.badgeXp}>{desafio.questoes?.length || 0} Questões</span>
                       <span className={styles.badgeDif} style={{background:'#3498db'}}>Tech</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}