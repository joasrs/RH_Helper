import styles from "./ImagemUsuario.module.css"

export default function ImagemUsuario({source, tamanho}){
    return (
        <div className={styles.div_imagem_usuario}>
            <img className={styles.imagem_usuario} src={source} style={{width: tamanho + 'px', height: tamanho + 'px'}}></img>
        </div>
    )
}
