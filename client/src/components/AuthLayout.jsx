import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <main className="App">
            say yay!
            <Outlet />
        </main>
    )
}

export default AuthLayout