import { createContext, useContext, useState } from "react";


const layoutContext = createContext();
export function useLayoutContext() {
    return useContext(layoutContext)
};

export function LayoutProvider({children}) {

    const [asideMenu, setAsideMenu] = useState(false);

    return (
        <layoutContext.Provider value={{asideMenu, setAsideMenu}}>
            {children}
        </layoutContext.Provider>
    )
};