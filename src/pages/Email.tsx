import { useForm } from "react-hook-form";
import './Email.css';
import { Email } from "../models/Email";
import { EmailController } from "../controllers/EmailController";

let email = new Email();
let emailController = new EmailController();

function salvar(){
    email.setCorpo((document.getElementById('corpo') as HTMLTextAreaElement).value);
    email.setAssunto((document.getElementById('assunto') as HTMLInputElement).value);
    email.setEmailDestinatario((document.getElementById('emailField') as HTMLInputElement).value);
    emailController.createEmail(email).then((response) => {
        if(response.status == 200){
            alert('Email criado com suesso!');
            window.location.href = '/inicio';
        }else{
            alert(response.response.data.mensagem);
        }
    })
}

function voltar(){
    if(sessionStorage.getItem('token') != null){
        window.location.href = "/inicio";
        sessionStorage.removeItem('email');
    }else{
        window.location.href = "/";
        sessionStorage.clear();
    }
}

function load(){
    if(sessionStorage.getItem('email') != null){
        emailController.getEmail(sessionStorage.getItem('email')).then((response) => {
            if(response.status == 200){
                (document.getElementById("assunto") as HTMLInputElement).value = response.data.email.assunto;
                (document.getElementById('corpo') as HTMLTextAreaElement).value = response.data.email.corpo;
                (document.getElementById("emailField") as HTMLInputElement).value = response.data.email.emailRemetente;
                (document.getElementById('enviar') as HTMLButtonElement).disabled = true;
            }else{
                alert(response.response.data.mensagem);
            }
        })
    }
}

function EmailPage(){

    var { handleSubmit } = useForm();

    load();

    return (
        <>
            <header>
                <button className="secondary" onClick={voltar}>Voltar</button>
            </header>
            <main>
                <div id="email">
                    <h1>Email</h1>
                    <form onSubmit={handleSubmit(() => salvar())}>
                        <label htmlFor="assunto">Assunto</label>
                        <input type="text" id="assunto" required/>
                        {email.getEmailId() != 0 ? <label htmlFor="emailField">Email Remetente</label> : <label htmlFor="emailField">Email Destinatário</label>}
                        <input type="email" id="emailField" required/>
                        <label htmlFor="corpo">Corpo</label>
                        <textarea id="corpo" required/>
                        <button id="enviar" type="submit">Enviar</button>
                    </form>
                </div>
            </main>
        </>
    )
}
export default EmailPage;