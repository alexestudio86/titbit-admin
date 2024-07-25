import { LoginProvider } from "../../context/LoginProvider";
import { LayoutProvider } from "../../context/LayoutProvider";
import { Outlet } from "react-router-dom";


export function GeneralLayout ({children}) {
    return (
        <LoginProvider>
            <LayoutProvider>
                <div className="container">
                    {
                    children
                    ??
                    <Outlet />
                    }
                </div>
            </LayoutProvider>
        </LoginProvider>
    )
}