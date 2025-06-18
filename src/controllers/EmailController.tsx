import { HttpConection } from "../components/Json";
import { Email } from "../models/Email";

export class EmailController{

    private http;
    
    public constructor(){
        this.http = new HttpConection();
    }

    public findEmails(){
        return this.http.sendJson("/emails",'GET');
    }

    public getEmail(emailId:any){
        return this.http.sendJson("/emails/" + emailId, 'GET');
    }

    public createEmail(rascunho:Email){
        let json = JSON.stringify(rascunho);
        return this.http.sendJson("/emails",'POST',json);
    }

    public sendRascunho(rascunhoId:any){
        return this.http.sendJson("/emails/" + rascunhoId, "POST");
    }
}