import styles from './StatusCadastro.module.css'
import { Input, InputButton } from '../../form/Input'
import { useState } from 'react';
import useErroPadrao from '../../../hooks/useErroPadrao';
import useStatus from '../../../hooks/useStatus';
import BarraBotoes from '../../form/BarraBotoes';
import { useLocation } from 'react-router-dom'

export default function StatusCadastro(){
    const location = useLocation();
    const [status, setStatus] = useState(location?.state ?? {});
    const [loading, setLoading] = useState(false);
    const { adicionarStatus, removerStatus } = useStatus();
    const { setErroPadrao } = useErroPadrao();
    const [inputHabilitado, setImputHabilitado] = useState(Object.keys(status).length > 0);

    function handleChange(e){
        setStatus({...status, [e.target.name]: e.target.value});
    }

    function onSubmit(e){
        e.preventDefault();
        setLoading(true);
        adicionarStatus(status).catch((error) => {
            setErroPadrao(error)
            setLoading(false);
        });
    }

    function onClickRemoverStatus(idStatus){
        removerStatus(idStatus).catch((error) => setErroPadrao(error));
    }

    //<Input desabilitado={inputHabilitado} tipo="color" name="cor" descricao="Cor do status" onChange={handleChange} valor={status.cor} required={false}/>
                // <div>
                //      Cor: <input type="color" name="cor" id="cor" />
                // </div>
    return (
        <form className={styles.form_status} onSubmit={onSubmit}>
            <div className={styles.div_inputs}>
                <Input desabilitado={inputHabilitado} tipo="text" name="descricao" descricao="Descrição do Status" onChange={handleChange} valor={status.descricao}/>
                <Input style={{width: "90px"}} desabilitado={inputHabilitado} tipo="color" name="cor" descricao="Cor Display" onChange={handleChange} valor={status.cor} required={false}/>
                <Input desabilitado={inputHabilitado} tipo="text" name="obs" descricao="Observação" onChange={handleChange} valor={status.obs} colunaInicio={1} colunaFim={2}/>
            </div>

            <BarraBotoes excluirHabilitado={inputHabilitado} 
                            alterarHabilitado={inputHabilitado} 
                            registrarHabilitado={!inputHabilitado} 
                            onExcluir={() => status?.id && onClickRemoverStatus(status.id)}
                            onAlterar={() => setImputHabilitado(!inputHabilitado)}/>
        </form>
    );
}