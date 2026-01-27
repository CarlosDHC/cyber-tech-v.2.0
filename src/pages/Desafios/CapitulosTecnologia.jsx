import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Capitulos.module.css';

// Este ícone existe na pasta assets, então mantemos o import
import iconLogica from '../../assets/icons/icon-algoritmo.png';

// O 'icon-arquivo.png' não existe em assets, mas tens 'arquivo.png' na pasta public.
// Em React/Vite, ficheiros na pasta public são acessíveis pela raiz "/".
const iconDados = "/arquivo.png"; 

const TRILHA_TECNOLOGIA = [
  { 
    id: 1, 
    nome: "Lógica de Programação", 
    rota: "/desafios/tecnologia/desafiotec1", // Corrigido para bater com App.jsx
    icon: iconLogica 
  },
  { 
    id: 2, 
    nome: "Estrutura de Dados",    
    rota: "/desafios/tecnologia/desafiotec2", // Corrigido
    icon: iconDados 
  },
  { 
    id: 3, 
    nome: "Front-end (HTML/CSS)",  
    rota: "/desafios/tecnologia/desafiotec3", // Corrigido
    icon: iconLogica 
  },
  { 
    id: 4, 
    nome: "JavaScript Avançado",   
    rota: "/desafios/tecnologia/desafiotec4", // Corrigido
    icon: iconDados 
  },
  { 
    id: 5, 
    nome: "React.js",              
    rota: "/desafios/tecnologia/desafiotec5", // Corrigido
    icon: iconLogica 
  },
  { 
    id: 6, 
    nome: "Banco de Dados",        
    rota: "/desafios/tecnologia/desafiotec6", // Corrigido
    icon: iconDados 
  },
  { 
    id: 7, 
    nome: "Git e GitHub",          
    rota: "/desafios/tecnologia/desafiotec7", // Corrigido
    icon: iconLogica 
  },
  { 
    id: 8, 
    nome: "Projetos Práticos",     
    rota: "/desafios/tecnologia/desafiotec8", // Corrigido
    icon: iconDados 
  }  
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