import { useState } from 'react';
import styles from './Input.module.css';

function Input({tipo, name, descricao, valor, mensagemInvalido, onChange}){
    return (
        <div className={styles.form_control}>
            <div className="form-floating">
                <input className="form-control" type={tipo} name={name} id={name} value={valor} placeholder="placeholder" onChange={onChange} required/>
                <label>{descricao}</label>
            </div>
            <span className="invalid-feedback">{mensagemInvalido}</span>  
        </div>
    )
}

function InputButton({name, descricao, submmit = false, classeIcone, onClick, loading}){
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
            <button disabled={desabilitado || loading} onClick={handleClick} className={styles.botao + " form-control " + styles.input_gradiente} type={submmit? "submit":"button"} name={name} id={name}>
            
            {
                desabilitado || loading ? 
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

export { Input, InputButton, InputTextArea, InputPassword }