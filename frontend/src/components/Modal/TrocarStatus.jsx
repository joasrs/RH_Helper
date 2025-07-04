import styles from "./TrocarStatus.module.css"
import { useState, useEffect } from 'react';
import { Select, InputButton } from "../form/Input";

export default function TrocarStatus({candidato, useStatus, onConfirmarAlteracaoStatus, fecharModal, modalRef, modalInstanceRef}){
    const [novoStatus, setNovoStatus] = useState();

    useEffect(() => {
        const bootstrap = window.bootstrap;
        if (modalRef.current) {
            modalInstanceRef.current = new bootstrap.Modal(modalRef.current);
        }
    }, []);

    function onSubmmitConfirmarStatus(e){
        e.preventDefault();
        if(onConfirmarAlteracaoStatus && novoStatus){
            onConfirmarAlteracaoStatus(novoStatus, candidato.id);
        }

        fecharModal();
    }

    function handleChange(e){
        setNovoStatus(e.target.value);
    }

    return ( 
        <>
            <div ref={modalRef} className="modal fade" data-bs-keyboard="false" data-bs-backdrop="static" id="modalTrocarStatus" tabIndex="-1" aria-labelledby="modalTrocarStatusLabel" aria-hidden="true">
                <div className={`${styles.div_modal} modal-dialog modal-dialog-centered`}>
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modalTrocarStatusLabel">Alterar Status [ {candidato.nome} ]</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form className={`modal-body`} onSubmit={onSubmmitConfirmarStatus}>
                        <div className={styles.div_troca_status}>
                            <div className="status_atual">
                                Status Atual
                                <Select useApi={useStatus} desabilitado={true} descricao="Status Atual" valor={candidato.Status?.id}/>
                            </div>
                            <i style={{marginTop: "30px", color: '#686868'}} className="bi bi-arrow-right fs-3"></i>
                            <div className="status_novo">
                                Novo Status
                                <Select useApi={useStatus} descricao="Novo Status" onChange={handleChange} required={true}/>
                            </div>
                        </div>
                        <InputButton descricao="Confirmar" submmit={true} onClick={fecharModal}/>
                    </form>
                    </div>
                </div>
            </div>
        </>
    );
}
