import styles from './CargoCadastro.module.css'
import { Input, InputButton, InputTextArea } from '../../form/Input'
import { useState } from 'react';
import useErroPadrao from '../../../hooks/useErroPadrao';

export default function CargoCadastro(){
    const [cargo, setCargo] = useState({});
    const [loading, setLoading] = useState(false);
    //const { adicionarCargo } = useCandidato();
    const { setErroPadrao } = useErroPadrao();

    function handleChange(e){
        setCargo({...cargo, [e.target.name]: [e.target.value] });
    }

    function onSubmit(e){
        e.preventDefault();
        setLoading(true);
        // adicionarCandidato(candidato).catch((error) => {
        //     setErroPadrao(error)
        //     setLoading(false);
        // });
    }

    return (
        <form className={styles.form_candidato} onSubmit={onSubmit}>
            <Input tipo="text" name="descricao" descricao="Descrição do Cargo" onChange={handleChange} />
            <Input tipo="text" name="salario" descricao="Média Salarial" onChange={handleChange} />
            <Input tipo="text" name="vagasAbertas" descricao="Vagas Abertas" onChange={handleChange} />

            <InputButton descricao="Cadastrar Cargo" submmit={true} classeIcone="bi bi-send" loading={loading}/>
        </form>
    );
}