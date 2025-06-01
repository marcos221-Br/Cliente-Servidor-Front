import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogiPage from './pages/Login';
import { HttpConection } from './components/Json';
import UsuarioPage from './pages/Usuario';
import Home from './pages/Home';

function setupHttp(){
  HttpConection.setHeader('Content-Type','application/json')
}

setupHttp();

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LogiPage />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/usuarios" element={<UsuarioPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
