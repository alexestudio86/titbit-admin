import { Navbar } from "../components/Navbar";
import { ErrorPage } from "../components/Error.Page";


export function IsErrorView () {
    return (
        <>
            <Navbar />
            <div className="w3-white w3-display-container" style={{height: '100dvh'}}>
                <div className="w3-display-middle">
                    <ErrorPage />
                </div>
            </div>
        </>
    )
}