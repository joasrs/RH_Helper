import styles from './CardCandidato.module.css'
import { useNavigate } from "react-router-dom";

export default function CardCandidato({ candidato }) {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.card} onClick={() => navigate('/cadastro-candidato', { state: candidato })}>
                <div className={styles.header}>
                    <h3>{candidato.nome}</h3>                 
                </div>

                <div className={styles.body}>
                    <div className={styles.row}>
                        <div className={styles.campo}>
                            <span className={styles.titulo}>Telefone:</span>
                            <span className={styles.conteudo}>{candidato.telefone}</span>
                        </div>
                        <div className={styles.campo}>
                            <span className={styles.titulo}>E-mail:</span>
                            <span className={styles.conteudo}>{candidato.email}</span>
                        </div>
                        <div className={styles.campo}>
                            <span className={styles.titulo}>CPF:</span>
                            <span className={styles.conteudo}>{candidato.cpf}</span>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.campo}>
                            <span className={styles.titulo}>Nascimento:</span>
                            <span className={styles.conteudo}>{candidato.dataNascimentoFormatada}</span>
                        </div>
                        <div className={styles.campo}>
                            <span className={styles.titulo}>Endereço:</span>
                            <span className={styles.conteudo}>{candidato.endereco}</span>
                        </div>
                        <div className={styles.campo}>
                            <span className={styles.titulo}>Cidade Natal:</span>
                            <span className={styles.conteudo}>{candidato.cidadeNaturalidade}</span>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.campo}>
                            <span className={styles.titulo}>Cargo:</span>
                            <span className={styles.conteudo}>{candidato.Cargo?.descricao}</span>
                        </div>
                        <div className={styles.campo}>
                            <span className={styles.titulo}>Obs. Status:</span>
                            <span className={styles.conteudo}>{candidato.obsStatus}</span>
                        </div>
                        <div className={styles.campo}>
                            <span className={styles.titulo}>Currículo Anexado: <i className={`fs-4 bi bi-${candidato.curriculo ? "check" : "x"}`} style={{color: candidato.curriculo ? 'green' : '#df1818'}}></i></span>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <span>Status:</span>
                    {candidato.Status && (
                        <div 
                            className={styles.statusBadge} 
                            style={{ backgroundColor: candidato.Status.cor }}
                        >
                            {candidato.Status.descricao}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
