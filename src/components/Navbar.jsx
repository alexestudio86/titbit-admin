import './navbar.css'
import { NavLink } from "react-router-dom";


export function Navbar ( ) {

    const links = [
        {
            name:   'Home',
            url:    '/'
        },{
            name:   'Ordenes',
            url:    '/ordenes'
        },{
            name:   'Platillos',
            url:    '/platillos'
        }
    ]

    return (
        <nav className="sticky-top zIndex-2" id="navbar">
            <div className="w3-row w3-large w3-pale-green" >
                <div className="w3-col s3 w3-hide-large">
                    <button className="w3-button w3-blue w-100 w3-hide-large" v-on:click="openSidebar">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                { links.map( (link, index) => (
                    <div key={index} className="w3-col s3 l4 w3-center">
                        <NavLink to={link.url} className='w3-bar-item w3-button w-100'>
                            <span className="w3-hide-small">{link.name}</span>
                            <i className="fas fa-home w3-hide-large"></i>
                        </NavLink>
                    </div>
                ) ) }
            </div>
        </nav>
    )
}