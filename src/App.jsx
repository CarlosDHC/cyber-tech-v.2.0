import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import './styles/globals.css';

// Layout
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Scroll Reset
import ScrollToTop from "./components/ScrollToTop.jsx";

// Páginas Principais
import Home from './pages/Home/Home.jsx';
import Blog from './pages/Blog/Blog.jsx';
import ChallengeList from './pages/ChallengeList/ChallengeList.jsx';
import Forum from './pages/Forum/Forum.jsx';

// Blognpm
import Algoritmo from "./pages/Blog/Algoritmo";
import Variavel from "./pages/Blog/Variavel.jsx";
import Condicionais from "./pages/Blog/Condicionais.jsx";
import Funcoes from "./pages/Blog/Funcoes.jsx";
import Operacao from "./pages/Blog/Operacao.jsx";
import Tipo from "./pages/Blog/Tipo.jsx"
import Tecnologia from "./pages/Blog/Tecnologia.jsx"
import Engenharia from "./pages/Blog/Engenharia.jsx"
import Direito from "./pages/Blog/Direito.jsx"

const PostDinamico = React.lazy(() => import("./pages/Blog/PostDinamico"));

// Autenticação
import Login from './pages/Login/Login.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import EsqueciSenha from './pages/EsqueciSenha/EsqueciSenha.jsx';
import EsqueciSenhaPerfil from './pages/EsqueciSenha/EsqueciSenhaPerfil.jsx'; // <--- IMPORT NOVO
import Perfil from './pages/Perfil/Perfil.jsx';

// Admin
import Admin from './admin/Admin.jsx';
import Newblog from './admin/Subpagina/Newblog.jsx';
import Comentarios from './admin/Subpagina/Curtidas.jsx';
import Newdesafios from './admin/Subpagina/Newdesafios.jsx';
import Notas from './admin/Subpagina/Notas.jsx';

// Rotas protegidas
import ProtectedRoute from './context/ProtectedRoute.jsx';
import ProtectedAdminRoute from './context/ProtectedAdminRoute.jsx';
// Capitulos 
import CapitulosTecnologia from './pages/Desafios/CapitulosTecnologia.jsx';
import CapitulosDireito from './pages/Desafios/CapitulosDireito.jsx';
import CapitulosEngenharia from './pages/Desafios/CapitulosEngenharia.jsx';
import CapitulosMarketing from './pages/Desafios/CapitulosMarketing.jsx';
import CapitulosRh from './pages/Desafios/CapitulosRh.jsx';

// Desafios tecnologia 
import DesafioTec1 from './pages/Desafios/Tecnologia/DesafioTec1.jsx';
import DesafioTec2 from './pages/Desafios/Tecnologia/DesafioTec2.jsx';
import DesafioTec3 from './pages/Desafios/Tecnologia/DesafioTec3.jsx';
import DesafioTec4 from './pages/Desafios/Tecnologia/DesafioTec4.jsx';

// Desafios engenharia
import DesafioEng1 from './pages/Desafios/Engenharia/DesafioEng1.jsx';
import DesafioEng2 from './pages/Desafios/Engenharia/DesafioEng2.jsx';
import DesafioEng3 from './pages/Desafios/Engenharia/DesafioEng3.jsx';
import DesafioEng4 from './pages/Desafios/Engenharia/DesafioEng4.jsx';

// Desafios direito 
import DesafioDir1 from './pages/Desafios/Direito/DesafioDir1.jsx';
import DesafioDir2 from './pages/Desafios/Direito/DesafioDir2.jsx';
import DesafioDir3 from './pages/Desafios/Direito/DesafioDir3.jsx';
import DesafioDir4 from './pages/Desafios/Direito//DesafioDir4.jsx';

// Desafios Marketing
import DesafioMar1 from './pages/Desafios/Marketing/DesafioMar1.jsx';
import DesafioMar2 from './pages/Desafios/Marketing/DesafioMar2.jsx';
import DesafioMar3 from './pages/Desafios/Marketing/DesafioMar3.jsx';
import DesafioMar4 from './pages/Desafios/Marketing/DesafioMar4.jsx';

