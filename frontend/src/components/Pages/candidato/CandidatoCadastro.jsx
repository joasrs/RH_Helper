import styles from './CandidatoCadastro.module.css'
import { Input, InputButton, Select } from '../../form/Input'
import { useState } from 'react';
import useCandidato from '../../../hooks/useCandidato';
import useStatus from '../../../hooks/useStatus';
import useCargo from '../../../hooks/useCargo';
import useErroPadrao from '../../../hooks/useErroPadrao';

export default function CandidatoCadastro(){
    const [candidato, setCandidato] = useState({});
    const [loading, setLoading] = useState(false);
    const { adicionarCandidato } = useCandidato();
    const { consultarStatusCombo } = useStatus();
    const { setErroPadrao } = useErroPadrao();

    function handleChange(e){
        setCandidato({...candidato, [e.target.name]: [e.target.value] });
    }

    function onSubmit(e){
        e.preventDefault();
        console.log(candidato);
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
            <Select name="status" descricao="Status" useApi={useStatus} onChange={handleChange}/>
            <Select name="cargo" descricao="Cargo" useApi={useCargo} onChange={handleChange}/>
            <Input tipo="text" name="obsStatus" descricao="Observação do Status" onChange={handleChange} />

            <InputButton descricao="Cadastrar Candidato" submmit={true} classeIcone="bi bi-send" loading={loading}/>
        </form>
    );
}