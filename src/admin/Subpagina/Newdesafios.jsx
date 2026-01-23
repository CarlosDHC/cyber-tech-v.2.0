import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Admin.module.css";

// Firebase
import { db } from "../../../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function NewDesafios() {
    const [loading, setLoading] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    const [tituloGeral, setTituloGeral] = useState("");
    const [area, setArea] = useState("");
    const [capa, setCapa] = useState("");
    const [tentativas, setTentativas] = useState(1);

    const [exercicios, setExercicios] = useState(
        Array(6).fill(null).map(() => ({
            perguntaTexto: "",
            perguntaImagem: "",
            alternativaCorreta: "",
            alternativas: {
                a: { texto: "", imagem: "" },
                b: { texto: "", imagem: "" },
                c: { texto: "", imagem: "" },
                d: { texto: "", imagem: "" }
            }
        }))
    );

    const handleQuestaoChange = (index, campo, valor) => {
        const novosExercicios = [...exercicios];
        novosExercicios[index] = { ...novosExercicios[index], [campo]: valor };
        setExercicios(novosExercicios);
    };

    const handleAltChange = (exIndex, letra, campo, valor) => {
        const novosExercicios = [...exercicios];
        novosExercicios[exIndex].alternativas[letra] = { 
            ...novosExercicios[exIndex].alternativas[letra], 
            [campo]: valor 
        };
        setExercicios(novosExercicios);
    };

    const salvarDesafios = async () => {
        if (!tituloGeral || !area) {
            alert("Por favor, preencha o Título Geral e a Área do Desafio.");
            return;
        }
        setLoading(true);
        try {
            await addDoc(collection(db, "desafios"), {
                titulo: tituloGeral,
                area,
                imagemCapa: capa,
                tentativasPermitidas: Number(tentativas),
                questoes: exercicios,
                dataCriacao: new Date().toISOString()
            });
            alert("Bloco de 6 desafios publicado com sucesso!");
            window.location.reload(); 
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao publicar.");
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
                    <li><Link to="/admin" className={styles.navLink}><img src="/casa.png" alt="H" /><span className={styles.linkText}>Home</span></Link></li>
                    <li><Link to="/admin/newblog" className={styles.navLink}><img src="/blog.png" alt="B" /><span className={styles.linkText}>Blog</span></Link></li>
                    <li><Link to="/admin/newdesafios" className={styles.navLink}><img src="/desafio.png" alt="D" /><span className={styles.linkText}>Desafios</span></Link></li>
                </ul>
            </aside>

            <main className={styles.main}>
                <div className={styles.headerFlex}>
                    <h1>Cadastrar Bloco de Desafios</h1>
                    <button className={styles.publishBtn} onClick={salvarDesafios} disabled={loading}>
                        {loading ? "Publicando..." : "Publicar Bloco"}
                    </button>
                </div>

                <div className={styles.editorContainer}>
                    <div className={styles.formColumn}>
                        <div className={styles.metaBox}>
                            <h3>1. Configurações do Bloco (Capa e Área)</h3>
                            <div className={styles.inputGroup}>
                                <label className={styles.fieldLabel}>Título do Bloco</label>
                                <input className={styles.inputField} placeholder="Ex: Algoritmos Nível 1" value={tituloGeral} onChange={e => setTituloGeral(e.target.value)} />
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div className={styles.inputGroup} style={{ flex: 1 }}>
                                    <label className={styles.fieldLabel}>Área</label>
                                    <select className={styles.inputField} value={area} onChange={e => setArea(e.target.value)}>
                                        <option value="">Selecionar...</option>
                                        <option value="Tecnologia">Tecnologia</option>
                                        <option value="EngenhariaCivil">Engenharia Civil</option>
                                        <option value="DireitoCivil">Direito Civil</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup} style={{ width: '120px' }}>
                                    <label className={styles.fieldLabel}>Tentativas</label>
                                    <input className={styles.inputField} type="number" min="1" value={tentativas} onChange={e => setTentativas(e.target.value)} />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.fieldLabel}>Link da Capa do Bloco</label>
                                <input className={styles.inputField} placeholder="URL da imagem..." value={capa} onChange={e => setCapa(e.target.value)} />
                                {capa && (
                                    <img src={capa} alt="Preview Capa" style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '8px', border: '1px solid #ddd' }} onError={(e) => e.target.style.display = 'none'} />
                                )}
                            </div>
                        </div>

                        <hr className={styles.divider} />

                        <div className={styles.blocksList}>
                            {exercicios.map((ex, index) => (
                                <div key={index} className={styles.blockItem}>
                                    <div className={styles.blockHeader}>
                                        <span className={styles.blockLabel}>QUESTÃO {index + 1}</span>
                                    </div>
                                    
                                    <div className={styles.inputGroup}>
                                        <label className={styles.fieldLabel}>Enunciado</label>
                                        <textarea className={styles.textAreaBlock} placeholder="Texto da pergunta..." value={ex.perguntaTexto} onChange={e => handleQuestaoChange(index, 'perguntaTexto', e.target.value)} />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.fieldLabel}>Link da Imagem da Questão (Opcional)</label>
                                        <input className={styles.inputField} value={ex.perguntaImagem} onChange={e => handleQuestaoChange(index, 'perguntaImagem', e.target.value)} />
                                        {ex.perguntaImagem && (
                                            <img src={ex.perguntaImagem} alt="Preview Questão" style={{ maxWidth: '150px', marginTop: '10px', borderRadius: '4px' }} onError={(e) => e.target.style.display = 'none'} />
                                        )}
                                    </div>

                                    <div className={styles.alternativasGrid} style={{ marginTop: '20px' }}>
                                        <label className={styles.fieldLabel}>Alternativas (Marque a Correta)</label>
                                        {/* Mapeando apenas de A até D */}
                                        {['a', 'b', 'c', 'd'].map((letra) => (
                                            <div key={letra} className={styles.alternativaItem}>
                                                <div className={styles.altRadioHeader}>
                                                    <input type="radio" name={`correta-${index}`} checked={ex.alternativaCorreta === letra} onChange={() => handleQuestaoChange(index, 'alternativaCorreta', letra)} />
                                                    <span>Opção {letra.toUpperCase()}</span>
                                                </div>
                                                <input className={styles.inputBlock} placeholder="Texto da resposta" value={ex.alternativas[letra].texto} onChange={e => handleAltChange(index, letra, 'texto', e.target.value)} style={{marginBottom: '5px'}} />
                                                <input className={styles.inputBlock} placeholder="Link da imagem (opcional)" value={ex.alternativas[letra].imagem} onChange={e => handleAltChange(index, letra, 'imagem', e.target.value)} style={{fontSize: '0.8rem'}} />
                                                {ex.alternativas[letra].imagem && (
                                                    <img src={ex.alternativas[letra].imagem} alt={`Preview ${letra}`} style={{ maxWidth: '80px', marginTop: '5px', borderRadius: '4px' }} onError={(e) => e.target.style.display = 'none'} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}