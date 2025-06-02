import { Usuario } from "../models/Usuario";
import { UsuarioController } from "../controllers/UsuarioController";
import { useForm } from "react-hook-form";
import './Usuario.css';

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
                (document.getElementById('delete') as HTMLButtonElement).disabled = false;
                (document.getElementById('delete') as HTMLButtonElement).addEventListener('click',deletar);
            }else{
                alert(response.response.data.mensagem);
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
    usuario.setNome((document.getElementById('name') as HTMLInputElement).value);
    usuario.setSenha((document.getElementById('password') as HTMLInputElement).value);
    usuario.setEmail((document.getElementById('email') as HTMLInputElement).value);
    if(usuario.getId() != 0){
        usuarioController.updateUsuario(usuario).then((response) => {
            if(response.status == 200){
                alert("Usuário atualizado com sucesso!");
                window.location.href = "/inicio";
            }else{
                alert(response.response.data.mensagem);
            }
        })
    }else{
        usuarioController.createUsuario(usuario).then((response) => {
            if(response.status == 201){
                alert("Usuário criado com sucesso!");
                window.location.href = "/";
            }else{
                alert(response.response.data.mensagem);
            }
        })
    }
}

function deletar(){
    usuarioController.deleteUsuario().then((response) => {
        if(response.status == 200){
            alert("Usuário deletado com sucesso!");
            window.location.href = "/";
        }else{
            alert(response.response.data.mensagem);
        }
    })
}

function UsuarioPage(){

    var { handleSubmit } = useForm();

    find();

    return (
        <>
            <header>
                <button className="secondary" onClick={voltar}>Voltar</button>
            </header>
            <main>
                <div id="usuario">
                    <h1>Usuario</h1>
                    <form onSubmit={handleSubmit(() => salvar())}>
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" required />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required />
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" required />
                        <button type="submit">Salvar</button>
                    </form>
                    <button className="danger" id="delete" disabled>Deletar</button>
                </div>
            </main>
        </>
    )
}
export default UsuarioPage;