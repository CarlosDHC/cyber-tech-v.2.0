import React, { useState, useEffect } from "react";
import "./DesafioDir.css";
import { db, auth } from "../../../../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function DesafioDireito2() {
  const total = 6;
  const corretas = ["c", "b", "a", "c", "b", "a"];

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
            desafio: "Desafio 2 - Os Pilares do Direito",
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
      titulo: "Norma Jurídica",
      codigo: "A norma jurídica pode ser definida como:",
      alternativas: {
        a: "Uma regra moral sem obrigatoriedade",
        b: "Um conselho do Estado",
        c: "Uma regra de conduta imposta pelo Estado",
        d: "Uma opinião do juiz",
      },
    },
    {
      titulo: "Coercibilidade",
      codigo: "O que significa dizer que a norma jurídica é coercitiva?",
      alternativas: {
        a: "Ela é opcional",
        b: "Pode ser imposta com uso da força",
        c: "Depende da vontade do cidadão",
        d: "Só vale em contratos",
      },
    },
    {
      titulo: "Sanção",
      codigo: "A sanção jurídica é:",
      alternativas: {
        a: "A consequência do descumprimento da norma",
        b: "Um prêmio dado pelo Estado",
        c: "Uma regra moral",
        d: "Uma sugestão",
      },
    },
    {
      titulo: "Direito Objetivo",
      codigo: "Direito objetivo refere-se:",
      alternativas: {
        a: "Ao direito de uma pessoa específica",
        b: "À vontade individual",
        c: "Ao conjunto de normas jurídicas",
        d: "À liberdade de pensamento",
      },
    },
    {
      titulo: "Direito Subjetivo",
      codigo: "O direito subjetivo é:",
      alternativas: {
        a: "A norma criada pelo Estado",
        b: "A faculdade de exigir um direito",
        c: "Uma sanção",
        d: "Um dever jurídico",
      },
    },
    {
      titulo: "Finalidade do Direito",
      codigo: "Qual é a principal finalidade do Direito?",
      alternativas: {
        a: "Garantir a paz e a justiça social",
        b: "Punir crimes apenas",
        c: "Beneficiar o Estado",
        d: "Regular somente contratos",
      },
    },
  ];

  return (
    <div className="pagina-desafios">
      <div className="scoreboard">{atualizarPlacar()}</div>

      <h1>Desafio 2 - Os Pilares do Direito</h1>
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
              <Link to="/desafios/Direito/DesafioDir1" className="back-link">
                <img src="/flecha1.png" alt="Voltar" className="logo-img" />
                Voltar
              </Link>
      
              <Link to="/desafios/CapitulosDireito" className="menu-link">
                <img src="/azulejos.png" alt="Menu" className="logo-img" />
              </Link>
      
              <Link to="/desafios/Direito/DesafioDir3" className="next-link">
                Próximo
                <img src="/flecha2.png" alt="Próximo" className="logo-img" />
              </Link>
            </div>
      
          </div>
        );
      }
      
