import { NavLink } from "react-router-dom";
import { useLayoutContext } from '../context/LayoutProvider';
import './navbar.css'


export function Navbar () {

    const {setAsideMenu} = useLayoutContext()

    const links = [
        {
            name:   'Home',
            url:    '/',
            icon:   'fas fa-home'
        },{
            name:   'Ordenes',
            url:    '/ordenes',
            icon:   'fa-solid fa-file-signature'
        },{
            name:   'Platillos',
            url:    '/platillos',
            icon:   'fa-solid fa-utensils'
        }
    ];

    return (
        <nav className="sticky-top zIndex-2" id="navbar">
            <div className="w3-row w3-large w3-pale-green" >
                <div className="w3-col s3 w3-hide-large">
                    <button className="w3-button w3-blue w-100 w3-hide-large" onClick={ () => setAsideMenu(true)}>
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                { links.map( (link, index) => (
                    <div key={index} className="w3-col s3 l4 w3-center">
                        <NavLink to={link.url} className='w3-bar-item w3-button w-100'>
                            <span className="w3-hide-small">{link.name}</span>
                            <i className={"w3-hide-large"+(` ${link.icon}`)}></i>
                        </NavLink>
                    </div>
                ) ) }
            </div>
        </nav>
    )
}