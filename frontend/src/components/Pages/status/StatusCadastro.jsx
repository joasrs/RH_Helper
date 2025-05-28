import styles from './StatusCadastro.module.css'
import { Input, InputButton } from '../../form/Input'
import { useState } from 'react';
import useErroPadrao from '../../../hooks/useErroPadrao';
import useStatus from '../../../hooks/useStatus';

export default function StatusCadastro(){
    const [status, setStatus] = useState({});
    const [loading, setLoading] = useState(false);
    const { adicionarStatus } = useStatus();
    const { setErroPadrao } = useErroPadrao();

    function handleChange(e){
        setStatus({...status, [e.target.name]: [e.target.value] });
    }

    function onSubmit(e){
        e.preventDefault();
        setLoading(true);
        adicionarStatus(status).catch((error) => {
            setErroPadrao(error)
            setLoading(false);
        });
    }

    return (
        <form className={styles.form_status} onSubmit={onSubmit}>
            <Input tipo="text" name="descricao" descricao="Descrição do Status" onChange={handleChange}/>
            <Input tipo="text" name="obs" descricao="Observação" onChange={handleChange} />
            <Input tipo="color" name="cor" valor="#cfcfcf" descricao="Cor do status" onChange={handleChange} required={false}/>

            <InputButton descricao="Cadastrar Status" submmit={true} classeIcone="bi bi-send" loading={loading}/>
        </form>
    );
}