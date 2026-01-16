// src/pages/ChallengeList/ChallengeList.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css";

function ChallengeList() {
  return (
    <div className={`container ${styles.challengeListContainer}`}>
      <h1 className={styles.pageTitle}>Nossos Desafios</h1>
      <p className={styles.pageSubtitle}>
        Teste sua lógica com nossos desafios práticos.
      </p>

      <div className={styles.challengeCardsList}>
        {/* Desafio 1 */}
        <Link to="/desafios/desafio1" className={styles.challengeCard}>
          <img 
            src="img_desafios/algoritmo.jpg">
          </img>
          <p>O que é um algoritmo?</p>
        </Link>

        {/* Desafio 2 */}
        <Link to="/desafios/desafio2" className={styles.challengeCard}>
          <img
            src="/img_desafios/operacoes.jpg"
          ></img>
          <p>Operações</p>
        </Link>

        {/* Desafio 3 */}
        <Link to="/desafios/desafio3" className={styles.challengeCard}>
         <img
            src="/img_desafios/condicionais.jpg"
          ></img>
          <p>Condicionais</p>
        </Link>

        {/* Desafio 4 */}
        <Link to="/desafios/desafio4" className={styles.challengeCard}>
          <img
            src="/img_desafios/funcoes.jpg"
          ></img>
          <p>Funções</p>
        </Link>
      </div>
    </div>
  );
}

export default ChallengeList;