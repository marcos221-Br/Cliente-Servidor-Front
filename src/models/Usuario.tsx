export class Usuario{

    private id:number;
    private nome:string;
    private email:string;
    private senha:string;

    public constructor(){
        this.id = 0;
        this.nome = '';
        this.email = '';
        this.senha = '';
    }

    public getId(){
        return this.id;
    }

    public getNome(){
        return this.nome;
    }

    public getEmail(){
        return this.email;
    }

    public getSenha(){
        return this.senha;
    }

    public setId(id:number){
        this.id = id;
    }

    public setNome(nome:string){
        this.nome = nome;
    }

    public setEmail(email:string){
        this.email = email;
    }

    public setSenha(senha:string){
        this.senha = senha;
    }
}