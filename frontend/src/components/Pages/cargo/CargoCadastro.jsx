import styles from './CargoCadastro.module.css'
import { Input, InputButton } from '../../form/Input'
import { useState } from 'react';
import useErroPadrao from '../../../hooks/useErroPadrao';
import useCargo from '../../../hooks/useCargo';

export default function CargoCadastro(){
    const [cargo, setCargo] = useState({});
    const [loading, setLoading] = useState(false);
    const { adicionarCargo } = useCargo();
    const { setErroPadrao } = useErroPadrao();

    function handleChange(e){
        setCargo({...cargo, [e.target.name]: [e.target.value] });
    }

    function onSubmit(e){
        e.preventDefault();
        setLoading(true);
        adicionarCargo(cargo).catch((error) => {
            setErroPadrao(error)
            setLoading(false);
        });
    }

    return (
        <form className={styles.form_cargo} onSubmit={onSubmit}>
            <Input tipo="text" name="descricao" descricao="Descrição do Cargo" onChange={handleChange} />
            <Input tipo="text" name="mediaSalarial" descricao="Média Salarial" onChange={handleChange} />
            <Input tipo="text" name="vagasAbertas" descricao="Vagas Abertas" onChange={handleChange} />

            <InputButton descricao="Cadastrar Cargo" submmit={true} classeIcone="bi bi-send" loading={loading}/>
        </form>
    );
}