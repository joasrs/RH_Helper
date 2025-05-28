import { useState, useEffect } from 'react'
import styles from './Mensagem.module.css'
import bus from '../../utils/bus';
import { Alert } from '@mui/material';

export default function Mensagem(){
    const [visivel, setVisivel] = useState(false);
    const [tipo, setTipo ] = useState('success');
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const listener = ({mensagem, tipo}) => {
            setVisivel(true);
            setTipo(tipo);
            setMensagem(mensagem);
            
                setTimeout( () => {
                    setVisivel(false);
                }, 5000 ); // 5s
        }

        bus.addListener('flash', listener);

        return ( () => {
            bus.removeListener('flash', listener);
        } );
    }, []);

    return (    
        visivel && ( <Alert variant="filled" className={styles.message} severity={tipo}>{mensagem}</Alert>)
    )
}