import React, { useState, useEffect } from "react";
import "./DesafioDir.css";
import { db, auth } from "../../../../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function DesafioDireito4() {
  const total = 6;
  const corretas = ["a", "b", "c", "a", "b", "c"];

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
            desafio: "Desafio 4 - Direito Civil (Parte Geral)",
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
      titulo: "Pessoa Natural",
      codigo: "Quando começa a personalidade civil da pessoa natural?",
      alternativas: {
        a: "Com o nascimento com vida",
        b: "Com a concepção",
        c: "Com a maioridade",
        d: "Com o registro civil",
      },
    },
    {
      titulo: "Capacidade Civil",
      codigo: "Quem é absolutamente incapaz segundo o Código Civil?",
      alternativas: {
        a: "Maiores de 18 anos",
        b: "Menores de 16 anos",
        c: "Maiores de 16 e menores de 18",
        d: "Pessoas casadas",
      },
    },
    {
      titulo: "Pessoa Jurídica",
      codigo: "A pessoa jurídica adquire personalidade com:",
      alternativas: {
        a: "A assinatura do contrato",
        b: "O início das atividades",
        c: "O registro do ato constitutivo",
        d: "A aprovação judicial",
      },
    },
    {
      titulo: "Bens",
      codigo: "Bens móveis são aqueles que:",
      alternativas: {
        a: "Podem ser transportados sem alteração da substância",
        b: "Estão ligados ao solo",
        c: "São imóveis por natureza",
        d: "Não podem ser removidos",
      },
    },
    {
      titulo: "Fato Jurídico",
      codigo: "O fato jurídico é:",
      alternativas: {
        a: "A manifestação de vontade",
        b: "Todo acontecimento que gera efeitos no direito",
        c: "Um contrato",
        d: "Um ato ilícito apenas",
      },
    },
    {
      titulo: "Negócio Jurídico",
      codigo: "O negócio jurídico é caracterizado principalmente por:",
      alternativas: {
        a: "Imposição do Estado",
        b: "Vontade das partes",
        c: "Fato natural",
        d: "Sanção jurídica",
      },
    },
  ];

  return (
    <div className="pagina-desafios">
      <div className="scoreboard">{atualizarPlacar()}</div>

      <h1>Desafio de Direito — Civil (Parte Geral)</h1>
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
          <Link to="/desafios/Direito/DesafioDir3" className="back-link">
            <img src="/flecha1.png" alt="Voltar" className="logo-img" />
            Voltar
          </Link>
  
          <Link to="/desafios" className="menu-link">
            <img src="/azulejos.png" alt="Menu" className="logo-img" />
          </Link>
  
  
          <Link to="/desafios" className="next-link">
            Próximo
            <img src="/flecha2.png" alt="Próximo" className="logo-img" />
          </Link>
        </div>
  
      </div>
    );
  }

