import { useForm } from "react-hook-form";

function salvar(){
    // usuario.setNome((document.getElementById('name') as HTMLInputElement).value);
    // usuario.setSenha((document.getElementById('password') as HTMLInputElement).value);
    // usuario.setEmail((document.getElementById('email') as HTMLInputElement).value);
    // if(usuario.getId() != 0){
    //     usuarioController.updateUsuario(usuario).then((response) => {
    //         if(response.status == 200){
    //             alert("Usuário atualizado com sucesso!");
    //             window.location.href = "/inicio";
    //         }else{
    //             alert(response.response.data.mensagem);
    //         }
    //     })
    // }else{
    //     usuarioController.createUsuario(usuario).then((response) => {
    //         if(response.status == 201){
    //             alert("Usuário criado com sucesso!");
    //             window.location.href = "/";
    //         }else{
    //             alert(response.response.data.mensagem);
    //         }
    //     })
    // }
}

function voltar(){
    if(sessionStorage.getItem('token') != null){
        window.location.href = "/inicio";
    }else{
        window.location.href = "/";
    }
}

function RascunhoPage(){

    var { handleSubmit } = useForm();

    return (
        <>
            <header>
                <button className="secondary" onClick={voltar}>Voltar</button>
            </header>
            <main>
                <div id="usuario">
                    <h1>Usuario</h1>
                    <form onSubmit={handleSubmit(() => salvar())}>
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" required />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required />
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" required />
                        <button type="submit">Salvar</button>
                    </form>
                    <button className="danger" id="delete" disabled>Deletar</button>
                </div>
            </main>
        </>
    )
}
export default RascunhoPage;