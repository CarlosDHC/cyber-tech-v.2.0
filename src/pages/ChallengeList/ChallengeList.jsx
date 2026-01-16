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
          <video
            src="/videos/menino.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <p>O que é um algoritmo?</p>
        </Link>

        {/* Desafio 2 */}
        <Link to="/desafios/desafio2" className={styles.challengeCard}>
          <video
            src="/videos/algoritmo.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <p>Operações</p>
        </Link>

        {/* Desafio 3 */}
        <Link to="/desafios/desafio3" className={styles.challengeCard}>
          <video
            src="/videos/comida.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <p>Condicionais</p>
        </Link>

        {/* Desafio 4 */}
        <Link to="/desafios/desafio4" className={styles.challengeCard}>
          <video
            src="/videos/sollua.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <p>Funções</p>
        </Link>

         {/* Desafio 5 */}
        <Link to="/desafios/desafio5" className={styles.challengeCard}>
          <video
            src="/videos/comida.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <p>TESTE</p>
        </Link>
      </div>
    </div>
  );
}

export default ChallengeList;