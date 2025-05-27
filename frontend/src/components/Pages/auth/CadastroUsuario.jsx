import { useContext, useState } from "react";
import { Input, InputButton, InputPassword } from "../../form/Input";
import { Context } from '../../../context/UsuarioContext'
import { Link } from "react-router-dom";
import styles from './CadastroUsuario.module.css'
import useErroPadrao from "../../../hooks/useErroPadrao";

function Register() {
    const [usuario, setUsuario] = useState({});
    const { autenticar } = useContext(Context)
    const [loading, setLoading] = useState(false);
    const { setErroPadrao } = useErroPadrao();

    function handleChange(e){
        setUsuario( { ...usuario, [e.target.name]: [e.target.value] });
    }

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        autenticar("add", usuario).catch((error) => {
            setErroPadrao(error);
            setLoading(false);
        });  
    }

    return (
        <div className={styles.container_cadastro}>
            <div className={styles.div_titulo}>
                <h4><span>Facilite sua rotina de seleção! </span>Cadastre-se agora e comece a cadastrar e acompanhar currículos com poucos cliques!</h4>
            </div>
            <form className={styles.form_usuario} onSubmit={handleSubmit} >
                <Input tipo="text" name="nome" descricao="Nome" placeholder="Nome aqui" mensagemInvalido="deu erro" onChange={handleChange} />
                <Input tipo="email" name="email" descricao="E-mail" placeholder="E-mail aqui"  onChange={handleChange} />
                <Input tipo="text" name="login" descricao="Login" placeholder="Login aqui" onChange={handleChange}  />
                <InputPassword name="senha" descricao="Senha" onChange={handleChange} />
                <Input tipo="password" name="senhaConfirmacao" descricao="Confirmar Senha" placeholder="Confirmar Senha aqui" onChange={handleChange}/>
                <InputButton descricao="Cadastrar" submmit={true} classeIcone="bi bi-box-arrow-in-right" loading={loading}/>
                <p>Já possui uma conta? <Link to="/login">Clique aqui.</Link> </p>
            </form>
        </div>
    )       
}

export default Register