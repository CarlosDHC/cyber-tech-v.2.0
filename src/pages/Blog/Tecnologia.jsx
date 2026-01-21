import React from 'react';
import { Link } from 'react-router-dom';
import './Tecnologia.css';

// 1. DADOS DAS MATÉRIAS (Cada objeto é um card único)
const listaMaterias = [
  {
    id: 'tech',
    titulo: "Tecnologia",
    rota: "/Blog",
    imagem: "/Tec-blog.png",
    descricao: "Inovação, IA e o futuro digital.",
    tempo: "15 min"
  },
  {
    id: 'direito',
    titulo: "Direito",
    rota: "/Direito",
    imagem: "/Dir-blog.png",
    descricao: "Justiça, leis e atualizações jurídicas.",
    tempo: "12 min"
  },
  {
    id: 'engenharia',
    titulo: "Engenharia",
    rota: "/Engenharia",
    imagem: "/Eng-blog.png",
    descricao: "Cálculos, obras e novas tecnologias.",
    tempo: "20 min"
  },
];

// 2. COMPONENTE DO CARD (Não mudar nada aqui)
function MateriaCard({ materia }) {
  return (
    <div className="post-card-alg">
      <Link to={materia.rota} className="read-more-link">
        <div className="post-image">
          <img src={materia.imagem} alt={materia.titulo} className="post-img-blog" />
        </div>
        <div className="post-info">
          <h3 className="post-title">{materia.titulo}</h3>
          <p className="post-description" style={{color: '#666', fontSize: '0.9rem', marginBottom: '10px'}}>
            {materia.descricao}
          </p>
          <div className="post-meta">
            <p><img src='/user.png' className='user' alt="" /> Equipe Editorial</p>
            <p><img src='/time-left.png' className='user' alt="" /> {materia.tempo}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

// 3. COMPONENTE PRINCIPAL (O nome aqui deve ser EXATAMENTE 'Tecnologia')
function Tecnologia() {
  return (
    <div className="blog-page">
      <div className='hero-section'>
      </div>
      <div className="post-container-blog">
        {listaMaterias.map((item) => (
          <MateriaCard key={item.id} materia={item} />
        ))}
      </div>
    </div>
  );
}

// 4. O EXPORT DEVE SER 'Tecnologia'
export default Tecnologia;