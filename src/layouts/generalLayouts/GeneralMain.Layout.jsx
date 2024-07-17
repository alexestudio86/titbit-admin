import { useLoginContext } from "../../context/LoginProvider";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";


export function GeneralMainLayout ({children}) {
    const {user} = useLoginContext();
    return (
        <main className="w3-main w3-border w3-border-light-gray zIndex-1" style={ {marginLeft: 400}}>
            { user ? (
                <>
                    <Navbar />
                    <Header headerTitle='Sistema de Administración' />
                    {children}
                </>
            ) : (
                <>
                    <NavbarCompact />
                    {children}
                </>
            )}
        </main>
    )
}