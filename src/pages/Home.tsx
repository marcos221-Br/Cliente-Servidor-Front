import { useEffect, useState } from "react";
import { LoginController } from "../controllers/LoginController";
import { RascunhoController } from "../controllers/RascunhoController";
import './Home.css';

let rascunhoController = new RascunhoController();

interface RascunhoMetadataRequest{
    id?: number;
    assunto?: string;
    corpo?: string;
    emailDestinatario?: string;
}

function logout(){
    let loginController = new LoginController();
    loginController.logout();
}

function getRascunho(rascunho:any){
    sessionStorage.setItem("rascunho",rascunho);
    window.location.href = "/rascunhos"
}

function Home() {

    const [rascunhoRequestList, setRascunhoRequestList] = useState<RascunhoMetadataRequest[]>([]);

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
    let executedRequest = false;
    useEffect(() => {
        if (!executedRequest) {
            executedRequest = true;
            findRascunhos();
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
                </div>
            </main>
        </>
    )
}
export default Home;