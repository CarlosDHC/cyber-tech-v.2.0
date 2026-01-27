import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from "../../../../FirebaseConfig"; // Verifica se o caminho do Firebase está correto
import { collection, query, where, getDocs } from "firebase/firestore";
import "./DesafioRH.css"; // Importa o CSS Roxo criado acima

// --- MUDE APENAS ESTA LINHA EM CADA ARQUIVO ---
const NOME_MATERIA = "Gestão de Pessoas"; 
// ---------------------------------------------

export default function DesafioRhPage() { 
  const [desafios, setDesafios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDesafios = async () => {
      try {
        setLoading(true);
        // Filtra pela Área "Rh" e pela Subcategoria específica
        const q = query(
          collection(db, "desafios"),
          where("area", "==", "Rh"), // Importante: Deve ser "Rh" (igual ao salvo no Admin)
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
         <Link to="/desafios/capitulosrh" className="btn-voltar">&larr; Voltar para RH</Link>
         <h1>{NOME_MATERIA}</h1>
         <p>Lista de desafios e quizzes disponíveis.</p>
      </div>

      {loading ? (
        <div className="loading">Carregando desafios...</div>
      ) : desafios.length === 0 ? (
        <div className="no-content">
          <h3>Nenhum desafio encontrado.</h3>
          <p>Acesse o Painel Admin para criar novos quizzes para {NOME_MATERIA}.</p>
        </div>
      ) : (
        <div className="grid-desafios">
          {desafios.map((d) => (
            <div key={d.id} className="card-desafio">
              <img 
                src={d.imagemCapa || "https://placehold.co/600x400?text=RH"} 
                alt={d.titulo} 
                className="img-card"
              />
              <div className="content-card">
                <h3>{d.titulo}</h3>
                <p>Tentativas: {d.tentativasPermitidas}</p>
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