import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/auth/Login";
import CadastroUsuario from "./components/Pages/auth/CadastroUsuario";
import Navbar from "./components/Layout/Navbar";
import Container from "./components/Layout/Container";
import { UsuarioProvider } from "./context/UsuarioContext";
import Mensagem from "./components/Layout/Mensagem";
import CadastroCandidato from "./components/Pages/candidato/CadastroCandidato";
import MenuLateral from "./components/Layout/MenuLateral/MenuLateral";
import CargoCadastro from "./components/Pages/cargo/CargoCadastro";

function AppComposicao(){
  const location = useLocation();

  // Páginas que NÃO devem mostrar o menu
  const ocultarPaginas = ['/login', '/cadastro-usuario'];

  const mostrarMenuLateral = !ocultarPaginas.includes(location.pathname);

  return (
    <UsuarioProvider>
          <Navbar />
          <Mensagem msg="" tipo="" />
          <Container>
            {mostrarMenuLateral ? (
              <MenuLateral>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cadastro-candidato" element={<CadastroCandidato />} />
                  <Route path="/status" element={<CadastroCandidato />} />
                  <Route path="/cadastro-status" element={<CadastroCandidato />} />
                  <Route path="/cargo" element={<CadastroCandidato />} />
                  <Route path="/cadastro-cargo" element={<CargoCadastro />} />
                </Routes>
              </MenuLateral>
            ) : (
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
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
