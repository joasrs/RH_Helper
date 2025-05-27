import styles from './CadastroCandidato.module.css'
import { Input, InputButton, InputTextArea } from '../../form/Input'
import { useState } from 'react';
import useCandidato from '../../../hooks/useCandidato';
import useErroPadrao from '../../../hooks/useErroPadrao';

export default function CadastroCandidato(){
    const [candidato, setCandidato] = useState({});
    const [loading, setLoading] = useState(false);
    const { adicionarCandidato } = useCandidato();
    const { setErroPadrao } = useErroPadrao();

    function handleChange(e){
        setCandidato({...candidato, [e.target.name]: [e.target.value] });
    }

    function onSubmit(e){
        e.preventDefault();
        setLoading(true);
        adicionarCandidato(candidato).catch((error) => {
            setErroPadrao(error)
            setLoading(false);
        });
    }

    return (
        <form className={styles.form_candidato} onSubmit={onSubmit}>
            <Input tipo="text" name="nome" descricao="Nome" onChange={handleChange} />
            <Input tipo="date" name="dataNascimento" descricao="Data Nascimento"  onChange={handleChange} />
            <Input tipo="text" name="email" descricao="E-mail" onChange={handleChange} />
            <Input tipo="text" name="telefone" descricao="Telefone" onChange={handleChange} />
            <Input tipo="text" name="cpf" descricao="CPF" onChange={handleChange} />
            <Input tipo="text" name="cidadeNaturalidade" descricao="Cidade Naturalidade" onChange={handleChange} />
            <Input tipo="text" name="endereco" descricao="Endereço" onChange={handleChange} />
            <Input tipo="text" name="obsStatus" descricao="Status" onChange={handleChange} />

            <InputButton descricao="Cadastrar Candidato" submmit={true} classeIcone="bi bi-send" loading={loading}/>
        </form>
    );
}