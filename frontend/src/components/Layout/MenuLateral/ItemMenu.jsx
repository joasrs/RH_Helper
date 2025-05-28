import { Link } from 'react-router-dom';
import styles from './ItemMenu.module.css'
import { useState } from 'react';

export default function ItemMenu({item}){
    const [subItemHabilitado, setSubItemHabilitado] = useState(false);

    function toggleOpcoes(){
        setSubItemHabilitado((current) => !current);
    }

    return (
        <li className={styles.item_lista}>
          <Link className={styles.link} to={item.rota} onClick={toggleOpcoes}>
            <div className={styles.item_header}>
                <div>
                    <i className={item.icone} style={{marginRight: 15}}></i>
                    <span>{item.descricao}</span>
                </div>
                {item.subItens && <i className={`bi bi-caret-${subItemHabilitado ? "up" : "down"}-fill`} style={{fontSize: "10px"}}></i>}
            </div>
          </Link>
            {subItemHabilitado && 
                <div className={styles.sub_itens}>
                    {item.subItens && item.subItens.map((si, index) => <Link key={index} className={`${styles.link_sub_item} ${styles.link}`} to={si.rota}><i className={si.icone} style={{marginRight: 15}}></i>{si.descricao}</Link>)}
                </div>
            }      
        </li>
    )
}