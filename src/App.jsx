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

// Blog
import Algoritmo from "./pages/Blog/Algoritmo";
import Variavel from "./pages/Blog/Variavel.jsx";
import Condicionais from "./pages/Blog/Condicionais.jsx";
import Funcoes from "./pages/Blog/Funcoes.jsx";
import Operacao from "./pages/Blog/Operacao.jsx";
import Tipo from "./pages/Blog/Tipo.jsx"
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

// Desafios
import Desafio1 from './pages/Desafios/Desafio1.jsx';
import Desafio2 from './pages/Desafios/Desafio2.jsx';
import Desafio3 from './pages/Desafios/Desafio3.jsx';
import Desafio4 from './pages/Desafios/Desafio4.jsx';

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

            <Route path="/blog/post/:id" element={
              <ProtectedRoute><AnimatedPage><PostDinamico /></AnimatedPage></ProtectedRoute>
            } />

            <Route path="/desafios" element={<ProtectedRoute><AnimatedPage><ChallengeList /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/desafio1" element={<ProtectedRoute><AnimatedPage><Desafio1 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/desafio2" element={<ProtectedRoute><AnimatedPage><Desafio2 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/desafio3" element={<ProtectedRoute><AnimatedPage><Desafio3 /></AnimatedPage></ProtectedRoute>} />
            <Route path="/desafios/desafio4" element={<ProtectedRoute><AnimatedPage><Desafio4 /></AnimatedPage></ProtectedRoute>} />

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