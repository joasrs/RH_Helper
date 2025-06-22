import styles from './StatusConsulta.module.css'
import { useEffect, useState } from "react"
import useErroPadrao from '../../../hooks/useErroPadrao';
import useStatus from '../../../hooks/useStatus';
import { useNavigate } from "react-router-dom";

export default function StatusConsulta() {      
    const [status, setStatus] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const { consultarStatus } = useStatus();
    const { setErroPadrao } = useErroPadrao();
    const navigate = useNavigate();

    useEffect(()=> {
        if( !!localStorage.getItem('token-rh') ){
            consultarStatus()
                .then((data) => {          
                    if(!data) { throw new Error("Não possível encontrar os status, estamos trabalhando pra resolver essa situação o mais rápido possível!") }
                    setStatus(data);
                })
                .catch((error) => setErroPadrao(error) ).finally(() => setCarregando(false));
        }
        else{
            navigate("/login");
        }
    }, [consultarStatus, setErroPadrao]);
            
    return (
        <div className={styles.div_home}>
            <h2 style={{textAlign: "center"}}>Status</h2>
              <table className={`table table-striped table-hover ${styles.tabela}`} >
                <thead>
                    <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Obs</th>
                    <th scope="col">Data de Cadastro</th>
                    <th scope="col">Cor</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        status && status.map((e, index) => (
                            <tr key={index} onClick={() => navigate('/cadastro-status', { state: e })}>
                            <td>{e.descricao}</td>
                            <td>{e.obs}</td>
                            <td>{e.createdAt}</td>
                            <td><input className={styles.input_color} disabled type="color" value={e.cor}/></td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
        </div>
    )
}