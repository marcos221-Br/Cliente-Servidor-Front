import { LoginController } from "../controllers/LoginController";

function logout(){
    let loginController = new LoginController();
    loginController.logout();
}

function Home() {
    return (
        <>
            <header>
                <button onClick={logout}>Logout</button>
                <ul>
                    <li>
                        <a href="/usuarios">Usuario</a>
                    </li>
                </ul>
            </header>
            <main>
                <div id="home">
                    <h1>Home</h1>
                </div>
            </main>
        </>
    )
}
export default Home;