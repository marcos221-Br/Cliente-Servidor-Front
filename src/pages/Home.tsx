import { useEffect, useState } from "react";
import { LoginController } from "../controllers/LoginController";
import { RascunhoController } from "../controllers/RascunhoController";
import './Home.css';
import { EmailController } from "../controllers/EmailController";

let rascunhoController = new RascunhoController();
let emailController = new EmailController();

interface RascunhoMetadataRequest{
    id?: number;
    assunto?: string;
    corpo?: string;
    emailDestinatario?: string;
}

interface EmailMetadataRequest{
    id?: number;
    assunto?: string;
    corpo?: string;
    emailRemetente?: string;
    status?: string;
}

function logout(){
    let loginController = new LoginController();
    loginController.logout();
}

function getRascunho(rascunho:any){
    sessionStorage.setItem("rascunho",rascunho);
    window.location.href = "/rascunhos"
}

function getEmail(email:any){
    sessionStorage.setItem("email",email);
    window.location.href = "/emails"
}

function Home() {

    const [rascunhoRequestList, setRascunhoRequestList] = useState<RascunhoMetadataRequest[]>([]);
    const [emailRequestList, setEmailRequestList] = useState<EmailMetadataRequest[]>([]);

    function findRascunhos() {
        rascunhoController.findRascunhos().then((response) => {
            if(response.status == 200){
                let rascunhos = response.data.rascunhos;
                let metadata: RascunhoMetadataRequest[] = rascunhos.map((rascunho: any) => ({
                    id: rascunho.rascunhoId,
                    assunto: rascunho.assunto,
                    corpo: rascunho.corpo,
                    emailDestinatario: rascunho.emailDestinario
                }))
                setRascunhoRequestList(metadata);
            }else{
                alert(response.response.data.mensagem);
            }
        })
    }

    function findEmails() {
        emailController.findEmails().then((response) => {
            if(response.status == 200){
                let emails = response.data.emails;
                let metadata: EmailMetadataRequest[] = emails.map((email: any) => ({
                    id: email.emailId,
                    assunto: email.assunto,
                    corpo: email.corpo,
                    emailRemetente: email.emailRemetente,
                    status: email.status
                }))
                setEmailRequestList(metadata);
            }else{
                alert(response.response.data.mensagem);
            }
        })
    }

    let executedRequest = false;
    useEffect(() => {
        if (!executedRequest) {
            executedRequest = true;
            findRascunhos();
            findEmails();
        }
    }, []);

    // findRascunhos(); // Testar sv do amiguinho

    return (
        <>
            <header>
                <button className="secondary" onClick={logout}>Logout</button>
                <ul>
                    <li>
                        <a href="/usuarios">Usuario</a>
                    </li>
                    <li>
                        <a href="/rascunhos">Rascunhos</a>
                    </li>
                    <li>
                        <a href="/emails">Emails</a>
                    </li>
                </ul>
            </header>
            <main>
                <div id="home">
                    <h1>Rascunhos</h1>
                    <div id="rascunhos">{rascunhoRequestList.map((rascunhoObj, index) => (
                        <div key={index} className="rascunho" onClick={() => getRascunho(rascunhoObj.id)}>
                            <p>{rascunhoObj.assunto}</p>
                        </div>
                    ))}</div>
                    <h1>Emails</h1>
                    <div id="emails">{emailRequestList.map((emailObj, index) => (
                        <div key={index} className="email" onClick={() => getEmail(emailObj.id)}>
                            <p>{emailObj.assunto} status: {emailObj.status}</p>
                        </div>
                    ))}</div>
                </div>
            </main>
        </>
    )
}
export default Home;