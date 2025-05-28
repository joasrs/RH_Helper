import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/auth/Login";
import UsuarioCadastro from "./components/Pages/auth/UsuarioCadastro";
import Navbar from "./components/Layout/Navbar";
import Container from "./components/Layout/Container";
import { UsuarioProvider } from "./context/UsuarioContext";
import Mensagem from "./components/Layout/Mensagem";
import MenuLateral from "./components/Layout/MenuLateral/MenuLateral";
import CargoCadastro from "./components/Pages/cargo/CargoCadastro";
import StatusCadastro from "./components/Pages/status/StatusCadastro";
import PaginaNaoEncontrada from "./components/Pages/PaginaNaoEncontrada";
import CandidatoCadastro from "./components/Pages/candidato/CandidatoCadastro";

function AppComposicao(){
  const location = useLocation();

  // Páginas que NÃO devem mostrar o menu
  const mostrarMenuPaginas = ['/', '/cadastro-candidato', '/status', '/cadastro-status', '/cargo', '/cadastro-cargo'];

  const mostrarMenuLateral = mostrarMenuPaginas.includes(location.pathname);
  return (
    <UsuarioProvider>
          <Navbar />
          <Mensagem msg="" tipo="" />
          <Container>
            {mostrarMenuLateral ? (
              <MenuLateral>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cadastro-candidato" element={<CandidatoCadastro />} />
                  <Route path="/cargo" element={<Home />} />
                  <Route path="/cadastro-cargo" element={<CargoCadastro />} />
                  <Route path="/status" element={<Home />} />
                  <Route path="/cadastro-status" element={<StatusCadastro />} />
                </Routes>
              </MenuLateral>
            ) : (
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuario" element={<UsuarioCadastro />} />
                <Route path="*" element={<PaginaNaoEncontrada />} />
              </Routes>
            )}
          </Container>
        </UsuarioProvider>
      )
}

function App() {
  return (
    <Router>
      <AppComposicao/>
    </Router>
  );
}

export default App;
