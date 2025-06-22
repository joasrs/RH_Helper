import styles from './CargoCadastro.module.css'
import { Input } from '../../form/Input'
import { useState } from 'react';
import useErroPadrao from '../../../hooks/useErroPadrao';
import useCargo from '../../../hooks/useCargo';
import BarraBotoes from '../../form/BarraBotoes';
import { useLocation } from 'react-router-dom'

export default function CargoCadastro(){
    const location = useLocation();
    const [cargo, setCargo] = useState(location?.state ?? {});
    const [loading, setLoading] = useState(false);
    const { adicionarCargo, removerCargo } = useCargo();
    const { setErroPadrao } = useErroPadrao();
    const [inputHabilitado, setImputHabilitado] = useState(Object.keys(cargo).length > 0);

    function handleChange(e){
        setCargo({...cargo, [e.target.name]: e.target.value });
    }

    function onSubmit(e){
        e.preventDefault();
        setLoading(true);
        adicionarCargo(cargo).catch((error) => {
            setErroPadrao(error)
            setLoading(false);
        });
    }
    
    function onClickRemoverCargo(idCargo){
        removerCargo(idCargo).catch((error) => setErroPadrao(error));
    }

    return (
        <form className={styles.form_cargo} onSubmit={onSubmit}>
            <div className={styles.div_inputs}>
                <Input desabilitado={inputHabilitado} tipo="text" name="descricao" descricao="Descrição do Cargo" onChange={handleChange} valor={cargo.descricao}/>
                <Input desabilitado={inputHabilitado} tipo="number" name="mediaSalarial" descricao="Média Salarial" onChange={handleChange} valor={cargo.mediaSalarial}/>
                <Input desabilitado={inputHabilitado} tipo="number" name="vagasAbertas" descricao="Vagas Abertas" onChange={handleChange} valor={cargo.vagasAbertas} colunaInicio={1} colunaFim={2}/>
            </div>
            <BarraBotoes excluirHabilitado={inputHabilitado} 
                            alterarHabilitado={inputHabilitado} 
                            registrarHabilitado={!inputHabilitado} 
                            onExcluir={() => cargo?.id && onClickRemoverCargo(cargo.id)}
                            onAlterar={() => setImputHabilitado(!inputHabilitado)}/>
        </form>
    );
}