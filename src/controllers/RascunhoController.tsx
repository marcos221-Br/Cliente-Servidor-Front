import { HttpConection } from "../components/Json";
import { Rascunho } from "../models/Rascunho";

export class RascunhoController{

    private http;
    
    public constructor(){
        this.http = new HttpConection();
    }

    public findRascunhos(){
        return this.http.sendJson("/rascunhos",'GET');
    }

    public getRascunho(rascunhoId:any){
        return this.http.sendJson("/rascunhos/" + rascunhoId, 'GET');
    }

    public createRascunho(rascunho:Rascunho){
        let json = JSON.stringify(rascunho);
        return this.http.sendJson("/rascunhos",'POST',json);
    }

    public updateRascunho(rascunhoId:number, rascunho:Rascunho){
        let json = JSON.stringify(rascunho);
        return this.http.sendJson("/rascunhos/" + rascunhoId,'PUT',json);
    }

    public deleteRascunho(rascunhoId:any){
        return this.http.sendJson("/rascunhos/" + rascunhoId,'DELETE');
    }
}