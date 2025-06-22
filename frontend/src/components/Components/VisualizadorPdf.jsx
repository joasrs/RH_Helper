import styles from "./VisuzalizadorPdf.module.css"
import { Document, Page } from 'react-pdf';
import { useState } from 'react';

export default function VisuzalizadorPdf({arquivo}){
    const [numPages, setNumPages] = useState();

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return ( 
        <div className="modal fade modal-xl" id="modalVisualizarPdf" tabIndex="-1" aria-labelledby="modalVisualizarPdfLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modalVisualizarPdfLabel">Visualizador de PDF</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className={`modal-body`}>
                    { 
                        <Document className={styles.body_modal_pdf} file={arquivo} noData={"O currículo não foi carregado ou não foi encontrado."} loading="Carregando currículo..." error="Não foi possível carregar o currículo" onLoadSuccess={onDocumentLoadSuccess}>
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page className={styles.pagina} key={`page_${index + 1}`} pageNumber={index + 1} renderAnnotationLayer={false} renderTextLayer={false}/>
                            ))}
                        </Document>
                    }
                </div>
                </div>
            </div>
        </div>
    );
}
