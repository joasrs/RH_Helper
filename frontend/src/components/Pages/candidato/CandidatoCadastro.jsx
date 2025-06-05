import styles from './CandidatoCadastro.module.css'
import { Input, InputButton, Select, FileInput } from '../../form/Input'
import { useState } from 'react';
import useCandidato from '../../../hooks/useCandidato';
import useStatus from '../../../hooks/useStatus';
import useCargo from '../../../hooks/useCargo';
import useErroPadrao from '../../../hooks/useErroPadrao';
import { useLocation } from 'react-router-dom'
import BarraBotoes from '../../form/BarraBotoes';

export default function CandidatoCadastro(){
    const location = useLocation();
    const [candidato, setCandidato] = useState(location?.state ? {...location.state, dataNascimento: new Date(location.state.dataNascimento).toISOString().split('T')[0]} : {});
    const [loading, setLoading] = useState(false);
    const { adicionarCandidato, removerCandidato } = useCandidato();
    const { setErroPadrao } = useErroPadrao();
    const [inputHabilitado, setImputHabilitado] = useState(Object.keys(candidato).length > 0);

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
    
    function onClickRemoverCandidato(idCandidato){
        removerCandidato(idCandidato).catch((error) => setErroPadrao(error));
    }

    return (
        <form className={styles.form_candidato} onSubmit={onSubmit}>
            <div className={styles.form_grid}>
                <Input desabilitado={inputHabilitado} tipo="text" name="nome" descricao="Nome" onChange={handleChange} valor={candidato.nome} colunaInicio={1} colunaFim={2}/>
                <Input desabilitado={inputHabilitado} tipo="date" name="dataNascimento" descricao="Data Nascimento" onChange={handleChange} valor={candidato.dataNascimento}/>
                <Input desabilitado={inputHabilitado} tipo="text" name="telefone" descricao="Telefone" onChange={handleChange} valor={candidato.telefone} />
                <Input desabilitado={inputHabilitado} tipo="text" name="email" descricao="E-mail" onChange={handleChange} valor={candidato.email}  colunaInicio={1} colunaFim={2}/>
                <Input desabilitado={inputHabilitado} tipo="text" name="cpf" descricao="CPF" onChange={handleChange} valor={candidato.cpf} />
                <Input desabilitado={inputHabilitado} tipo="text" name="cidadeNaturalidade" descricao="Cidade Naturalidade" onChange={handleChange} valor={candidato.cidadeNaturalidade} />
                <Input desabilitado={inputHabilitado} tipo="text" name="endereco" descricao="Endereço" onChange={handleChange} valor={candidato.endereco}  colunaInicio={1} colunaFim={3}/>
                <Input desabilitado={inputHabilitado} tipo="file" name="curriculo" descricao="Arquivo do currículo" onChange={handleChange} valor={candidato.curriculo} required={false}/>
                <Select desabilitado={inputHabilitado} name="status" descricao="Status" useApi={useStatus} onChange={handleChange}  colunaInicio={1} colunaFim={1} valor={candidato.Status?.id}/>
                <Input desabilitado={inputHabilitado} tipo="text" name="obsStatus" descricao="Observação do Status" onChange={handleChange} valor={candidato.obsStatus}  colunaInicio={2} colunaFim={3}/>
                <Select desabilitado={inputHabilitado} name="cargo" descricao="Cargo" useApi={useCargo} onChange={handleChange} valor={candidato.Cargo?.id}/>
            </div>
            <BarraBotoes excluirHabilitado={inputHabilitado} 
                         alterarHabilitado={inputHabilitado} 
                         registrarHabilitado={!inputHabilitado} 
                         onExcluir={() => candidato?.id && onClickRemoverCandidato(candidato.id)}
                         onAlterar={() => setImputHabilitado(!inputHabilitado)}/>
        </form>
    );
}