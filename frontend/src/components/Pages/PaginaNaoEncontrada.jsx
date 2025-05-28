export default function PaginaNaoEncontrada(){
    return (
        <div className="principal">
            <h1 style={{fontSize: 5.5 + "em", color: "burlywood"}}>404</h1>
            <h3>Página não encontrada!</h3>
            <h4>Clique <a href="/" style={{textDecoration: "underline"}}>aqui</a> para voltar para a página principal</h4>
        </div>
    );
}