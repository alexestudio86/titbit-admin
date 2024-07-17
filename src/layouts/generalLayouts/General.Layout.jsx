import { LoginProvider } from "../../context/LoginProvider";
import { Outlet } from "react-router-dom";


export function GeneralLayout ({children}) {
    return (
        <LoginProvider>
            <div className="container">
                {
                children
                ??
                <Outlet />
                }
            </div>
        </LoginProvider>
    )
}