import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/auth/Login";
import CadastroUsuario from "./components/Pages/auth/CadastroUsuario";
import Navbar from "./components/Layout/Navbar";
import Container from "./components/Layout/Container";
import { UsuarioProvider } from "./context/UsuarioContext";
import Mensagem from "./components/Layout/Mensagem";
import RotaProtegida from "./components/RotaProtegida/RotaProtegida";
import CadastroCandidato from "./components/Pages/candidato/CadastroCandidato";

function App() {
  //const [autenticado, setAutenticado] = useState(localStorage.getItem('token-rh') ? true : false);
  
  // useEffect(() => {
  //   setAutenticado(localStorage.getItem('token-rh') ? true : false);
  // }, []);

  //<Route path="/" element={<Home />} />
  //<Route path="/" element={ <RotaProtegida autenticado={localStorage.getItem('token-rh') ? true : false}><Home /></RotaProtegida>}/>
  return (
    <Router>
      <UsuarioProvider>
        <Navbar/>
        <Mensagem msg="" tipo=""/>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
            <Route path="/cadastro-candidato" element={<CadastroCandidato />} />
          </Routes>
        </Container>
      </UsuarioProvider>
    </Router>
  );
}

export default App;
