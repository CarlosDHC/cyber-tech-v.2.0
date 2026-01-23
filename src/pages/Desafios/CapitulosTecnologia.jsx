import React, { useEffect, useState } from "react";
import { db } from "../../../FirebaseConfig"; //
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "./Capitulos.module.css"; 

export default function CapitulosTecnologia() {
    const [desafios, setDesafios] = useState([]);

    useEffect(() => {
        const fetchDesafios = async () => {
            const q = query(collection(db, "desafios"), where("area", "==", "Tecnologia"));
            const querySnapshot = await getDocs(q);
            setDesafios(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchDesafios();
    }, []);

    return (
        <div className={styles.container}>
            {desafios.map(d => (
                <div key={d.id} className={styles.card}>
                    <img src={d.imagemCapa} alt={d.titulo} />
                    <h3>{d.titulo}</h3>
                    <button onClick={() => window.location.href = `/challenge/${d.id}`}>Começar</button>
                </div>
            ))}
        </div>
    );
}