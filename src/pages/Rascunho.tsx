import { useForm } from "react-hook-form";
import './Rascunho.css';
import { Rascunho } from "../models/Rascunho";
import { RascunhoController } from "../controllers/RascunhoController";

let rascunho = new Rascunho();
let rascunhoController = new RascunhoController();

function salvar(){
    rascunho.setCorpo((document.getElementById('corpo') as HTMLTextAreaElement).value);
    rascunho.setAssunto((document.getElementById('assunto') as HTMLInputElement).value);
    rascunho.setEmailDestinatario((document.getElementById('email') as HTMLInputElement).value);
    if((rascunho.getCorpo() == '') && (rascunho.getAssunto() == '') && (rascunho.getEmailDestinatario() == '')){
        alert("Necessário preencher pelo menos 1 campo!");
        return;
    }
    if(rascunho.getRascunhoId() != 0){
        rascunhoController.updateRascunho(rascunho).then((response) => {
            if(response.status == 200){
                alert('Rascunho atualizado com sucesso!');
                window.location.href = '/inicio';
            }else{
                alert(response.response.data.mensagem);
            }
        })
    }else{
        rascunhoController.createRascunho(rascunho).then((response) => {
            if(response.status == 200){
                alert('Rascunho criado com suesso!');
                window.location.href = '/inicio';
            }else{
                alert(response.response.data.mensagem);
            }
        })
    }
}

function voltar(){
    if(sessionStorage.getItem('token') != null){
        window.location.href = "/inicio";
        sessionStorage.removeItem('rascunho');
    }else{
        window.location.href = "/";
        sessionStorage.clear();
    }
}

function deleteRascunho(){
    rascunhoController.deleteRascunho(sessionStorage.getItem('rascunho')).then((response) => {
        if(response.status == 200){
            alert('Sucesso ao excluir o rascunho');
            sessionStorage.removeItem('rascunho');
            window.location.href = "/inicio";
        }else{
            alert(response.response.data.mensagem);
        }
    })

}

function load(){
    if(sessionStorage.getItem('rascunho') != null){
        rascunhoController.getRascunho(sessionStorage.getItem('rascunho')).then((response) => {
            if(response.status == 200){
                rascunho.setRascunhoId(response.data.rascunho.rascunhoId);
                (document.getElementById("assunto") as HTMLInputElement).value = response.data.rascunho.assunto;
                (document.getElementById('corpo') as HTMLTextAreaElement).value = response.data.rascunho.corpo;
                (document.getElementById("email") as HTMLInputElement).value = response.data.rascunho.emailDestinatario;
                (document.getElementById('delete') as HTMLButtonElement).disabled = false;
                (document.getElementById('delete') as HTMLButtonElement).addEventListener('click', deleteRascunho);
            }else{
                alert(response.response.data.mensagem);
            }
        })
    }
}

function RascunhoPage(){

    var { handleSubmit } = useForm();

    load();

    return (
        <>
            <header>
                <button className="secondary" onClick={voltar}>Voltar</button>
            </header>
            <main>
                <div id="rascunho">
                    <h1>Rascunho</h1>
                    <form onSubmit={handleSubmit(() => salvar())}>
                        <label htmlFor="assunto">Assunto</label>
                        <input type="text" id="assunto" />
                        <label htmlFor="email">Email Destinatário</label>
                        <input type="email" id="email" />
                        <label htmlFor="corpo">Corpo</label>
                        <textarea id="corpo" />
                        <button type="submit">Salvar</button>
                    </form>
                    <button className="danger" id="delete" disabled>Deletar</button>
                </div>
            </main>
        </>
    )
}
export default RascunhoPage;