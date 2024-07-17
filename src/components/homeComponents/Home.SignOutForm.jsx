import { useLoginContext } from "../../context/LoginProvider"

export function HomeSignOutForm ( ) {

    const {user, logout}  =   useLoginContext();

    return (
        <form className="w3-container py-4" onSubmit={ e => e.preventDefault() } >
            <h1 className="w3-center">Bienvenid@</h1>
            <div className="w3-center py-2">
                <i className="fa-solid fa-face-smile w3-jumbo w3-text-teal"></i>
            </div>
            <div className="py-2">
                <div className="py-1">
                    <h1 className="w3-center w3-medium">{user.email}</h1>
                </div>
            </div>
            <button type="submit" className="w3-button w-100 w3-pale-green" onClick={logout} >Logout</button>
        </form>
    )
}