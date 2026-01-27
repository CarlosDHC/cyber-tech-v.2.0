import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Capitulos.module.css';

// Este ícone existe na pasta assets, então mantemos o import
import iconLogica from '../../assets/icons/icon-algoritmo.png';

// O 'icon-arquivo.png' não existe em assets, mas tens 'arquivo.png' na pasta public.
// Em React/Vite, ficheiros na pasta public são acessíveis pela raiz "/".
const iconDados = "/arquivo.png"; 

const TRILHA_TECNOLOGIA = [
  { id: 1, nome: "Lógica de Programação", rota: "/tecnologia/desafio-1", icon: iconLogica },
  { id: 2, nome: "Estrutura de Dados",    rota: "/tecnologia/desafio-2", icon: iconDados },
  { id: 3, nome: "Front-end (HTML/CSS)",  rota: "/tecnologia/desafio-3", icon: iconLogica },
  { id: 4, nome: "JavaScript Avançado",   rota: "/tecnologia/desafio-4", icon: iconDados },
  { id: 5, nome: "React.js",              rota: "/tecnologia/desafio-5", icon: iconLogica },
  { id: 6, nome: "Banco de Dados",        rota: "/tecnologia/desafio-6", icon: iconDados },
  { id: 7, nome: "Git e GitHub",          rota: "/tecnologia/desafio-7", icon: iconLogica }, 
  { id: 8, nome: "Projetos Práticos",     rota: "/tecnologia/desafio-8", icon: iconDados }  
];

export default function CapitulosTecnologia() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tecnologia</h1>
      <p className={styles.subtitle}>Escolha uma matéria para ver os desafios disponíveis</p>
      
      <div className={styles.grid}>
        {TRILHA_TECNOLOGIA.map((item) => (
          <Link key={item.id} to={item.rota} className={styles.card}>
            <img 
              src={item.icon} 
              alt={item.nome} 
              className={styles.icon} 
              onError={(e) => e.target.style.display = 'none'} 
            />
            <h3 className={styles.cardTitle}>{item.nome}</h3>
            <span className={styles.cardDesc}>Acessar Conteúdo</span>
          </Link>
        ))}
      </div>
    </div>
  );
}