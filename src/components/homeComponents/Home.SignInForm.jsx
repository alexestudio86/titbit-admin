import { useLoginContext } from "../../context/LoginProvider";
import './homeSignInForm.css'


export function HomeSignInForm ( ) {

    const {user, handleChange, login}  =   useLoginContext();

    return (
        <form className={"w3-container py-4" + (user.error ? ' shake' : '')} onSubmit={ e => e.preventDefault() } >
            <div className="w3-center py-2">
                <i className={"fas fa-user w3-jumbo" + (user.error ? ' w3-text-red' : '')}></i>
            </div>
            <div className="py-2">
                <div className="py-1">
                    <label className={user.error ? ' w3-text-red' : ''} ><b>Usuario</b></label>
                    <input className="w3-input w3-border w3-margin-bottom" value={user.email} placeholder="Nombre de usuario" name="email" type="text" onChange={ handleChange } />
                </div>
                <div className="py-1">
                    <label className={user.error ? ' w3-text-red' : ''} ><b>Contraseña</b></label>
                    <input className="w3-input w3-border" value={user.password} placeholder='******' name="password" type="password" onChange={ handleChange } />
                </div>
            </div>
                <button type="submit" className="w3-button w-100 w3-teal" onClick={ login } >Login</button>
                <input className='w3-check' id="remember" type="checkbox"/>
                <label className="px-2" htmlFor="remember">Resetear</label>
        </form>
    )
}