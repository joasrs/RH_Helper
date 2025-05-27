import { Input, InputButton, InputPassword } from "../../form/Input"
import styles from "./Login.module.css";
import { useContext, useState } from "react";
import { Context } from "../../../context/UsuarioContext";
import useErroPadrao from "../../../hooks/useErroPadrao";

export default function Login() {
    const { autenticar } = useContext(Context);
    const [usuario, setUsuario] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setErroPadrao } = useErroPadrao();

    function handleChange(e){
        setUsuario( { ...usuario, [e.target.name]: [e.target.value] });
    }

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        autenticar("login", usuario).catch((error) => {
            setErroPadrao(error);
            setLoading(false);
        });
    }

    return (
        <div className={styles.container_login}>
            <div className={styles.div_titulo}>
                <h4><span className={styles.span_entre_no_ritmo}>Centralize seus processos seletivos!</span> Entre agora e gerencie os currículos em um só lugar.</h4>
            </div>
            <div className={styles.div_form_login}>
                <form onSubmit={handleSubmit} className={styles.form_login}>
                    <Input tipo="text" name="login" descricao="Login" placeholder="Login" onChange={handleChange}/>
                    <InputPassword name="senha" descricao="Senha" onChange={handleChange}/>
                    <InputButton descricao="Entrar" submmit={true} classeIcone="bi bi-box-arrow-in-right" loading={loading}/>
                </form>
            </div>
        </div>
    )
}