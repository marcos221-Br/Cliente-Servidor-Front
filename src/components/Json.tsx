import axios from "axios";

export class HttpConection{

    private url = localStorage.getItem('api');

    public constructor(){
        
    }

    public static setHeader(key:string,value:string){
        axios.defaults.headers.common[key] = value
    }

    public async sendJson(endpoint:string,type:string,data:any = null):Promise<any> {
        await HttpConection.setToken();
        let result:any
        switch (type) {
            case 'GET':
                result = axios.get(this.url + endpoint).then(function(response) {
                    console.log(response);
                    return response;
                }).catch(function(error){
                    console.log(error);
                    if(error.status == 401){
                        window.location.href = "/";
                    }
                    return error;
                });
                break;
            
            case 'POST':
                result = axios.post(this.url + endpoint,data).then(function(response) {
                    console.log(response);
                    return response;
                }).catch(function(error){
                    console.log(error);
                    if(error.status == 401){
                        window.location.href = "/";
                    }
                    return error;
                });
                break;
            
            case 'PUT':
                result = axios.put(this.url + endpoint,data).then(function(response) {
                    console.log(response);
                    return response;
                }).catch(function(error){
                    console.log(error);
                    if(error.status == 401){
                        window.location.href = "/";
                    }
                    return error;
                });
                break;

            case 'DELETE':
                result = axios.delete(this.url + endpoint).then(function(response) {
                    console.log(response);
                    return response;
                }).catch(function(error){
                    console.log(error);
                    if(error.status == 401){
                        window.location.href = "/";
                    }
                    return error;
                });
                break;
        
            default:
                break;
        }
        return result
    }

    public static async setToken(){
        if(sessionStorage.getItem('token') != null){
            HttpConection.setHeader("Authorization", "Bearer " + atob(sessionStorage.getItem('token') + ''));
        }
    }
}