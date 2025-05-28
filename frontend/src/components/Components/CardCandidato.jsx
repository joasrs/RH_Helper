import styles from './CardCandidato.module.css'

export default function CardCandidato({candidato, onClickRemoverCandidato}) {
    // <table className={`table table-striped table-hover ${styles.tabela}`} >
            //     <thead>
            //         <tr>
            //         <th scope="col">Nome</th>
            //         <th scope="col">E-mail</th>
            //         <th scope="col">Telefone</th>
            //         <th scope="col">Status</th>
            //         <th scope="col">Endereço</th>
            //         <th scope="col"></th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {
            //             candidatos && candidatos.map((e, index) => (
            //                 <tr key={index}>
            //                 <td>{e.nome}</td>
            //                 <td>{e.email}</td>
            //                 <td>{e.telefone}</td>
            //                 <td>{e.obsStatus}</td>
            //                 <td>{e.endereco}</td>
            //                 <td><button className={`btn btn-danger bi bi-x-circle ${styles.botao_excluir}`} onClick={() => handleClickRemoverCandidato(e.id)}></button></td>
            //                 </tr>
            //             ))
            //         }
            //     </tbody>
            //     </table>

        //     <div className="card border-success mb-3">
        //     <div className="card-header bg-transparent">{candidato.nome}</div>
        //     <div className="card-body">
        //         <h5 className="card-title">Success card title</h5>
        //         <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
        //     </div>
        //     <div className="card-footer bg-transparent border-success">Status: {candidato.obsStatus}</div>
        // </div>
    console.log();
    return (
        <>
            <div className={`card mb-3 ` + styles.card}>
                <div className={`card-header bg-transparent ` + styles.card_header}>
                    <h5 className="card-title">{candidato.nome}</h5>
                    <button id='botaoExcluir' data-bs-toggle="modal" data-bs-target="#exampleModal" className={`btn btn-danger bi bi-x-circle ${styles.botao_excluir}`}></button></div>
                <div className={`card-body ` + styles.corpo_card}>
                    <div className={styles.campo}>
                        <span className={styles.titulo}>Telefone:</span>
                        <span className={styles.conteudo}>{candidato.telefone}</span>       
                    </div>
                    <div className={styles.campo}>
                        <span className={styles.titulo}>E-mail:</span>
                        <span className={styles.conteudo}>{candidato.email}</span>       
                    </div>
                    <div className={styles.campo}>
                        <span className={styles.titulo}>Cargo:</span>
                        <span className={styles.conteudo}>{candidato.Cargo?.descricao}</span>       
                    </div>
                </div>
                <div className={`card-footer bg-transparent ${styles.div_status}`}> 
                    <span>Status:</span>
                    {candidato.Status && <div className={styles.div_status_cor} style={{backgroundColor: `${candidato.Status?.cor}`}}>
                        {candidato.Status?.descricao}
                    </div>}
                </div>
            </div>

            <div className={`modal fade ` + styles.modal} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Deseja excluir o candidato realmente?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Sim</button>
                        <button type="button" className="btn btn-primary">Cancelar</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}