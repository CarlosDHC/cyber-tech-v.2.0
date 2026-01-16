import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Admin.module.css";

// Firebase
import { db } from "../../../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function newdesafios() {
    // Dados Principais
    const [titulo, setTitulo] = useState("");
    const [resumo, setResumo] = useState("");
    const [capa, setCapa] = useState("");

    // --- NOVOS ESTADOS ---
    const [autor, setAutor] = useState("");
    const [tempoLeitura, setTempoLeitura] = useState("");

    // O "Corpo" do post é uma lista de blocos
    const [secoes, setSecoes] = useState([
        { id: 1, type: "paragraph", content: "" }
    ]);

    const [loading, setLoading] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    // --- FUNÇÕES DO CONSTRUTOR ---

    const adicionarBloco = (tipo) => {
        setSecoes([
            ...secoes,
            { id: Date.now(), type: tipo, content: "" }
        ]);
    };

    const atualizarBloco = (id, valor) => {
        setSecoes(secoes.map(secao =>
            secao.id === id ? { ...secao, content: valor } : secao
        ));
    };

    const removerBloco = (id) => {
        if (secoes.length === 1) return; // Impede remover tudo
        setSecoes(secoes.filter(secao => secao.id !== id));
    };

    const moverBloco = (index, direcao) => {
        const novasSecoes = [...secoes];
        const [itemRemovido] = novasSecoes.splice(index, 1);
        novasSecoes.splice(index + direcao, 0, itemRemovido);
        setSecoes(novasSecoes);
    };

    // --- SALVAR NO FIREBASE ---

    async function salvarPost() {
        if (!titulo || !resumo || !autor || !tempoLeitura) {
            alert("Preencha o Título, Resumo, Autor e Tempo de Leitura.");
            return;
        }

        setLoading(true);

        try {
            await addDoc(collection(db, "blog"), {
                titulo: titulo,
                resumo: resumo,
                autor: autor,
                tempoLeitura: tempoLeitura,
                imagemUrl: capa || "https://placehold.co/600x400?text=Capa",
                conteudo: secoes,
                dataCriacao: new Date().toISOString()
            });

            alert("Post publicado com sucesso!");

            setTitulo("");
            setResumo("");
            setCapa("");
            setAutor("");
            setTempoLeitura("");
            setSecoes([{ id: Date.now(), type: "paragraph", content: "" }]);

        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao salvar.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            {/* SIDEBAR */}
            <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ""}`}>
                <button className={styles.toggleBtn} onClick={() => setCollapsed(prev => !prev)}>
                    <img src="/menu.png" alt="menu" />
                </button>
                <h2 className={styles.title}>Painel Admin</h2>
                <ul className={styles.navList}>
                    <li>
                        <Link to="/admin" className={styles.navLink}>
                            <img src="/casa.png" alt="" />
                            <span className={styles.linkText}>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/notas" className={styles.navLink}>
                            <img src="/estrela.png" alt="" />
                            <span className={styles.linkText}>Notas</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/newblog" className={`${styles.navLink} ${styles.active}`}>
                            <img src="/blog.png" alt="" />
                            <span className={styles.linkText}>Blog</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/newdesafios" data-tooltip="Desafios" className={styles.navLink}>
                            <img src="/desafio.png" alt="Desafios" />
                            <span className={styles.linkText}>Desafios</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/curtidas" className={styles.navLink}>
                            <img src="/curti.png" alt="" />
                            <span className={styles.linkText}>Curtidas</span>
                        </Link>
                    </li>
                </ul>
            </aside>

            <main className={styles.main}>
                <div className={styles.headerFlex}>
                    <h1>Editor Profissional</h1>
                    <button className={styles.publishBtn} onClick={salvarPost} disabled={loading}>
                        {loading ? "Publicando..." : "Publicar Artigo"}
                    </button>
                </div>

                <div className={styles.editorContainer}>
                    <div className={styles.formColumn}>

                        {/* Metadados com Labels */}
                        <div className={styles.metaBox}>
                            <h3>Informações da Capa</h3>

                            <div className={styles.inputGroup}>
                                <label className={styles.fieldLabel}>Título Principal</label>
                                <input
                                    className={styles.inputField}
                                    placeholder="Título Principal"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div className={styles.inputGroup} style={{ flex: 1 }}>
                                    <label className={styles.fieldLabel}>Nome do Autor</label>
                                    <input
                                        className={styles.inputField}
                                        placeholder="Nome do Autor"
                                        value={autor}
                                        onChange={e => setAutor(e.target.value)}
                                    />
                                </div>

                                <div className={styles.inputGroup} style={{ flex: 1 }}>
                                    <label className={styles.fieldLabel}>Tempo (minutos)</label>
                                    <input
                                        className={styles.inputField}
                                        placeholder="Ex: 5"
                                        value={tempoLeitura}
                                        type="number"
                                        min="0"
                                        onChange={(e) => {
                                            const valor = e.target.value;
                                            if (valor === "" || parseInt(valor) >= 0) {
                                                setTempoLeitura(valor);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.fieldLabel}>Resumo Curto</label>
                                <input
                                    className={styles.inputField}
                                    placeholder="Resumo curto (aparece no card)"
                                    value={resumo}
                                    onChange={e => setResumo(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.fieldLabel}>Link da Imagem de Capa (URL)</label>
                                <input
                                    className={styles.inputField}
                                    placeholder="Link da Imagem de Capa (URL)"
                                    value={capa}
                                    onChange={e => setCapa(e.target.value)}
                                />
                            </div>

                            {capa && (
                                <div style={{ marginTop: '10px' }}>
                                    <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '5px' }}>Pré-visualização da Capa:</p>
                                    <img
                                        src={capa}
                                        alt="Pré-visualização da capa"
                                        style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', objectFit: 'cover' }}
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}
                        </div>

                        <hr className={styles.divider} />

                        <h3 style={{ marginBottom: '15px', color: '#333' }}>Conteúdo do Post</h3>

                        <div className={styles.blocksList}>
                            {secoes.map((secao, index) => (
                                <div key={secao.id} className={styles.blockItem}>

                                    <div className={styles.blockHeader}>
                                        <span className={styles.blockLabel}>
                                            {secao.type === 'subtitle' && ' Subtítulo'}
                                            {secao.type === 'paragraph' && ' Parágrafo'}
                                            {secao.type === 'image' && ' Imagem (URL)'}
                                        </span>
                                        <div className={styles.blockActions}>
                                            <button onClick={() => removerBloco(secao.id)} className={styles.btnIcon} title="Remover">
                                                <img src="/lixeira.png" alt="" />
                                            </button>
                                            {index > 0 && <button onClick={() => moverBloco(index, -1)} className={styles.btnIcon}>
                                                <img src="/sobe.png" alt="sobe" />
                                            </button>}
                                            {index < secoes.length - 1 && <button onClick={() => moverBloco(index, 1)} className={styles.btnIcon}>
                                                <img src="/dece.png" alt="dece" />
                                            </button>}
                                        </div>
                                    </div>

                                    {/* Labels dinâmicos para os blocos */}
                                    {secao.type === 'paragraph' && (
                                        <div className={styles.inputGroup}>
                                            <label className={styles.fieldLabel}>Texto do Parágrafo</label>
                                            <textarea
                                                className={styles.textAreaBlock}
                                                placeholder="Escreva seu parágrafo..."
                                                value={secao.content}
                                                onChange={e => atualizarBloco(secao.id, e.target.value)}
                                            />
                                        </div>
                                    )}

                                    {secao.type === 'subtitle' && (
                                        <div className={styles.inputGroup}>
                                            <label className={styles.fieldLabel}>Título do Subtítulo</label>
                                            <input
                                                className={styles.inputBlock}
                                                placeholder="Digite um subtítulo..."
                                                value={secao.content}
                                                onChange={e => atualizarBloco(secao.id, e.target.value)}
                                            />
                                        </div>
                                    )}

                                    {secao.type === 'image' && (
                                        <div className={styles.inputGroup}>
                                            <label className={styles.fieldLabel}>Caminho da Imagem (URL)</label>
                                            <input
                                                className={styles.inputBlock}
                                                placeholder="Cole o link da imagem aqui..."
                                                value={secao.content}
                                                onChange={e => atualizarBloco(secao.id, e.target.value)}
                                            />
                                            {secao.content && (
                                                <div style={{ marginTop: '10px' }}>
                                                    <img
                                                        src={secao.content}
                                                        alt="Pré-visualização"
                                                        style={{ maxWidth: '100%', borderRadius: '8px' }}
                                                        onError={(e) => e.target.style.display = 'none'}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className={styles.addButtons}>
                            <button onClick={() => adicionarBloco('subtitle')} className={styles.btnAdd}>+ Subtítulo</button>
                            <button onClick={() => adicionarBloco('paragraph')} className={styles.btnAdd}>+ Parágrafo</button>
                            <button onClick={() => adicionarBloco('image')} className={styles.btnAdd}>+ Imagem</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}