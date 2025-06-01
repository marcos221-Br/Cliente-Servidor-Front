import { HttpConection } from "../components/Json";
import { Usuario } from "../models/Usuario";

export class UsuarioController{

    private http;
    
    public constructor(){
        this.http = new HttpConection();
    }

    public findUsuario(){
        return this.http.sendJson("/usuarios",'GET');
    }

    public createUsuario(usuario:Usuario){
        let json = JSON.stringify(usuario);
        return this.http.sendJson("/usuarios",'POST',json);
    }

    public updateUsuario(usuario:Usuario){
        let json = JSON.stringify(usuario);
        return this.http.sendJson("/usuarios",'PUT',json);
    }

    public deleteUsuario(){
        return this.http.sendJson("/usuarios",'DELETE');
    }
}