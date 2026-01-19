// src/pages/ChallengeList/ChallengeList.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css";

function ChallengeList() {
  return (
    <div className={`container ${styles.challengeListContainer}`}>
      <h1 className={styles.pageTitle}>Cursos</h1>
      <p className={styles.pageSubtitle}>
        Selecione a sua área.
      </p>

      <div className={styles.challengeCardsList}>
        {/* Desafio 1 */}
        <Link to="/desafios/Tecnologia/DesafioTec1" className={styles.challengeCard}>
          <img 
            src="img_desafios/tecnologia.jpg">
          </img>
          <p>Tecnologia</p>
        </Link>

        {/* Desafio 2 */}
        <Link to="/desafios/Direito/DesafioDir1" className={styles.challengeCard}>
          <img
            src="/img_desafios/direito.jpg"
          ></img>
          <p>Direito</p> 
        </Link>

        {/* Desafio 3 */}
        <Link to="/desafios/desafio3" className={styles.challengeCard}>
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