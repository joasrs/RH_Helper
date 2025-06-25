import styles from "./VisuzalizadorPdf.module.css"
import { Document, Page } from 'react-pdf';
import { useState } from 'react';

export default function TrocarStatus({idCandidato}){
    const [candidatoId, setCandidatoId] = useState(idCandidato)

    console.log(candidatoId);

    return ( 
        <div className="modal fade" id="modalTrocarStatus" tabIndex="-1" aria-labelledby="modalTrocarStatusLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modalTrocarStatusLabel">Alterar Status do Candidato</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className={`modal-body`}>
                    trocar status
                </div>
                </div>
            </div>
        </div>
    );
}
