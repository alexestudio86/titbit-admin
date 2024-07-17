export function NavbarCompact ( ) {
    return (
        <nav className="sticky-top zIndex-2" id="navbarCompact">
            <div className="w3-row w3-large w3-pale-green" >
                <div className="w3-col s3 w3-hide-large">
                    <button className="w3-button w3-blue w-100 w3-hide-large" v-on:click="openSidebar">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                <div className="w3-rest w3-center">
                    <div className="w3-bar-item w3-button w-100">
                        <span >Bienvenid@</span>
                    </div>
                </div>
            </div>
        </nav>
    )
};