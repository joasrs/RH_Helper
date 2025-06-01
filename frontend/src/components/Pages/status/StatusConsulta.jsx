import styles from './StatusConsulta.module.css'
import { useEffect, useState } from "react"
import useErroPadrao from '../../../hooks/useErroPadrao';
import useStatus from '../../../hooks/useStatus';
import { useNavigate } from "react-router-dom";

export default function StatusConsulta() {      
    const [status, setStatus] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const { consultarStatus, removerStatus } = useStatus();
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

    function handleClickRemoverStatus(idStatus){
        removerStatus(idStatus).then((status) => {
            if(status && status === 200){
                setStatus(status.filter( e => e.id != idStatus ));
            }
        }).catch((error) => setErroPadrao(error));
    }
            
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
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        status && status.map((e, index) => (
                            <tr key={index}>
                            <td>{e.descricao}</td>
                            <td>{e.obs}</td>
                            <td>{e.createdAt}</td>
                            <td>{e.cor}</td>
                            <td><button className={`btn btn-danger bi bi-x-circle ${styles.botao_excluir}`} onClick={() => handleClickRemoverStatus(e.id)}></button></td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
        </div>
    )
}