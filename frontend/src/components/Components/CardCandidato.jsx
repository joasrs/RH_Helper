import styles from './CardCandidato.module.css'
import { useNavigate } from "react-router-dom";
import TrocarStatus from '../Modal/TrocarStatus';
import { useState, useRef } from 'react';
import useStatus from '../../hooks/useStatus';
import useErroPadrao from '../../hooks/useErroPadrao';

export default function CardCandidato({ candidato }) {
    const navigate = useNavigate();
    const { alterarStatusCandidato, buscarUmStatus } = useStatus();
    const modalRef = useRef(null);
    const modalInstanceRef = useRef(null);
    const [corBadgeStatus, setCorBadgeStatus ] = useState(candidato.Status.cor);
    const [descricaoBadgeStatus, setDescricaoBadgeStatus ] = useState(candidato.Status.descricao);
    const { setErroPadrao } = useErroPadrao();

    const abrirModal = (e) => {
        e.stopPropagation();
        if (modalInstanceRef.current) {
            modalInstanceRef.current.show();
        }
    };

    const fecharModal = () => {
        if (modalInstanceRef.current) {
            modalInstanceRef.current.hide();
        }
    };

    function onConfirmarAlteracaoStatus(novoStatus, idCandidato){
        if(novoStatus && idCandidato){
            candidato.Status.id = novoStatus;
            alterarStatusCandidato(novoStatus, idCandidato).then().catch(error => setErroPadrao(error));
            buscarUmStatus(novoStatus).then(status => {
                setCorBadgeStatus(status.cor);
                setDescricaoBadgeStatus(status.descricao);
            }).catch(error => setErroPadrao(error))
            return;
        }
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
                                <h4 className={styles.statusBadge} 
                                    style={{ backgroundColor: corBadgeStatus }}> { descricaoBadgeStatus } </h4> 
                            </div> 
                            <ul className={`dropdown-menu ${styles.itens_dropdown}`}>
                                <li onClickCapture={abrirModal} className={`${styles.logout} ${styles.li_dropdown}`}>
                                    <a data-candidato={candidato.id} className={`${styles.a_dropdown}`}>
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
            <TrocarStatus fecharModal={fecharModal} modalRef={modalRef} modalInstanceRef={modalInstanceRef} candidato={candidato} useStatus={useStatus} onConfirmarAlteracaoStatus={onConfirmarAlteracaoStatus}/>
        </>
    );
}
