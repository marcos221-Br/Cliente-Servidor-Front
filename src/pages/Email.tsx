import { useForm } from "react-hook-form";
import './Email.css';
import { Email } from "../models/Email";
import { EmailController } from "../controllers/EmailController";

let email = new Email();
let emailController = new EmailController();
let destinatario = "";
let data = "";

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

function responderEmail(){
    email.setAssunto("RE: " + (document.getElementById("assunto") as HTMLInputElement).value);
    email.setCorpo("\n\n--------------------\nResposta do último Email\nDE: " + (document.getElementById("emailField") as HTMLInputElement).value + "\nPARA: " + destinatario + "\nDATA: " + data +
    "\nASSUNTO: " + (document.getElementById("assunto") as HTMLInputElement).value + "\nCORPO: " + (document.getElementById('corpo') as HTMLTextAreaElement).value);
    email.setEmailDestinatario((document.getElementById("emailField") as HTMLInputElement).value);
    (document.getElementById('corpo') as HTMLTextAreaElement).value = email.getCorpo();
    (document.getElementById('corpo') as HTMLTextAreaElement).readOnly = false;
    (document.getElementById('labelEmail') as  HTMLLabelElement).innerHTML = "Email Destinatário";
    (document.getElementById('send') as HTMLButtonElement).disabled = true;
    (document.getElementById('enviar') as HTMLButtonElement).disabled = false;
}

function load(){
    if(sessionStorage.getItem('email') != null){
        emailController.getEmail(sessionStorage.getItem('email')).then((response) => {
            if(response.status == 200){
                (document.getElementById("assunto") as HTMLInputElement).value = response.data.email.assunto;
                (document.getElementById('corpo') as HTMLTextAreaElement).value = response.data.email.corpo;
                (document.getElementById("emailField") as HTMLInputElement).value = response.data.email.emailRemetente;
                destinatario = response.data.email.emailDestinatario;
                data = response.data.email.dataEnvio;
                (document.getElementById("assunto") as HTMLInputElement).readOnly = true;
                (document.getElementById('corpo') as HTMLTextAreaElement).readOnly = true;
                (document.getElementById("emailField") as HTMLInputElement).readOnly = true;
                (document.getElementById('enviar') as HTMLButtonElement).disabled = true;
                (document.getElementById('labelEmail') as  HTMLLabelElement).innerHTML = "Email Remetente";
                (document.getElementById('send') as HTMLButtonElement).disabled = false;
                (document.getElementById('send') as HTMLButtonElement).addEventListener('click', responderEmail);
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
                        <label htmlFor="emailField" id="labelEmail">Email Destinatário</label>
                        <input type="email" id="emailField" required/>
                        <label htmlFor="corpo">Corpo</label>
                        <textarea id="corpo" required/>
                        <button id="enviar" type="submit">Enviar</button>
                    </form>
                    <button className="send" id="send" disabled>Responder</button>
                </div>
            </main>
        </>
    )
}
export default EmailPage;