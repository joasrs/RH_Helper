import styles from './CardCandidato.module.css'
import { useNavigate } from "react-router-dom";

export default function CardCandidato({ candidato, onCLickAbrirModal }) {
    const navigate = useNavigate();

    function abrirModalAlterarStatus(e){
        e.stopPropagation();
    }   

    return (
        <>
            <div className={styles.card} onClick={() => navigate('/cadastro-candidato', { state: candidato })}>
                <div className={styles.header}>
                    <h3>{candidato.nome}</h3> 
                    { candidato.Status && 

                        <div className="dropdown">
                            <div className={`${styles.div_status_header}`} onClick={e=> e.stopPropagation()} data-bs-toggle="dropdown" aria-expanded="false" data-toggle="dropdown">
                                <i style={{alignContent: 'center', marginRight: '15px'}} className="bi bi-chevron-down"></i>
                                <h5 className={styles.statusBadge} 
                                    style={{ backgroundColor: candidato.Status.cor }}> { candidato.Status.descricao } </h5> 
                            </div> 
                            <ul className={`dropdown-menu ${styles.itens_dropdown}`}>
                                <li data-candidato={candidato.id} data-bs-toggle="modal" data-bs-target="#modalTrocarStatus" className={`${styles.logout} ${styles.li_dropdown}`} onClick={abrirModalAlterarStatus}>
                                    <a className={`${styles.logout} ${styles.a_dropdown}`} href="#">
                                        <i className={`bi bi-arrow-repeat ${styles.item_dropdown} ${styles.logout}`}></i>
                                        Alterar Status
                                    </a>
                                </li>
                            </ul>
                        </div>
                    }
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
            </div>
        </>
    );
}
