import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App">
            {/* <nav>
                This is the Navbar
            </nav> */}
            <Outlet />
        </main>
    )
}

export default Layout