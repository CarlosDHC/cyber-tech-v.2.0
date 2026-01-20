import React from "react";
import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css";

function ChallengeList() {
  return (
    <div className={`container ${styles.challengeListContainer}`}>
      <h1 className={styles.pageTitle}>Desafios</h1>
      <p className={styles.pageSubtitle}>
        Hora de praticar! 
      </p>

      <div className={styles.challengeCardsList}>
        {/* Desafio 1 */}
        <Link to="/desafios/Direito/DesafioDir1" className={styles.challengeCard}>
          <img
            src="/img_desafios/foto8.jpg"
          ></img>
          <p>Legislação</p> 
        </Link> 

        {/* Desafio 2 */}
        <Link to="/desafios/Direito/DesafioDir2" className={styles.challengeCard}>
          <img
            src="/img_desafios/foto3.jpg"
          ></img>
          <p>Ética do sistema judiciário</p> 
        </Link>

        {/* Desafio 3 */}
        <Link to="/desafios/Direito/DesafioDir3" className={styles.challengeCard}>
         <img
            src="/img_desafios/foto2.jpg"
          ></img>
          <p>Direitos & Deveres</p>
        </Link>
        <Link to="/desafios/Direito/DesafioDir4" className={styles.challengeCard}>
         <img
            src="/img_desafios/foto1.jpg"
          ></img>
          <p>Advocacia</p>
        </Link>
        <Link to="/desafios/Direito/DesafioDir4" className={styles.challengeCard}>
         <img
            src="/img_desafios/foto1.jpg"
          ></img>
          <p>Constituição, Processo e Jurisprudência</p>
        </Link>
      </div>
    </div>
  );
}

export default ChallengeList;