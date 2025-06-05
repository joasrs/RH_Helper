import styles from './MenuLateral.module.css'
import ItemMenu from './ItemMenu';

export default function MenuLateral({children}) {

  const itens = [{
    icone: "bi bi-person-badge",
    descricao: "Candidatos",
    subItens: [{descricao: "Consultar Candidatos", icone: "bi bi-search", rota: "/"}, {descricao: "Adicionar Candidatos", icone: "bi bi-plus", rota: "/cadastro-candidato"}]
  }, {
    icone: "bi bi-person-fill-exclamation",
    descricao: "Status",
    subItens: [{descricao: "Consultar Status", icone: "bi bi-search", rota: "/status"}, {descricao: "Adicionar Status", icone: "bi bi-plus", rota: "/cadastro-status"}]
  },{
    icone: "bi bi-briefcase-fill",
    descricao: "Cargo",
    subItens: [{descricao: "Consultar Cargo", icone: "bi bi-search", rota: "/cargo"}, {descricao: "Adicionar Cargo", icone: "bi bi-plus", rota: "/cadastro-cargo"}]
  },{
    icone: "bi bi-bar-chart-steps",
    descricao: "Trilhas",
    subItens: [{descricao: "Consultar Trilhas", icone: "bi bi-search", rota: "/trilha"}, {descricao: "Adicionar Trilha", icone: "bi bi-plus", rota: "/cadastro-trilha"}]
  }]

  return (
    <>
    <div className={styles.menu_lateral}>
      <ul className={styles.lista}>
        {itens.map((i, index) => <ItemMenu key={index} item={i}/>)}
      </ul>
    </div>
      {children}
    </>
  );
}