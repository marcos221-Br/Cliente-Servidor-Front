import { HttpConection } from "../components/Json";
import { Rascunho } from "../models/Rascunho";

export class RascunhoController{

    private http;
    
    public constructor(){
        this.http = new HttpConection();
    }

    public findRascunho(){
        return this.http.sendJson("/rascunhos",'GET');
    }

    public createRascunho(rascunho:Rascunho){
        let json = JSON.stringify(rascunho);
        return this.http.sendJson("/rascunhos",'POST',json);
    }

    public updateRascunho(rascunho:Rascunho){
        let json = JSON.stringify(rascunho);
        return this.http.sendJson("/rascunhos",'PUT',json);
    }

    public deleteRascunho(){
        return this.http.sendJson("/rascunhos",'DELETE');
    }
}