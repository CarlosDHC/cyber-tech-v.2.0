import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import styles from "./Home.module.css";
import challenges from "../../data/challenges.json";

// Importação obrigatória dos estilos base do Swiper
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Ícones
import iconAlgoritmo from "../../assets/icons/icon-algoritmo.png";
import iconPerson from "../../assets/icons/icon-person.png";
import iconFood from "../../assets/icons/icon-food.png";
import iconSunMoon from "../../assets/icons/icon-sun-moon.png";

function Home() {
  const iconMap = {
    person: iconPerson,
    food: iconFood,
    "sun-moon": iconSunMoon,
    algoritmo: iconAlgoritmo,
  };

  const imageMap = {
    "o-que-e-algoritmo": "/img_desafios/desafio-algoritmo.jpg",
    "estudar-ou-descansar": "/img_desafios/desafio-direito.jpg",
    "fome": "/img_desafios/desafio-engenharia.jpg",
    "dia-ou-noite": "/img_desafios/desafio-tecnologia.jpg",
    "Markenting": "/img_desafios/desafio-marketing.jpg",
    "Recursos Humanos": "/img_desafios/desafio-rh.jpg",
  };

  const slugToRoute = {
    "o-que-e-algoritmo": "/desafios/desafio1",
    "estudar-ou-descansar": "/desafios/CapitulosTecnologia",
    "fome": "/desafios/CapitulosEngenharia",
    "dia-ou-noite": "/desafios/CapitulosDireito",
  };

  const customTitles = {
    "estudar-ou-descansar": "Tecnologia",  
    "fome": "Engenharia Civil",                
    "dia-ou-noite": "Direito"    
  };

  

  const [activeCarouselIndex, setActiveCarouselIndex] = React.useState(0);

  const coursesData = [
    {
      id: 1,
      title: "Direito",
      image: "/di-art.jpg",
      topics: [
        "LEGISLAÇÃO",
        "JUSTIÇA",
        "DIREITOS & DEVERES",
        "ADVOCACIA",
        "CONSTITUIÇÃO",
        "PROCESSO",
        "JURISPRUDÊNCIA",
        "ÉTICA"
      ]
    },
    {
      id: 2,
      title: "Engenharia Civil",
      image: "/eng-art.jpg",
      topics: [
        "PROJETO ESTRUTURAL",
        "PLANEJAMENTO URBANO",
        "INFRAESTRUTURA",
        "GEOTECNIA E SOLOS",
        "PONTES E VIADUTOS",
        "CONSTITUIÇÃO",
        "PROCESSO",
        "FUNDAÇÕES"
      ]
    },
    {
      id: 3,
      title: "Tecnologia",
      image: "/tec-art.jpg",
      topics: [
        "PYTHON",
        "FRONT-END",
        "BACK-END",
        "ALGORITMOS",
        "DESENVOLVIMENTO",
        "BANCO DE DADOS",
        "CONCEITOS",
        "INTRODUÇÃO"
      ]
    },
    {
      id: 4,
      title: "Recursos Humanos",
      image: "/rh-art.jpg",
      topics: [
        "RECRUTAMENTO & SELEÇÃO",
        "TREINAMENTO & DESENVOLVIMENTO",
        "RELAÇÕES TRABALHISTAS",
        "CULTURA & ENGAJAMENTO",
        "FOLHA DE PAGAMENTO",
        "BENEFÍCIOS",
        "AVALIAÇÃO DE DESEMPENHO",
        "SEGURANÇA DO TRABALHO"
      ]
    },
    {
      id: 5,
      title: "Marketing Digital",
      image: "/marketing-art.jpg",
      topics: [
        "SEO & CONTEÚDO",
        "MÍDIAS SOCIAIS & ANÚNCIOS",
        "EMAIL MARKETING & AUTOMAÇÃO",
        "ANÁLISE & ESTRATÉGIA",
        "CRM & FERRAMENTAS",
        "CRM",
        "CONVERSÃO & VENDAS",
        "CONVERSÃO & VENDAS"
      ]
    }
  ];

  const featuredChallenges = challenges
    .filter((c) => c.slug !== "o-que-e-algoritmo")
    .slice(0, 6);

  const cardVideoStyle = {
    width: "100%",
    height: "140px",
    display: "block",
    objectFit: "fill",
    background: "#f0f6ff",
  };

  const algoVideoStyle = {
    width: "300px",
    height: "170px",
    borderRadius: 10,
    objectFit: "fill",
    border: "2px solid var(--primary-blue)",
    background: "#000",
    flexShrink: 0,
  };
 
  // Coloque o caminho das suas imagens aqui
  const slides = [
    {
      id: 1,
      image: '/tec-carro.jpg',

    },
    {
      id: 2,
      image: '/eng-carro.jpg',

    },
    {
      id: 3,
      image: '/di-carro.jpg',

    },
    {
      id: 4,
      image: '/rh-carro.jpg',
    },
    {
      id: 5,
      image: '/marketing-carro.jpg',

    }
  ];

  return (
    <motion.div
      className={styles.home}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* HERO */}
      <section className={styles.heroSection}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade" // Transição suave de esmaecimento
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className={styles.mySwiper}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.slideItem}>
            {/* Imagem de fundo */}
            <img src={slide.image} alt={slide.title} className={styles.carouselImage} />
            
            {/* Overlay para o texto aparecer sobre a imagem */}
            <div className={styles.overlay}>
              <motion.h1
                key={`title-${slide.id}`} // Key necessária para reiniciar animação
                className={styles.mainTitle}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {slide.title}
              </motion.h1>
              
              <motion.h2
                key={`sub-${slide.id}`}
                className={styles.subtitle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {slide.subtitle}
              </motion.h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>

      <div className="container">
        {/* SEÇÃO DE INTRODUÇÃO */}
        <motion.section
          className={styles.introductionSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.introductionContent}>
            <h2 className={styles.introductionTitle}>Bem-vindos à Jornada Multiprofissional Cyber Tech</h2>
            
            <p className={styles.introductionText}>
              Nesta plataforma, você não apenas aprenderá conceitos isolados, mas como as engrenagens do mercado atual se conectam. Prepare-se para dominar as competências essenciais que definem o profissional do futuro:
            </p>

            <div className={styles.introductionCards}>
              <div className={styles.introductionCard}>
                <h3>Engenharia Civil & Tecnologia</h3>
                <p>Entenda as bases da construção e infraestrutura integradas às inovações digitais e ferramentas que otimizam processos.</p>
              </div>
              
              <div className={styles.introductionCard}>
                <h3>Marketing Digital & RH</h3>
                <p>Aprenda a construir uma marca forte e a gerir o capital mais valioso de qualquer empresa: as pessoas.</p>
              </div>
              
              <div className={styles.introductionCard}>
                <h3>Direito & Ética</h3>
                <p>Navegue com segurança pelas normas jurídicas e regulamentações que regem os negócios e as relações de trabalho.</p>
              </div>
            </div>

            <p className={styles.conclusionText}>
              O objetivo é claro: transformar você em um líder versátil, capaz de entender desde a estrutura técnica até a gestão estratégica e humana de qualquer projeto.
            </p>
          </div>
        </motion.section>

        {/* CARROSSEL DE CURSOS COM TÓPICOS */}
        <motion.section
          className={styles.coursesCarouselSection}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className={styles.carouselContainer}>
            {/* Imagem do Carrossel */}
            <div className={styles.carouselImageWrapper}>
              <motion.img
                key={activeCarouselIndex}
                src={coursesData[activeCarouselIndex].image}
                alt={coursesData[activeCarouselIndex].title}
                className={styles.coursesImage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Botões de navegação */}
              <button
                className={styles.carouselBtn + " " + styles.prevBtn}
                onClick={() => setActiveCarouselIndex((prev) => (prev - 1 + coursesData.length) % coursesData.length)}
                aria-label="Slide anterior"
              >
                ❮
              </button>
              <button
                className={styles.carouselBtn + " " + styles.nextBtn}
                onClick={() => setActiveCarouselIndex((prev) => (prev + 1) % coursesData.length)}
                aria-label="Próximo slide"
              >
                ❯
              </button>
            </div>

            {/* Tópicos do Curso */}
            <div className={styles.topicsWrapper}>
              <motion.h3
                key={`title-${activeCarouselIndex}`}
                className={styles.courseTitle}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {coursesData[activeCarouselIndex].title}
              </motion.h3>

              <motion.div
                key={`topics-${activeCarouselIndex}`}
                className={styles.topicsList}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, staggerChildren: 0.05 }}
              >
                {coursesData[activeCarouselIndex].topics.map((topic, index) => (
                  <motion.div
                    key={index}
                    className={styles.topicItem}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {topic}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* LISTA DE CARDS */}
        <motion.section
          className={styles.challengesSection}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2>Cursos</h2>
          <p>Escolha a sua área de estudos.</p>

          <div className={styles.challengeCardsList}>
            {featuredChallenges.map((challenge) => {
              const imageSrc = imageMap[challenge.slug];
              const linkRoute = slugToRoute[challenge.slug] || "/desafios";

              // Busca o título customizado ou usa o original
              const tituloExibido = customTitles[challenge.slug] || challenge.title;

              return (
                <motion.div
                  key={challenge.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260 }}
                >
                  <Link
                    to={linkRoute}
                    className={styles.challengeCard}
                  >
                    <img
                      src={imageSrc}
                      alt={challenge.title}
                      className={styles.challengeCardIcon}
                      style={{ width: "100%", height: 140, objectFit: "cover" }}
                    />

                    {/* Exibe o título customizado */}
                    <p>{tituloExibido}</p>
                  </Link>
                </motion.div>
                
              );
            })}
          </div>
        </motion.section>
      </div>
    </motion.div>
    
  );
}

export default Home;