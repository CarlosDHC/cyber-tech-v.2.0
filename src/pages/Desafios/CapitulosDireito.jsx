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
            src="/img_desafios/algoritmo.jpg"
          ></img>
          <p>O que é um algoritmo?</p> 
        </Link> 

        {/* Desafio 2 */}
        <Link to="/desafios/Direito/DesafioDir2" className={styles.challengeCard}>
          <img
            src="/img_desafios/direito.jpg"
          ></img>
          <p>Direito</p> 
        </Link>

        {/* Desafio 3 */}
        <Link to="/desafios/Direito/DesafioDir3" className={styles.challengeCard}>
         <img
            src="/img_desafios/engenharia.jpg"
          ></img>
          <p>Engenharia</p>
        </Link>
        <Link to="/desafios/Direito/DesafioDir4" className={styles.challengeCard}>
         <img
            src="/img_desafios/engenharia.jpg"
          ></img>
          <p>Engenharia</p>
        </Link>
      </div>
    </div>
  );
}

export default ChallengeList;