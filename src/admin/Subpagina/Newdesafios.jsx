import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../Admin.module.css";

// Firebase
import { db } from "../../../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// --- CONFIGURAÇÃO DAS SUBCATEGORIAS FIXAS (CAPÍTULOS) ---
const OPCOES_POR_AREA = {
  "Tecnologia": ["Lógica de Programação", "Estrutura de Dados", "Front-end (HTML/CSS)", "JavaScript Avançado", "React.js", "Banco de Dados"],
  "Engenharia": ["Física Mecânica", "Cálculo Estrutural", "Hidráulica", "Resistência dos Materiais", "Gestão de Obras"],
  "Direito": ["Direito Civil", "Direito Penal", "Direito Constitucional", "Direito Trabalhista", "Direito Digital"],
  "Marketing": ["Fundamentos de Marketing", "Marketing Digital", "SEO e Tráfego", "Branding", "Copywriting"],
  "Rh": ["Gestão de Pessoas", "Recrutamento e Seleção", "Treinamento", "Cultura Organizacional", "Liderança"]
};

export default function NewDesafios() {
    const [loading, setLoading] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    // Metadados do Desafio
    const [tituloGeral, setTituloGeral] = useState("");
    const [capa, setCapa] = useState("");
    const [tentativas, setTentativas] = useState(1);
    
    // Seleção de Área e Subcategoria
    const [area, setArea] = useState("Tecnologia");
    const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState("");

    // Estrutura das 6 Questões
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

    // Reseta subcategoria se mudar a área (para evitar inconsistência)
    useEffect(() => {
        setSubcategoriaSelecionada("");
    }, [area]);

    // Atualiza dados de uma questão específica
    const handleQuestaoChange = (index, campo, valor) => {
        const novosExercicios = [...exercicios];
        novosExercicios[index] = { ...novosExercicios[index], [campo]: valor };
        setExercicios(novosExercicios);
    };

    // Atualiza dados de uma alternativa específica (Texto ou Imagem)
    const handleAltChange = (exIndex, letra, campo, valor) => {
        const novosExercicios = [...exercicios];
        novosExercicios[exIndex].alternativas[letra] = { 
            ...novosExercicios[exIndex].alternativas[letra], 
            [campo]: valor 
        };
        setExercicios(novosExercicios);
    };

    const salvarDesafios = async () => {
        // Validação: Garante que selecionou uma subcategoria da lista
        if (!tituloGeral || !area || !subcategoriaSelecionada) {
            alert("Preencha o Título, Área e Subcategoria.");
            return;
        }

        // Validação básica: Verificar se pelo menos a Questão 1 tem enunciado e resposta certa
        if (!exercicios[0].perguntaTexto || !exercicios[0].alternativaCorreta) {
            alert("Pelo menos a Questão 1 precisa estar completa.");
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "desafios"), {
                titulo: tituloGeral,
                area,
                subcategoria: subcategoriaSelecionada, // Usa diretamente a opção escolhida
                imagemCapa: capa || "https://placehold.co/600x400?text=Quiz",
                tentativasPermitidas: Number(tentativas),
                tipo: "quiz", // Marcador para saber que é múltipla escolha
                questoes: exercicios,
                dataCriacao: new Date().toISOString()
            });
            alert("Bloco de desafios publicado com sucesso!");
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
                    <h1>Criar Quiz de 6 Questões</h1>
                    <button className={styles.publishBtn} onClick={salvarDesafios} disabled={loading}>
                        {loading ? "Publicando..." : "Publicar Bloco"}
                    </button>
                </div>

                <div className={styles.editorContainer}>
                    <div className={styles.formColumn}>
                        
                        {/* --- BLOCO 1: CONFIGURAÇÕES GERAIS --- */}
                        <div className={styles.metaBox}>
                            <h3>1. Configurações do Bloco</h3>
                            <div className={styles.inputGroup}>
                                <label className={styles.fieldLabel}>Título do Desafio</label>
                                <input className={styles.inputField} placeholder="Ex: Algoritmos Nível 1" value={tituloGeral} onChange={e => setTituloGeral(e.target.value)} />
                            </div>

                            {/* SELETORES DE ÁREA E SUBCATEGORIA */}
                            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                <div className={styles.inputGroup} style={{ flex: 1, minWidth: '200px' }}>
                                    <label className={styles.fieldLabel}>Área</label>
                                    <select className={styles.inputField} value={area} onChange={e => setArea(e.target.value)}>
                                        <option value="Tecnologia">Tecnologia</option>
                                        <option value="Engenharia">Engenharia</option>
                                        <option value="Direito">Direito</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Rh">RH</option>
                                    </select>
                                </div>

                                <div className={styles.inputGroup} style={{ flex: 1, minWidth: '200px' }}>
                                    <label className={styles.fieldLabel}>Subcategoria (Capítulo)</label>
                                    <select className={styles.inputField} value={subcategoriaSelecionada} onChange={e => setSubcategoriaSelecionada(e.target.value)}>
                                        <option value="">-- Selecione --</option>
                                        {OPCOES_POR_AREA[area]?.map((op) => (
                                            <option key={op} value={op}>{op}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                                <div className={styles.inputGroup} style={{ flex: 2 }}>
                                    <label className={styles.fieldLabel}>Link da Capa (URL)</label>
                                    <input className={styles.inputField} placeholder="http://..." value={capa} onChange={e => setCapa(e.target.value)} />
                                </div>
                                <div className={styles.inputGroup} style={{ flex: 1 }}>
                                    <label className={styles.fieldLabel}>Tentativas</label>
                                    <input className={styles.inputField} type="number" min="1" value={tentativas} onChange={e => setTentativas(e.target.value)} />
                                </div>
                            </div>
                            
                            {capa && <img src={capa} alt="Capa" style={{ height: '100px', marginTop: '10px', borderRadius: '5px' }} onError={(e)=>e.target.style.display='none'} />}
                        </div>

                        <hr className={styles.divider} />

                        {/* --- BLOCO 2: AS 6 QUESTÕES --- */}
                        <div className={styles.blocksList}>
                            {exercicios.map((ex, index) => (
                                <div key={index} className={styles.blockItem}>
                                    <div className={styles.blockHeader}>
                                        <span className={styles.blockLabel} style={{background: '#2563EB', color: 'white'}}>QUESTÃO {index + 1}</span>
                                    </div>
                                    
                                    <div className={styles.inputGroup}>
                                        <label className={styles.fieldLabel}>Enunciado da Pergunta</label>
                                        <textarea className={styles.textAreaBlock} placeholder="Digite a pergunta..." value={ex.perguntaTexto} onChange={e => handleQuestaoChange(index, 'perguntaTexto', e.target.value)} />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.fieldLabel}>Imagem de Apoio (Opcional)</label>
                                        <input className={styles.inputField} placeholder="URL da imagem..." value={ex.perguntaImagem} onChange={e => handleQuestaoChange(index, 'perguntaImagem', e.target.value)} />
                                        {ex.perguntaImagem && <img src={ex.perguntaImagem} alt="Apoio" style={{ maxHeight: '80px', marginTop:'5px' }} onError={(e)=>e.target.style.display='none'} />}
                                    </div>

                                    {/* GRID DE ALTERNATIVAS */}
                                    <div style={{ marginTop: '20px', background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                                        <label className={styles.fieldLabel} style={{marginBottom: '10px', display: 'block'}}>Alternativas (Marque a correta no círculo)</label>
                                        
                                        {['a', 'b', 'c', 'd'].map((letra) => (
                                            <div key={letra} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px' }}>
                                                <input 
                                                    type="radio" 
                                                    name={`correta-${index}`} 
                                                    checked={ex.alternativaCorreta === letra} 
                                                    onChange={() => handleQuestaoChange(index, 'alternativaCorreta', letra)}
                                                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                                />
                                                <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{letra})</span>
                                                
                                                <input 
                                                    className={styles.inputField} 
                                                    placeholder={`Texto da opção ${letra.toUpperCase()}`} 
                                                    value={ex.alternativas[letra].texto} 
                                                    onChange={e => handleAltChange(index, letra, 'texto', e.target.value)} 
                                                    style={{ flex: 1 }}
                                                />
                                                
                                                <input 
                                                    className={styles.inputField} 
                                                    placeholder="URL Imagem (opc)" 
                                                    value={ex.alternativas[letra].imagem} 
                                                    onChange={e => handleAltChange(index, letra, 'imagem', e.target.value)} 
                                                    style={{ width: '150px' }}
                                                />
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