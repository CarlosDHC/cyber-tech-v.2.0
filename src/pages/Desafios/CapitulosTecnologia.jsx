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
        <Link to="/desafios/Tecnologia/DesafioTec1" className={styles.challengeCard}>
          <img
            src="https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg"
          ></img>
          <p>Introdução</p> 
        </Link> 

        {/* Desafio 2 */}
        <Link to="/desafios/Tecnologia/DesafioTec2" className={styles.challengeCard}>
          <img
            src="https://images.pexels.com/photos/7241413/pexels-photo-7241413.jpeg"
          ></img>
          <p>Front-End</p> 
        </Link>

        {/* Desafio 3 */}
        <Link to="/desafios/Tecnologia/DesafioTec3" className={styles.challengeCard}>
         <img
            src="https://images.pexels.com/photos/16592498/pexels-photo-16592498.jpeg"
          ></img>
          <p>Back-End</p>
        </Link>
        <Link to="/desafios/Tecnologia/DesafioTec4" className={styles.challengeCard}>
         <img
            src="https://imgur.com/wcyzeFf.jpg"
          ></img>
          <p>Algoritmos</p>
        </Link>
        <Link to="/desafios/Tecnologia/DesafioTec5" className={styles.challengeCard}>
         <img
            src="https://imgur.com/XAHCgaS.jpg"
          ></img>
          <p>Desenvolvimento</p>
        </Link>
        <Link to="/desafios/Tecnologia/DesafioTec5" className={styles.challengeCard}>
         <img
            src="https://imgur.com/XAHCgaS.jpg"
          ></img>
          <p>Banco de Dados</p>
        </Link>
        <Link to="/desafios/Tecnologia/DesafioTec5" className={styles.challengeCard}>
         <img
            src="https://imgur.com/XAHCgaS.jpg"
          ></img>
          <p>Conceitos</p>
        </Link>
        <Link to="/desafios/Tecnologia/DesafioTec5" className={styles.challengeCard}>
         <img
            src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
          ></img>
          <p>Python</p>
        </Link>
      </div>
    </div>
  );
}

export default ChallengeList;