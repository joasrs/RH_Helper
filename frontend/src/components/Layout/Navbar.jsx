import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import Logo from '../../assets/img/rh_helper.ico'
import { useContext } from 'react'
import { Context } from '../../context/UsuarioContext'
import ImagemUsuario from '../Components/ImagemUsuario' 

export default function Navbar(){
    const { usuario, logout } = useContext(Context);
    return (
        <nav className={styles.navbar} id="navbar">
            <div className={styles.navbar_logo}>
                <h1><Link to="/">RH Helper</Link></h1>
            </div>
            <ul className={styles.lista_opcoes}>
                <div id={styles.nav_botoes}>
                    {
                        usuario.autenticado ? 
                        <>
                            <li className={styles.item_lista}>
                                <div className="dropdown">
                                    <div className={`dropdown-toggle ${styles.div_dropdown_usuario}`} data-bs-toggle="dropdown" aria-expanded="false">
                                        <ImagemUsuario source={usuario.urlImagemPerfil} tamanho={50}/>
                                    </div>
                                    <ul className={`dropdown-menu ${styles.itens_dropdown}`}>
                                        <li onClick={logout} className={`${styles.logout} ${styles.li_dropdown}`} >
                                            <a className={`${styles.logout} ${styles.a_dropdown}`} href="#">
                                                <i className={`bi bi-box-arrow-left ${styles.item_dropdown} ${styles.logout}`}></i>
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </>                  
                        : 
                        <>
                            <li className={styles.item_lista}>
                                <Link className={`${styles.botao_link}  ${styles.botao_hover}`} to="/cadastro-usuario">CRIE SUA CONTA</Link>
                            </li>
                            <li className={styles.item_lista}>
                                <Link className={`${styles.botao_link}  ${styles.botao_hover}`} to="/login">LOGIN</Link>
                            </li>
                        </>
                    }
                </div>
            </ul>
        </nav>
    )
}