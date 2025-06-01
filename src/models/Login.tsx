export class Login{

    private email:any;
    private senha:any;

    public constructor(){
        this.email = null;
        this.senha = null;
    }

    public setEmail(email:string){
        this.email = email;
    }

    public getEmail(){
        return this.email;
    }

    public setSenha(senha:string){
        this.senha = senha;
    }

    public getSenha(){
        return this.senha;
    }
}