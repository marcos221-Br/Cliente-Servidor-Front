import { Usuario } from "../models/Usuario";
import { UsuarioController } from "../controllers/UsuarioController";
import { useForm } from "react-hook-form";

let usuario = new Usuario();
let usuarioController = new UsuarioController();

function find(){
    if(sessionStorage.getItem('token') != null){
        usuarioController.findUsuario().then((response) => {
            if(response.status == 200){
                usuario.setId(response.data.usuario.id);
                usuario.setNome(response.data.usuario.nome);
                usuario.setEmail(response.data.usuario.email);
                (document.getElementById('name') as HTMLInputElement).value = usuario.getNome();
                (document.getElementById('email') as HTMLInputElement).value = usuario.getEmail();
                (document.getElementById('email') as HTMLInputElement).disabled = true;
            }
        })
    }
}

function voltar(){
    if(sessionStorage.getItem('token') != null){
        window.location.href = "/inicio";
    }else{
        window.location.href = "/";
    }
}

function salvar(){
    
}

function UsuarioPage(){

    var { handleSubmit } = useForm();

    find();

    return (
        <>
            <header>
                <button onClick={voltar}>Voltar</button>
            </header>
            <main>
                <div id="usuario">
                    <h1>Usuario</h1>
                    <form onSubmit={handleSubmit(() => salvar())}>
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" />
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" />
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </main>
        </>
    )
}
export default UsuarioPage;