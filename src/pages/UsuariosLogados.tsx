import { useEffect, useState } from "react";
import "./UsuariosLogados.css";
import { LoginController } from "../controllers/LoginController";

let loginController = new LoginController();

function voltar(){
    window.location.href = "/";
}

function UsuariosLogadosPage() {

    const [usuariosRequestList, setUsuariosRequestList] = useState<string[]>([]);

    function findUsuarios() {
        loginController.logged().then((response) => {
            if(response.status == 200){
                let usuarios:[] = response.data.mensagem;
                setUsuariosRequestList(usuarios);
            }else{
                alert("mesangem: " + response.response.data.mensagem + "\nerro: " + response.response.data.mensagem);
            }
        })
    }

    useEffect(() => {
        findUsuarios();

        const intervalo = setInterval(findUsuarios, 500);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <main>
            <div id="usuariosLogados">
                <button className="secondary" onClick={voltar}>Voltar</button>
                <h1>Usuários Logados</h1>
                <div id="rascunhos">{usuariosRequestList.map((usuarioObj, index) => (
                        <div key={index} className="usuario">
                            <p>{usuarioObj}</p>
                        </div>
                    ))}</div>
            </div>
        </main>
    )
}
export default UsuariosLogadosPage;