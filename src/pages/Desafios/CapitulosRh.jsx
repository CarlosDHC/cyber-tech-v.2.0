import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Capitulos.module.css'; // Usa o mesmo CSS bonito dos outros

// Import do ícone (ajuste se o caminho for diferente)
import iconPerson from '../../assets/icons/icon-person.png'; 

const TRILHA_RH = [
  { id: 1, nome: "Recrutamento & Seleção",        rota: "/desafios/rh/desafiorh1", icon: iconPerson },
  { id: 2, nome: "Treinamento & Desenvolvimento", rota: "/desafios/rh/desafiorh2", icon: iconPerson },
  { id: 3, nome: "Relação Trabalhista",           rota: "/desafios/rh/desafiorh3", icon: iconPerson },
  { id: 4, nome: "Cultura & Engajamento",         rota: "/desafios/rh/desafiorh4", icon: iconPerson },
  { id: 5, nome: "Folha de Pagamento",            rota: "/desafios/rh/desafiorh5", icon: iconPerson },
  { id: 6, nome: "Benefícios",                    rota: "/desafios/rh/desafiorh6", icon: iconPerson },
  { id: 7, nome: "Avaliação e Desempenho",        rota: "/desafios/rh/desafiorh7", icon: iconPerson },
  { id: 8, nome: "Segurança de Trabalho",         rota: "/desafios/rh/desafiorh8", icon: iconPerson } 
];
export default function CapitulosRh() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recursos Humanos</h1>
      <p className={styles.subtitle}>Selecione um tópico para iniciar os desafios</p>
      
      <div className={styles.grid}>
        {TRILHA_RH.map((item) => (
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