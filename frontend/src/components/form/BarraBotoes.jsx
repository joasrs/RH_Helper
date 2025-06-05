import styles from './BarraBotoes.module.css';
import { InputButton } from './Input';
import Dialog from '../Layout/Dialog/Dialog';
import { useState } from 'react';

export default function BarraBotoes({onExcluir, onAlterar, onRegistrar, excluirHabilitado, alterarHabilitado, registrarHabilitado}){
    const [abrirDialog, setAbrirDialog] = useState(false);

    return (
        <>
            <div className={styles.barra_botoes}>
                <InputButton descricao={'Excluir'} classeIcone="bi bi-trash3-fill" onClick={() => setAbrirDialog(true)} cor="vermelho" habilitado={excluirHabilitado}/>
                <InputButton descricao={'Alterar'} classeIcone="bi bi-person-fill-gear" onClick={onAlterar} cor="cinza"  habilitado={alterarHabilitado}/>
                <InputButton descricao={'Registrar'} submmit={true} classeIcone="bi bi-send" onClick={onRegistrar} cor="cinza"  habilitado={registrarHabilitado}/>
            </div>
            <Dialog 
                abrir={abrirDialog} 
                titulo="Confirmar Exclusão" 
                mensagem="Deseja realmente excluir o registro?" 
                eventoBotaoSim={onExcluir} 
                onFechar={() => setAbrirDialog(false)} 
            />
        </>
    )
}