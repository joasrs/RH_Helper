import styles from './Form.module.css';
import Input from './Input';
import InputButton from './InputButton';

export default function Form(){
    return (
        <form>
            <Input tipo={'text'} name={'nome'} descricao={'Nome'} placeholder={'Nome aqui'} mensagemInvalido={'deu erro'} />
            <Input tipo={'email'} name={'email'} descricao={'E-mail'} placeholder={'E-mail aqui'} />
            <Input tipo={'text'} name={'login'} descricao={'Login'} placeholder={'Login aqui'} />
            <Input tipo={'password'} name={'senha'} descricao={'Senha'} placeholder={'Senha aqui'} />
            <Input tipo={'password'} name={'senhaConfirmacao'} descricao={'Confirmar Senha'} placeholder={'Confirmar Senha aqui'} />
            <InputButton descricao={'Cadastrar'} submmit={true} />
        </form>
    )
}