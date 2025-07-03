import styles from "./TrocarStatus.module.css"
import { useState } from 'react';
import { Select, InputButton } from "../form/Input";
import useStatus from "../../hooks/useStatus";

export default function TrocarStatus({candidato}){
    const [novoStatus, setNovoStatus] = useState();
    const { alterarStatusCandidato } = useStatus();
    function onSubmmitConfirmarStatus(){
        if(novoStatus){
            alterarStatusCandidato(novoStatus, candidato.id).then().catch();
            return;
        }
    }

    function handleChange(e){
        setNovoStatus({novoStatus: e.target.value });
    }

    return ( 
        <div className="modal fade" data-bs-keyboard="false" data-bs-backdrop="static" id="modalTrocarStatus" tabIndex="-1" aria-labelledby="modalTrocarStatusLabel" aria-hidden="true">
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
                            <Select useApi={useStatus} descricao="Novo Status" onChange={handleChange} required={false}/>
                        </div>
                    </div>
                    <InputButton submmit={true} descricao="Confirmar"/>
                </form>
                </div>
            </div>
        </div>
    );
}
