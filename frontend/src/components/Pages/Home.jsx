import { useEffect, useState } from "react"
import useErroPadrao from "../../hooks/useErroPadrao";
import styles from "./Home.module.css"
import useCandidato from "../../hooks/useCandidato";
import { useNavigate } from "react-router-dom";
import CardCandidato from "../Components/CardCandidato";

export default  function Home() {
    const [candidatos, setCandidatos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const { consultarCandidatos } = useCandidato();
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
         
    return (
        <div className={styles.div_home}>
            {
                candidatos && candidatos.map((e, index) => (
                    <CardCandidato key={index} candidato={e}/>              
                ))
            }
        </div>
    )
}