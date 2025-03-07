import { useLayoutContext } from "../context/LayoutProvider"

export function SidebarMobileClose({setMobileMenu}) {

    const {setAsideMenu} = useLayoutContext();

    return (
        <div className="w3-bar-item w3-teal py-4 w3-display-container">
            <span className="fs-5 text-white fw-bold text-uppercase w3-display-center">Menú</span>
            <button
                className="w3-button w3-hide-large w3-text-white w3-display-right"
                onClick={ () => setAsideMenu(false) }
            >
                Close <i className="fas fa-times"></i>
            </button>
        </div>
    )
}