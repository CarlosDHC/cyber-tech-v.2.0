import React, { useState, useEffect } from "react";
import "./DesafioDir.css";
import { db, auth } from "../../../../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function DesafioDireito3() {
  const total = 6;
  const corretas = ["b", "c", "a", "b", "c", "a"];

  const [pontuacao, setPontuacao] = useState(0);
  const [respondidas, setRespondidas] = useState(Array(total).fill(false));
  const [feedbacks, setFeedbacks] = useState(Array(total).fill(""));
  const [valores, setValores] = useState(Array(total).fill(""));
  const [salvo, setSalvo] = useState(false);

  const atualizarPlacar = () => `Pontuação: ${pontuacao} / ${total}`;

  const verificar = (num, alternativa) => {
    if (respondidas[num]) return;

    const novasRespondidas = [...respondidas];
    const novosFeedbacks = [...feedbacks];
    const novosValores = [...valores];

    novosValores[num] = alternativa;

    if (alternativa === corretas[num]) {
      novosFeedbacks[num] = "Correto!";
      setPontuacao((prev) => prev + 1);
    } else {
      novosFeedbacks[num] = "Resposta incorreta. (sem nova tentativa)";
    }

    novasRespondidas[num] = true;
    setValores(novosValores);
    setFeedbacks(novosFeedbacks);
    setRespondidas(novasRespondidas);
  };

  const verificarFim = respondidas.every((r) => r);
  const porcentagem = Math.round((pontuacao / total) * 100);

  let msg = "Precisa praticar mais...";
  if (porcentagem >= 85) msg = "Excelente!";
  else if (porcentagem >= 60) msg = "Bom trabalho!";

  useEffect(() => {
    if (verificarFim && !salvo && auth.currentUser) {
      const salvarNoBanco = async () => {
        try {
          await addDoc(collection(db, "pontuacoes"), {
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            nome: auth.currentUser.displayName || "Aluno",
            desafio: "Desafio 3 - Direito Constitucional",
            nota: pontuacao,
            total: total,
            data: new Date().toISOString(),
          });
          setSalvo(true);
        } catch (error) {
          console.error("Erro ao salvar nota:", error);
        }
      };
      salvarNoBanco();
    }
  }, [verificarFim, salvo, pontuacao]);

  const desafios = [
    {
      titulo: "Constituição Federal",
      codigo: "Qual é a principal função da Constituição Federal?",
      alternativas: {
        a: "Criar leis ordinárias",
        b: "Organizar o Estado e garantir direitos fundamentais",
        c: "Punir crimes",
        d: "Regular contratos privados",
      },
    },
    {
      titulo: "Poder Constituinte",
      codigo: "O poder constituinte originário é:",
      alternativas: {
        a: "Derivado e limitado",
        b: "Controlado pelo STF",
        c: "Inicial, ilimitado e incondicionado",
        d: "Subordinado à Constituição anterior",
      },
    },
    {
      titulo: "Forma de Estado",
      codigo: "O Brasil adota qual forma de Estado?",
      alternativas: {
        a: "Estado Federal",
        b: "Estado Unitário",
        c: "Estado Confederal",
        d: "Estado Absolutista",
      },
    },
    {
      titulo: "Poderes da República",
      codigo: "São poderes da República, segundo a Constituição:",
      alternativas: {
        a: "Executivo, Judiciário e Militar",
        b: "Legislativo, Executivo e Judiciário",
        c: "Executivo, Judiciário e Popular",
        d: "Legislativo, Judiciário e Moderador",
      },
    },
    {
      titulo: "Separação dos Poderes",
      codigo: "O princípio da separação dos poderes visa:",
      alternativas: {
        a: "Concentrar poder no Executivo",
        b: "Eliminar conflitos entre poderes",
        c: "Evitar abusos de poder",
        d: "Fortalecer apenas o Judiciário",
      },
    },
    {
      titulo: "Supremacia da Constituição",
      codigo: "O princípio da supremacia da Constituição significa que:",
      alternativas: {
        a: "A Constituição está acima de todas as normas",
        b: "A Constituição pode ser ignorada",
        c: "Leis ordinárias têm o mesmo valor",
        d: "O Executivo pode alterá-la livremente",
      },
    },
  ];

  return (
    <div className="pagina-desafios">
      <div className="scoreboard">{atualizarPlacar()}</div>

      <h1>Desafio de Direito — Constitucional</h1>
      <p className="subtitle">
        Clique na alternativa correta! (Apenas uma tentativa)
      </p>

      {desafios.map((d, i) => (
        <div key={i} className="challenge-container">
          <h2>{`Desafio ${i + 1} — ${d.titulo}`}</h2>
          <pre>{d.codigo}</pre>

          <div className="alternativas">
            {Object.entries(d.alternativas).map(([letra, texto]) => (
              <button
                key={letra}
                className={`alternativa-btn ${
                  valores[i] === letra ? "selecionada" : ""
                } ${respondidas[i] ? "bloqueada" : ""}`}
                onClick={() => verificar(i, letra)}
                disabled={respondidas[i]}
              >
                <strong>{letra.toUpperCase()}.</strong> {texto}
              </button>
            ))}
          </div>

          <div
            className={`feedback ${
              feedbacks[i].includes("Correto") ? "correct" : "incorrect"
            }`}
          >
            {feedbacks[i]}
          </div>
        </div>
      ))}

      {verificarFim && (
        <div className="final-score">
          {msg} Sua nota final é {pontuacao}/{total} ({porcentagem}%).
          {salvo && (
            <p style={{ fontSize: "0.9rem", color: "green", marginTop: "5px" }}>
              Nota salva com sucesso!
            </p>
          )}
        </div>
      )}

      <div className="navigation-links">
             <Link to="/desafios/Direito/DesafioDir2" className="back-link">
               <img src="/flecha1.png" alt="Voltar" className="logo-img" />
               Voltar
             </Link>
     
             <Link to="/desafios/CapitulosDireito" className="menu-link">
               <img src="/azulejos.png" alt="Menu" className="logo-img" />
             </Link>
     
             <Link to="/desafios/Direito/DesafioDir4" className="next-link">
               Próximo
               <img src="/flecha2.png" alt="Próximo" className="logo-img" />
             </Link>
           </div>
     
         </div>
       );
     }
