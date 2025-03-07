import { LayoutProvider, useLayoutContext } from "../../context/LayoutProvider";
import { SidebarMobileClose } from "../../components/Sidebar.Mobile.Close";


export function GeneralSidebarLayout ({children}) {

    const {asideMenu} = useLayoutContext()
    
    return (
        <aside className={"w3-sidebar w3-bar-block w3-collapse w3-top w3-card zIndex-3"+(asideMenu ? ' w3-show' : '')} id="mySidebar" style={ {width: '100%', maxWidth: 400}} >
            <div className="w3-bar">
                <SidebarMobileClose />
                {children}
            </div>
        </aside>
    )
};