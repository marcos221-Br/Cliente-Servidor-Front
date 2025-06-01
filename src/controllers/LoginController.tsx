import { HttpConection } from "../components/Json";
import { Login } from "../models/Login";

export class LoginController{

    private http;

    public constructor(){
        this.http = new HttpConection();
    }

    public login(login:Login){
        let json = JSON.stringify(login);
        this.http.sendJson('/login', 'POST', json).then(async (response) => {
            if(response.status == 200){
                sessionStorage.setItem('token',btoa(response.data.token));
                window.location.href = "/inicio";
            }else{
                alert(response.response.data.mensagem);
            }
        })
    }

    public logout(){
        this.http.sendJson('/logout', 'POST').then(async (response) => {
            if(response.status == 200){
                sessionStorage.clear();
                window.location.href = "/";
            }else{
                alert(response.response.data.mensagem);
            }
        })
    }
}