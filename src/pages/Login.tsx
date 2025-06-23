import { useForm } from "react-hook-form";
import { Login } from "../models/Login";
import { LoginController } from "../controllers/LoginController";
import "./Login.css";

function login(){
  let login = new Login();
  let loginController = new LoginController();
  login.setEmail((document.getElementById('username') as HTMLInputElement).value);
  login.setSenha((document.getElementById('password') as HTMLInputElement).value);
  loginController.login(login);
}

function cadastrar(){
    window.location.href = "/usuarios";
}

function mudarIp(){
    localStorage.setItem('api','http://' + prompt('URL e porta da API') + '/api');
}

function usuariosLogados(){
    window.location.href = "/usuarioslogados";
}

function LoginPage() {
    var { handleSubmit } = useForm();
    sessionStorage.clear();

    return (
        <main>
            <div id="login">
                <button className="secondary" onClick={usuariosLogados}>Usuários Logados</button>
                <button className="secondary" onClick={mudarIp}>Mudar API</button>
                <h1>Login</h1>
                <form onSubmit={handleSubmit(() => login())}>
                    <label htmlFor="username">Email</label>
                    <input id="username" type="email" />
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" />
                    <br />
                    <button type="submit">Enviar</button>
                </form>
                <button className="secondary" onClick={cadastrar}>Cadastrar</button>
            </div>
        </main>
    )
}
export default LoginPage;