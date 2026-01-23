import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Admin.module.css";

// Firebase
import { db } from "../../../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function NewDesafios() {
    // Configurações Gerais e Capa
    const [titulo, setTitulo] = useState("");
    const [area, setArea] = useState(""); // TI, Engenharia, Direito
    const [capa, setCapa] = useState(""); 
    const [tentativas, setTentativas] = useState(1);

    // Conteúdo do Exercício (Texto e Imagem via Link)
    const [perguntaTexto, setPerguntaTexto] = useState("");
    const [perguntaImagem, setPerguntaImagem] = useState("");

    // Alternativas A-D (Texto e Imagem via Link)
    const [alternativas, setAlternativas] = useState({
        a: { texto: "", imagem: "" },
        b: { texto: "", imagem: "" },
        c: { texto: "", imagem: "" },
        d: { texto: "", imagem: "" }
    });
    const [alternativaCorreta, setAlternativaCorreta] = useState("");

    const [loading, setLoading] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    const handleAltChange = (letra, campo, valor) => {
        setAlternativas(prev => ({
            ...prev,
            [letra]: { ...prev[letra], [campo]: valor }
        }));
    };

    const salvarDesafio = async () => {
        if (!titulo || !area || !alternativaCorreta || (!perguntaTexto && !perguntaImagem)) {
            alert("Preencha os campos obrigatórios: Título, Área, Enunciado e Alternativa Correta.");
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "desafios"), {
                titulo,
                area,
                imagemCapa: capa,
                tentativasPermitidas: Number(tentativas),
                enunciado: {
                    texto: perguntaTexto,
                    imagem: perguntaImagem
                },
                alternativas,
                alternativaCorreta, // Salva 'a', 'b', 'c' ou 'd'
                dataCriacao: new Date().toISOString()
            });

            alert("Desafio publicado com sucesso!");

            // Limpa o formulário para o próximo dos 5 exercícios
            setTitulo(""); setCapa(""); setArea("");
            setPerguntaTexto(""); setPerguntaImagem("");
            setAlternativas({
                a: { texto: "", imagem: "" }, b: { texto: "", imagem: "" },
                c: { texto: "", imagem: "" }, d: { texto: "", imagem: "" }
            });
            setAlternativaCorreta("");

        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao publicar no Firebase.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ""}`}>
                <button className={styles.toggleBtn} onClick={() => setCollapsed(!collapsed)}>
                    <img src="/menu.png" alt="menu" />
                </button>
                <h2 className={styles.title}>Admin Academy</h2>
                <ul className={styles.navList}>
                    <li><Link to="/admin" className={styles.navLink}><img src="/casa.png" alt="Home" /><span className={styles.linkText}>Home</span></Link></li>
                    <li><Link to="/admin/newdesafios" className={styles.navLink}><img src="/desafio.png" alt="Novo" /><span className={styles.linkText}>Novo Desafio</span></Link></li>
                </ul>
            </aside>

            <main className={styles.main}>
                <div className={styles.headerFlex}>
                    <h1>Cadastrar Exercício (Multimídia)</h1>
                    <button className={styles.publishBtn} onClick={salvarDesafio} disabled={loading}>
                        {loading ? "Publicando..." : "Publicar"}
                    </button>
                </div>

                <div className={styles.editorContainer}>
                    <div className={styles.formColumn}>
                        
                        {/* SEÇÃO 1: CAPA E ÁREA */}
                        <div className={styles.metaBox}>
                            <h3>1. Identificação e Capa</h3>
                            <input className={styles.inputField} placeholder="Título do Desafio" value={titulo} onChange={e => setTitulo(e.target.value)} />
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <select className={styles.inputField} value={area} onChange={e => setArea(e.target.value)} style={{ flex: 1 }}>
                                    <option value="">Área...</option>
                                    <option value="TI">TI</option>
                                    <option value="Engenharia">Engenharia</option>
                                    <option value="Direito">Direito</option>
                                </select>
                                <input className={styles.inputField} type="number" value={tentativas} onChange={e => setTentativas(e.target.value)} style={{ width: '80px' }} title="Tentativas" />
                            </div>
                            <input className={styles.inputField} style={{ marginTop: '10px' }} placeholder="Link da Imagem de Capa (URL)" value={capa} onChange={e => setCapa(e.target.value)} />
                        </div>

                        {/* SEÇÃO 2: ENUNCIADO */}
                        <div className={styles.metaBox} style={{ marginTop: '20px' }}>
                            <h3>2. Enunciado</h3>
                            <textarea className={styles.textAreaBlock} placeholder="Texto da pergunta..." value={perguntaTexto} onChange={e => setPerguntaTexto(e.target.value)} />
                            <input className={styles.inputField} style={{ marginTop: '10px' }} placeholder="Link da Imagem do Enunciado (Opcional)" value={perguntaImagem} onChange={e => setPerguntaImagem(e.target.value)} />
                        </div>

                        {/* SEÇÃO 3: ALTERNATIVAS */}
                        <div className={styles.metaBox} style={{ marginTop: '20px' }}>
                            <h3>3. Alternativas (Selecione a Correta)</h3>
                            {['a', 'b', 'c', 'd'].map((letra) => (
                                <div key={letra} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                        <input type="radio" name="correta" checked={alternativaCorreta === letra} onChange={() => setAlternativaCorreta(letra)} />
                                        <label style={{ fontWeight: 'bold' }}>Opção {letra.toUpperCase()}</label>
                                    </div>
                                    <input 
                                        className={styles.inputField} 
                                        placeholder="Texto da resposta" 
                                        value={alternativas[letra].texto} 
                                        onChange={e => handleAltChange(letra, 'texto', e.target.value)} 
                                    />
                                    <input 
                                        className={styles.inputField} 
                                        style={{ marginTop: '5px', fontSize: '0.8rem' }} 
                                        placeholder="Link da Imagem da resposta (Opcional)" 
                                        value={alternativas[letra].imagem} 
                                        onChange={e => handleAltChange(letra, 'imagem', e.target.value)} 
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}