import React from "react";
import "./Funcoes.css";




const Funcoes = () => {
  return (
    <div class="content-wrapper">
      <div class="blog-article">

        <h1 class="article-title">O que é uma função?</h1>
        <p>
          Em Python, uma função é um bloco de código reutilizável que executa uma tarefa específica. Você pode chamá-la sempre que precisar executar essa tarefa, o que ajuda a tornar seu código mais organizado, legível e eficiente.
        </p>

        <div className="pop">
          <h2 class="topic-title">Definindo uma função</h2>
          <p>
            Você define uma função usando a defpalavra-chave, seguida pelo nome da função, parênteses () e dois pontos:. O bloco de código dentro da função é indentado.
          </p>
          <img src="/funex1.png" alt="Imagem sobre Funções" className="posta-img" />
        </div>
        <div className="pop">
          <h2 class="topic-title">Chamando uma função</h2>
          <p>
            Uma vez que uma função esteja definida, você pode "chamá-la" ou executá-la escrevendo seu nome seguido de parênteses.            </p>
          <img src="/funex2.png" alt="Imagem sobre Funções" className="posta-img" />

        </div>
        <div className="pop">
          <h2 class="topic-title">Retornando valores</h2>
          <p>
            As funções também podem enviar um valor de volta para quem as chamou usando a returninstrução. Isso é útil para cálculos ou para obter resultados de uma tarefa.            </p>
          <img src="/funex3.png" alt="Imagem sobre Funções" className="posta-img" />
        </div>
        <div className="navigation-links">
          <a href="/blog" className="back-link">
            ← Voltar
          </a>
          <a href="/operacao" className="back-link">
            Próximo →
          </a>
        </div>
      </div>
    </div>


  );
};
export default Funcoes;