// Desafios Rh
import DesafioRh1 from './pages/Desafios/Rh/DesafioRh1.jsx';
import DesafioRh2 from './pages/Desafios/Rh/DesafioRh2.jsx';
import DesafioRh3 from './pages/Desafios/Rh/DesafioRh3.jsx';
import DesafioRh4 from './pages/Desafios/Rh/DesafioRh4.jsx';

// Novas páginas
import Sobre from './pages/Sobre/Sobre.jsx';
import Privacidade from './pages/Privacidade/Privacidade.jsx';

function App() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.45, ease: "easeOut" },
  };

  const AnimatedPage = ({ children }) => (
    <motion.div {...pageVariants}>
      {children}
    </motion.div>
  );

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-layout">
      <Header />

      <ScrollToTop />

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            {/* --- Rotas Públicas --- */}
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
            <Route path="/cadastro" element={<AnimatedPage><Cadastro /></AnimatedPage>} />
            <Route path="/esqueci-minha-senha" element={<AnimatedPage><EsqueciSenha /></AnimatedPage>} />

            <Route path="/sobre" element={<AnimatedPage><Sobre /></AnimatedPage>} />
            <Route path="/privacidade" element={<AnimatedPage><Privacidade /></AnimatedPage>} />

            {/* --- Rotas Protegidas --- */}
            <Route path="/blog" element={<ProtectedRoute><AnimatedPage><Blog /></AnimatedPage></ProtectedRoute>} />
            <Route path="/algoritmo" element={<ProtectedRoute><AnimatedPage><Algoritmo /></AnimatedPage></ProtectedRoute>} />
            <Route path="/variavel" element={<ProtectedRoute><AnimatedPage><Variavel /></AnimatedPage></ProtectedRoute>} />
            <Route path="/condicionais" element={<ProtectedRoute><AnimatedPage><Condicionais /></AnimatedPage></ProtectedRoute>} />
            <Route path="/funcoes" element={<ProtectedRoute><AnimatedPage><Funcoes /></AnimatedPage></ProtectedRoute>} />
            <Route path="/operacao" element={<ProtectedRoute><AnimatedPage><Operacao /></AnimatedPage></ProtectedRoute>} />
            <Route path="/tipo" element={<ProtectedRoute><AnimatedPage><Tipo /></AnimatedPage></ProtectedRoute>} />
            <Route path="/tecnologia" element={<ProtectedRoute><AnimatedPage><Tecnologia /></AnimatedPage></ProtectedRoute>} />
            <Route path="/engenharia" element={<ProtectedRoute><AnimatedPage><Engenharia /></AnimatedPage></ProtectedRoute>} />
            <Route path="/direito" element={<ProtectedRoute><AnimatedPage><Direito /></AnimatedPage></ProtectedRoute>} />
            <Route path="/blog/post/:id" element={
              <ProtectedRoute><AnimatedPage><PostDinamico /></AnimatedPage></ProtectedRoute>
            } />
            {/* --- Rotas Capitulos --- */}
            <Route path="/desafios/capitulostecnologia" element={<ProtectedRoute><AnimatedPage><CapitulosTecnologia /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/capitulosengenharia" element={<ProtectedRoute><AnimatedPage><CapitulosEngenharia /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/capitulosdireito" element={<ProtectedRoute><AnimatedPage><CapitulosDireito /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/capitulosmarketing" element={<ProtectedRoute><AnimatedPage><CapitulosMarketing /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/capitulosrh" element={<ProtectedRoute><AnimatedPage><CapitulosRh /></AnimatedPage></ProtectedRoute>} />

            {/* --- Rotas Tecnologia --- */}
            <Route path="/desafios" element={<ProtectedRoute><AnimatedPage><ChallengeList /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/tecnologia/desafiotec1" element={<ProtectedRoute><AnimatedPage><DesafioTec1 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/tecnologia/desafiotec2" element={<ProtectedRoute><AnimatedPage><DesafioTec2 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/tecnologia/desafiotec3" element={<ProtectedRoute><AnimatedPage><DesafioTec3 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/tecnologia/desafiotec4" element={<ProtectedRoute><AnimatedPage><DesafioTec4 /></AnimatedPage></ProtectedRoute>} />

            {/* --- Rotas Engenharia --- */}
            <Route path="/desafios" element={<ProtectedRoute><AnimatedPage><ChallengeList /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/engenharia/desafioeng1" element={<ProtectedRoute><AnimatedPage><DesafioEng1 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/engenharia/desafioeng2" element={<ProtectedRoute><AnimatedPage><DesafioEng2 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/engenharia/desafioeng3" element={<ProtectedRoute><AnimatedPage><DesafioEng3 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/engenharia/desafioeng4" element={<ProtectedRoute><AnimatedPage><DesafioEng4 /></AnimatedPage></ProtectedRoute>} />

            {/* --- Rotas Direito --- */}
            <Route path="/desafios" element={<ProtectedRoute><AnimatedPage><ChallengeList /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/direito/desafiodir1" element={<ProtectedRoute><AnimatedPage><DesafioDir1 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/direito/desafiodir2" element={<ProtectedRoute><AnimatedPage><DesafioDir2 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/direito/desafiodir3" element={<ProtectedRoute><AnimatedPage><DesafioDir3 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/direito/desafiodir4" element={<ProtectedRoute><AnimatedPage><DesafioDir4 /></AnimatedPage></ProtectedRoute>} />
            {/* --- Rotas Direito --- */}
            <Route path="/desafios/marketing/desafiomar1" element={<ProtectedRoute><AnimatedPage><DesafioMar1 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/marketing/desafiomar2" element={<ProtectedRoute><AnimatedPage><DesafioMar2 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/marketing/desafiomar3" element={<ProtectedRoute><AnimatedPage><DesafioMar3 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/marketing/desafiomar4" element={<ProtectedRoute><AnimatedPage><DesafioMar4 /></AnimatedPage></ProtectedRoute>} />
            {/* --- Rotas Direito --- */}
            <Route path="/desafios/rh/desafiorh1" element={<ProtectedRoute><AnimatedPage><DesafioRh1 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/rh/desafiorh2" element={<ProtectedRoute><AnimatedPage><DesafioRh2 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/rh/desafiorh3" element={<ProtectedRoute><AnimatedPage><DesafioRh3 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/rh/desafiorh4" element={<ProtectedRoute><AnimatedPage><DesafioRh4 /></AnimatedPage></ProtectedRoute>} />


            <Route path="/perfil" element={<ProtectedRoute><AnimatedPage><Perfil /></AnimatedPage></ProtectedRoute>} />
            <Route path="/forum" element={
              <ProtectedRoute>
                <AnimatedPage>
                  <Forum />
                </AnimatedPage>
              </ProtectedRoute>
            } />
            {/* --- NOVA ROTA ADICIONADA --- */}
            <Route path="/alterar-senha" element={
              <ProtectedRoute>
                <AnimatedPage>
                  <EsqueciSenhaPerfil />
                </AnimatedPage>
              </ProtectedRoute>
            } />

            {/* --- Rotas Admin --- */}
            <Route path="/admin" element={<ProtectedAdminRoute><AnimatedPage><Admin /></AnimatedPage></ProtectedAdminRoute>} />
            <Route path="/admin/newblog" element={<ProtectedAdminRoute><AnimatedPage><Newblog /></AnimatedPage></ProtectedAdminRoute>} />
            <Route path="/admin/curtidas" element={<ProtectedAdminRoute><AnimatedPage><Comentarios /></AnimatedPage></ProtectedAdminRoute>} />
            <Route path="/admin/newdesafios" element={<ProtectedAdminRoute><AnimatedPage><Newdesafios/></AnimatedPage></ProtectedAdminRoute>} />
            <Route path="/admin/notas" element={<ProtectedAdminRoute><AnimatedPage><Notas /></AnimatedPage></ProtectedAdminRoute>} />

          </Routes>
        </AnimatePresence>
      </main>

      <main className={isAdminRoute ? 'admin-main' : 'public-main'}>
        {/* Este bloco main extra parece redundante se você já tem o main acima com as rotas, 
             mas mantive conforme seu arquivo original para não quebrar layout */}
      </main>

      <Footer />
    </div>
  );
}

export default App;