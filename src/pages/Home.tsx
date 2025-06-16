import { LoginController } from "../controllers/LoginController";
import './Home.css';

function logout(){
    let loginController = new LoginController();
    loginController.logout();
}

function Home() {
    return (
        <>
            <header>
                <button className="secondary" onClick={logout}>Logout</button>
                <ul>
                    <li>
                        <a href="/usuarios">Usuario</a>
                    </li>
                    <li>
                        <a href="/rascunhos">Rascunhos</a>
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