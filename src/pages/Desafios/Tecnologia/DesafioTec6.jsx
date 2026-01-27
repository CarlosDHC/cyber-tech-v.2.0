import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from "../../../../FirebaseConfig"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Desafio.css"; // Importa o CSS que acabamos de criar

// --- MUDE APENAS ESTA LINHA EM CADA ARQUIVO ---
const NOME_MATERIA = "Nome da Matéria Aqui"; 
// ---------------------------------------------

export default function DesafioTecX() { // Pode manter o nome da função igual ou mudar para DesafioTec2, etc.
  const [desafios, setDesafios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDesafios = async () => {
      try {
        setLoading(true);
        // Filtra pelo nome da matéria exato
        const q = query(
          collection(db, "desafios"),
          where("area", "==", "Tecnologia"),
          where("subcategoria", "==", NOME_MATERIA)
        );

        const querySnapshot = await getDocs(q);
        const lista = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setDesafios(lista);
      } catch (error) {
        console.error("Erro ao buscar desafios:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarDesafios();
  }, []);

  return (
    <div className="container-desafios">
      <div className="header-desafio">
         <Link to="/desafios/capitulostecnologia" className="btn-voltar">&larr; Voltar para Capítulos</Link>
         <h1>{NOME_MATERIA}</h1>
         <p>Lista de desafios e quizzes disponíveis.</p>
      </div>

      {loading ? (
        <div className="loading">Carregando desafios...</div>
      ) : desafios.length === 0 ? (
        <div className="no-content">
          <h3>Nenhum desafio encontrado.</h3>
          <p>Ainda não há quizzes publicados para {NOME_MATERIA}.</p>
        </div>
      ) : (
        <div className="grid-desafios">
          {desafios.map((d) => (
            <div key={d.id} className="card-desafio">
              <img 
                src={d.imagemCapa || "https://placehold.co/600x400?text=Quiz"} 
                alt={d.titulo} 
                className="img-card"
              />
              <div className="content-card">
                <h3>{d.titulo}</h3>
                <p>Tentativas permitidas: {d.tentativasPermitidas}</p>
                <Link to={`/quiz/${d.id}`} className="btn-iniciar">
                  INICIAR DESAFIO
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}