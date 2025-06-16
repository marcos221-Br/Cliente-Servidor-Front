export class Email {

    private emailId:number;
    private assunto:string;
    private emailDestinatario:string;
    private corpo:string;

    public constructor(){
        this.emailId = 0;
        this.assunto = '';
        this.emailDestinatario = '';
        this.corpo = '';
    }

    public getEmailId():number{
        return this.emailId;
    }

    public setEmailId(emailId:number){
        this.emailId = emailId;
    }

    public getAssunto():string{
        return this.assunto;
    }

    public setAssunto(assunto:string){
        this.assunto = assunto;
    }

    public getEmailDestinatario():string{
        return this.emailDestinatario;
    }

    public setEmailDestinatario(emailDestinatario:string){
        this.emailDestinatario = emailDestinatario;
    }

    public getCorpo():string{
        return this.corpo;
    }

    public setCorpo(corpo:string){
        this.corpo = corpo;
    }
}