import { useState, useEffect } from 'react';
import styles from './Input.module.css';
import useErroPadrao from '../../hooks/useErroPadrao';

function Input({tipo, name, descricao, valor, onChange, required = true, desabilitado = false, colunaInicio, colunaFim, style}){
    return (
        <div style={style} className={`${styles.form_control} ${styles[`tamanho_coluna_${colunaInicio}_${colunaFim}`]}`}>
            <div className="form-floating">
                { required ?  
                    ( valor ? <input disabled={desabilitado} className="form-control" type={tipo} name={name} id={name} value={valor} placeholder="placeholder" onChange={onChange} required/> : <input disabled={desabilitado} className="form-control" type={tipo} name={name} id={name} value={valor} placeholder="placeholder" onChange={onChange} required/>) :
                    ( valor ? <input disabled={desabilitado} className="form-control" type={tipo} name={name} id={name} value={valor} placeholder="placeholder" onChange={onChange}/> : <input disabled={desabilitado} className="form-control" type={tipo} name={name} id={name} value={valor} placeholder="placeholder" onChange={onChange}/>)
                }
                <label>{descricao}</label>
            </div>
        </div>
    )
}   

function Select({name, descricao, useApi, onChange, desabilitado = false, valor}){
    const { buscarItensCombo } = useApi();
    const [itensCombo, setItensCombo] = useState([]);
    const [valorSelecionado, setValorSelecionado] = useState(valor);
    const { setErroPadrao } = useErroPadrao();

    useEffect(() => {
        if(buscarItensCombo){
            buscarItensCombo().then((result) => {
                setItensCombo(result );
            }).catch((error) => setErroPadrao(error));
        }
    }, [buscarItensCombo, setErroPadrao]);

    function onChangeValor(e) {
        setValorSelecionado(e.target.value);
        onChange && onChange(e);
    }

    return (
        <select disabled={desabilitado} name={name} className="form-select" onChange={onChangeValor} style={{height: 58}} value={valorSelecionado}>
            <option value="" defaultValue hidden>Selecionar {descricao}</option>
            {itensCombo && itensCombo.map(i=> <option key={i.id} value={i.id}>{i.descricao}</option>)}
        </select>
    );
}

function InputButton({name, descricao, submmit = false, classeIcone, onClick, loading, cor, habilitado = true}){
    const [desabilitado, setDesabilitado] = useState(false);

    async function handleClick(e){
        if(!submmit && !desabilitado){
            setDesabilitado(true);
            if(onClick){
                try {
                    onClick().finally( () => setDesabilitado(false) );
                } catch {
                    setDesabilitado(false);
                }
            }
        }
    }

    return (
        <div className={styles.form_control}>
            <button disabled={desabilitado || loading || !habilitado} onClick={handleClick} className={styles.botao + " form-control " + styles[cor]} type={submmit? "submit":"button"} name={name} id={name}>
            
            {
                (desabilitado || loading) ? 
                <span className={`spinner-border spinner-border-sm ${styles.spinner}`} aria-hidden="true"></span>
                :
                <>
                    { descricao && <span className={styles.descricao_botao}>{descricao}</span> }
                    <i className={`${classeIcone} ${styles.icone_botao}`}></i>
                </>
            }
            </button>
        </div> 
    )
}

function InputTextArea({name, descricao, valor, onChange}){
    return (
        <div className={`input-group ${styles.form_control}`}>
            <div className="form-floating">
                <textarea className={`form-control ${styles.text_area}`} placeholder={descricao} id={name} name={name} value={valor} onChange={onChange} required></textarea>
                <label>{descricao}</label>
            </div>      
        </div>
    );
}

function InputPassword({name, descricao, valor, onChange}){
    const [tipoImg, setTipoImg] = useState({ tipo: "password", img: ""});

    function handleCLickMostrarSenha(){
        setTipoImg({ tipo: tipoImg.tipo === "password" ? "text" : "password", img: tipoImg.img === "" ? "-fill" : "" });
    }

    return (
        <div className={styles.div_senha}>
            <div className={styles.form_control_senha}>
                <div className="form-floating">
                    <input type={tipoImg.tipo} className={`form-control ${styles.input_senha}`} name={name} value={valor} placeholder="padrao" onChange={onChange} required/>
                    <label>{descricao}</label>
                </div>
            </div>
            <button className={styles.btn_mostrar_senha} onClick={handleCLickMostrarSenha} type="button" id="1"><i className={`$bi bi-eye${tipoImg.img} fs-2`}></i></button>
        </div>
    )
}

function FileInput({name, descricao, valor, onChange}){
    return (
        <div className={`mb-3 ${styles.input_file}`}>
           <label htmlFor="formFile" className="form-label">Selecionar arquivo de currículo</label>
           <input name={name} className="form-control" type="file" id="formFile" onChange={onChange}></input>
        </div>
    )
}

export { Input, InputButton, InputTextArea, InputPassword, Select, FileInput }