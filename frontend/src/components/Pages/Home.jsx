import { useEffect, useState } from "react"
import useErroPadrao from "../../hooks/useErroPadrao";
import styles from "./Home.module.css"
import useCandidato from "../../hooks/useCandidato";
import { InputButton } from "../form/Input";
import { useNavigate } from "react-router-dom";

export default  function Home() {
    const [candidatos, setCandidatos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const { consultarCandidatos, removerCandidato } = useCandidato();
    const { setErroPadrao } = useErroPadrao();
    const navigate = useNavigate();

    useEffect(()=> {
        if( !!localStorage.getItem('token-rh') ){
            consultarCandidatos()
                .then((data) => {          
                    if(!data) { throw new Error("Não possível encontrar os candidatos, estamos trabalhando pra resolver essa situação o mais rápido possível!") }
                    setCandidatos(data);
                })
                .catch((error) => setErroPadrao(error) ).finally(() => setCarregando(false));
        }
        else{
            navigate("/login");
        }
    }, [consultarCandidatos, setErroPadrao]);

    function handleClickRemoverCandidato(idCandidato){
        removerCandidato(idCandidato).then((status) => {
            if(status && status === 200){
                setCandidatos(candidatos.filter( e => e.id != idCandidato ));
            }
        }).catch((error) => setErroPadrao(error));
    }

    return (
        <div className={styles.div_home}>
            <div className={styles.div_tabela}>
                <h2>Candidatos</h2>
                <InputButton descricao="Adicionar Candidato" classeIcone="bi bi-person-plus-fill" onClick={() => navigate("/cadastro-candidato")}/>
                <table className={`table table-striped table-hover ${styles.tabela}`} >
                    <thead>
                        <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Status</th>
                        <th scope="col">Endereço</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            candidatos && candidatos.map((e, index) => (
                                <tr key={index}>
                                <td>{e.nome}</td>
                                <td>{e.email}</td>
                                <td>{e.telefone}</td>
                                <td>{e.obsStatus}</td>
                                <td>{e.endereco}</td>
                                <td><button className={`btn btn-danger bi bi-x-circle ${styles.botao_excluir}`} onClick={() => handleClickRemoverCandidato(e.id)}></button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </table>
            </div>
            <div className={styles.div_controles}>
                
            </div>
        </div>

    )
}