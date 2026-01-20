import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Admin.module.css";

// Firebase
import { db } from "../../../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function NewDesafios() {
    // Dados de Identificação e Capa
    const [titulo, setTitulo] = useState("");
    const [resumo, setResumo] = useState("");
    const [capa, setCapa] = useState(""); // Link da imagem do card/capa
    const [area, setArea] = useState(""); // Direito, Engenharia, TI
    const [tentativas, setTentativas] = useState(1);

    // Conteúdo do Desafio (Texto e Imagem)
    const [perguntaTexto, setPerguntaTexto] = useState("");
    const [perguntaImagem, setPerguntaImagem] = useState(""); // Link da imagem do enunciado

    // Alternativas (Texto e Imagem)
    const [alternativas, setAlternativas] = useState({
        a: { texto: "", imagem: "" },
        b: { texto: "", imagem: "" },
        c: { texto: "", imagem: "" },
        d: { texto: "", imagem: "" }
    });
    const [alternativaCorreta, setAlternativaCorreta] = useState("");

    const [loading, setLoading] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    // Funções de manipulação
    const handleAlternativaChange = (letra, campo, valor) => {
        setAlternativas(prev => ({
            ...prev,
            [letra]: { ...prev[letra], [campo]: valor }
        }));
    };

    async function salvarDesafio() {
        if (!titulo || !area || !alternativaCorreta || (!perguntaTexto && !perguntaImagem)) {
            alert("Preencha os campos obrigatórios: Título, Área, Enunciado e Alternativa Correta.");
            return;
        }

        setLoading(true);

        try {
            await addDoc(collection(db, "desafios"), {
                titulo,
                resumo,
                imagemCapa: capa,
                area,
                tentativasPermitidas: Number(tentativas),
                enunciado: {
                    texto: perguntaTexto,
                    imagem: perguntaImagem
                },
                alternativas,
                alternativaCorreta,
                dataCriacao: new Date().toISOString()
            });

            alert("Desafio com imagens publicado!");
            
            // Limpar formulário
            setTitulo(""); setResumo(""); setCapa(""); setArea("");
            setPerguntaTexto(""); setPerguntaImagem("");
            setAlternativas({
                a: { texto: "", imagem: "" }, b: { texto: "", imagem: "" },
                c: { texto: "", imagem: "" }, d: { texto: "", imagem: "" }
            });
            setAlternativaCorreta("");

        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao salvar.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ""}`}>
                <button className={styles.toggleBtn} onClick={() => setCollapsed(!collapsed)}>
                    <img src="/menu.png" alt="menu" />
                </button>
                <h2 className={styles.title}>Painel Admin</h2>
                <ul className={styles.navList}>
                    <li><Link to="/admin" className={styles.navLink}><img src="/casa.png" alt="" /><span className={styles.linkText}>Home</span></Link></li>
                    <li><Link to="/admin/newdesafios" className={`${styles.navLink} ${styles.active}`}><img src="/desafio.png" alt="" /><span className={styles.linkText}>Desafios</span></Link></li>
                </ul>
            </aside>

            <main className={styles.main}>
                <div className={styles.headerFlex}>
                    <h1>Novo Desafio (Multimídia)</h1>
                    <button className={styles.publishBtn} onClick={salvarDesafio} disabled={loading}>
                        {loading ? "Publicando..." : "Publicar"}
                    </button>
                </div>

                <div className={styles.editorContainer}>
                    <div className={styles.formColumn}>
                        
                        {/* SEÇÃO 1: CABEÇALHO */}
                        <div className={styles.metaBox}>
                            <h3>Configurações e Capa</h3>
                            <div className={styles.inputGroup}>
                                <label className={styles.fieldLabel}>Título</label>
                                <input className={styles.inputField} value={titulo} onChange={e => setTitulo(e.target.value)} />
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <label className={styles.fieldLabel}>Área</label>
                                    <select className={styles.inputField} value={area} onChange={e => setArea(e.target.value)}>
                                        <option value="">Selecione...</option>
                                        <option value="Direito">Direito</option>
                                        <option value="Engenharia">Engenharia</option>
                                        <option value="TI">TI</option>
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label className={styles.fieldLabel}>Tentativas</label>
                                    <input className={styles.inputField} type="number" value={tentativas} onChange={e => setTentativas(e.target.value)} />
                                </div>
                            </div>
                            <div className={styles.inputGroup} style={{ marginTop: '10px' }}>
                                <label className={styles.fieldLabel}>Link da Imagem de Capa</label>
                                <input className={styles.inputField} value={capa} onChange={e => setCapa(e.target.value)} placeholder="URL da imagem principal" />
                            </div>
                        </div>

                        {/* SEÇÃO 2: O DESAFIO */}
                        <div className={styles.metaBox} style={{ marginTop: '20px' }}>
                            <h3>Enunciado do Desafio</h3>
                            <textarea className={styles.textAreaBlock} placeholder="Texto do enunciado..." value={perguntaTexto} onChange={e => setPerguntaTexto(e.target.value)} />
                            <input className={styles.inputField} style={{ marginTop: '10px' }} placeholder="Link da Imagem do Desafio (Opcional)" value={perguntaImagem} onChange={e => setPerguntaImagem(e.target.value)} />
                        </div>

                        {/* SEÇÃO 3: ALTERNATIVAS */}
                        <div className={styles.metaBox} style={{ marginTop: '20px' }}>
                            <h3>Alternativas (Texto e Link de Imagem)</h3>
                            {['a', 'b', 'c', 'd'].map((letra) => (
                                <div key={letra} style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                                        <input type="radio" name="correta" checked={alternativaCorreta === letra} onChange={() => setAlternativaCorreta(letra)} />
                                        <label className={styles.fieldLabel}>Alternativa {letra.toUpperCase()}</label>
                                    </div>
                                    <input 
                                        className={styles.inputField} 
                                        placeholder="Texto da alternativa" 
                                        value={alternativas[letra].texto} 
                                        onChange={e => handleAlternativaChange(letra, 'texto', e.target.value)} 
                                    />
                                    <input 
                                        className={styles.inputField} 
                                        style={{ marginTop: '5px', fontSize: '0.85rem' }} 
                                        placeholder="URL da Imagem para esta resposta" 
                                        value={alternativas[letra].imagem} 
                                        onChange={e => handleAlternativaChange(letra, 'imagem', e.target.value)} 
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