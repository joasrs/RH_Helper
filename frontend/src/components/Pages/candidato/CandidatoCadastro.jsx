import styles from './CandidatoCadastro.module.css'
import { Input, InputButton, Select } from '../../form/Input'
import { useState } from 'react';
import useCandidato from '../../../hooks/useCandidato';
import useStatus from '../../../hooks/useStatus';
import useCargo from '../../../hooks/useCargo';
import useErroPadrao from '../../../hooks/useErroPadrao';
import { useLocation } from 'react-router-dom'

export default function CandidatoCadastro(){
    const location = useLocation();
    const [candidato, setCandidato] = useState(location?.state ?? {});
    const [loading, setLoading] = useState(false);
    const { adicionarCandidato } = useCandidato();
    const { consultarStatusCombo } = useStatus();
    const { setErroPadrao } = useErroPadrao();

    //const { candidatoParametro } = route.params;

    console.log(candidato);

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
            <div className={styles.teste_coluna}>
                <div className={styles.duas_colunas}>
                    <Input tipo="text" name="nome" descricao="Nome" onChange={handleChange} valor={candidato.nome}/>
                </div>
                <div className={styles.item2}>
                    <Input tipo="date" name="dataNascimento" descricao="Data Nascimento" onChange={handleChange} valor={candidato.dataNascimento}/>
                </div>
                <div className={styles.item4}>
                    <Input tipo="text" name="telefone" descricao="Telefone" onChange={handleChange} valor={candidato.telefone} />
                </div>
                <div className={styles.duas_colunas}>
                    <Input tipo="text" name="email" descricao="E-mail" onChange={handleChange} valor={candidato.email} />
                </div>
                <div className={styles.item5}>
                    <Input tipo="text" name="cpf" descricao="CPF" onChange={handleChange} valor={candidato.cpf} />
                </div>
                <div className={styles.item6}>
                    <Input tipo="text" name="cidadeNaturalidade" descricao="Cidade Naturalidade" onChange={handleChange} valor={candidato.cidadeNaturalidade} />
                </div>
                <div className={styles.tres_colunas}>
                    <Input tipo="text" name="endereco" descricao="Endereço" onChange={handleChange} valor={candidato.endereco} />
                </div>
                <div className={styles.item8}>
                    <Select name="status" descricao="Status" useApi={useStatus} onChange={handleChange}/>
                </div>
                <div className={styles.item9}>
                    <Select name="cargo" descricao="Cargo" useApi={useCargo} onChange={handleChange}/>
                </div>
                <div className={styles.tres_colunas}>
                    <Input tipo="text" name="obsStatus" descricao="Observação do Status" onChange={handleChange} valor={candidato.obsStatus} />
                </div>
            </div>
                <InputButton descricao="Cadastrar Candidato" submmit={true} classeIcone="bi bi-send" loading={loading}/>
        </form>
    );
}