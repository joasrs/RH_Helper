import { useState, useEffect } from 'react'
import styles from './Dialog.module.css'

export default function Dialog({titulo, mensagem, mensagemBotaoSim = "Sim", mensagemBotaoNao = "Cancelar", eventoBotaoSim, eventoBotaoNao, abrir, onFechar}){

    useEffect(() => {
        const modalElement = document.querySelector("#modal");
        if (modalElement && abrir) {
            const modal = new window.bootstrap.Modal(modalElement);
            modal.show();

            modalElement.addEventListener('hidden.bs.modal', () => {
                onFechar && onFechar();
            });
        }
    }, [abrir]);

    return (
        <div
            className="modal fade"
            id="modal"
            tabIndex="-1"
            aria-labelledby="meuModalLabel"
            aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="meuModalLabel">{titulo}</h5>
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">{mensagem}</div>
                    <div className="modal-footer">
                        <button type="button" data-bs-dismiss="modal" className="btn btn-danger" onClick={eventoBotaoSim}>{mensagemBotaoSim}</button>
                        <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={eventoBotaoNao}
                        >
                        {mensagemBotaoNao}
                        </button>
                    </div>
                    </div>
                </div>
            </div>
    )
}