import styles from './CargoConsulta.module.css'
import { useEffect, useState } from "react"
import useErroPadrao from '../../../hooks/useErroPadrao';
import useCargo from '../../../hooks/useCargo';
import { useNavigate } from "react-router-dom";

export default function CargoConsulta() {      
    const [cargo, setCargo] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const { consultarCargos } = useCargo();
    const { setErroPadrao } = useErroPadrao();
    const navigate = useNavigate();

    useEffect(()=> {
        if( !!localStorage.getItem('token-rh') ){
            consultarCargos()
                .then((data) => {          
                    if(!data) { throw new Error("Não possível encontrar os cargos, estamos trabalhando pra resolver essa situação o mais rápido possível!") }
                    setCargo(data);
                })
                .catch((error) => setErroPadrao(error) ).finally(() => setCarregando(false));
        }
        else{
            navigate("/login");
        }
    }, [consultarCargos, setErroPadrao]);
            
    return (
        <div className={styles.div_home}>
            <h2 style={{textAlign: "center"}}>Cargo</h2>
              <table className={`table table-striped table-hover ${styles.tabela}`} >
                <thead>
                    <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Média Salarial</th>
                    <th scope="col">Vagas Abertas</th>
                    <th scope="col">Data de Cadastro</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cargo && cargo.map((e, index) => (
                            <tr key={index} onClick={() => navigate('/cadastro-cargo', { state: e })}>
                            <td>{e.descricao}</td>
                            <td>{e.mediaSalarial}</td>
                            <td>{e.vagasAbertas}</td>
                            <td>{e.createdAt}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
        </div>
    )
}