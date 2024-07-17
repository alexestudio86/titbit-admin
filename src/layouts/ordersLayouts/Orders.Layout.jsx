import { useLoginContext } from "../../context/LoginProvider";
import { GeneralSidebarLayout } from "../generalLayouts/GeneralSidebar.Layout";
    import { DishesProvider } from "../../context/DataProvider";
        import { OrdersSidebarLayout } from "./OrdersSidebar.Layout";
    import { HomePlaceholderLogin } from "../../components/homeComponents/Home.PlaceholderLogin";
    import { HomeSignInForm } from "../../components/homeComponents/Home.SignInForm";
import { GeneralMainLayout } from "../../layouts/generalLayouts/GeneralMain.Layout";
    import { OrdersProvider } from "../../context/DataProvider";
        import { OrdersMainLayout } from "./OrdersMain.Layout";
    import { KeepOut } from "../../components/KeepOut";


export function OrdersLayout () {

    const {user} = useLoginContext();

    return (
        <>
            <GeneralSidebarLayout>
                {
                    user.authenticated
                    ?
                    <DishesProvider>
                        <OrdersProvider>
                            <OrdersSidebarLayout/>
                        </OrdersProvider>
                    </DishesProvider>
                    :
                        user.loader
                        ?
                        <HomePlaceholderLogin/>
                        :
                        <HomeSignInForm/>
                }
            </GeneralSidebarLayout>
            <GeneralMainLayout>
                    {
                        user.authenticated
                        ?
                        <OrdersProvider>
                            <OrdersMainLayout />
                        </OrdersProvider>
                        :
                        <KeepOut/>
                    }
            </GeneralMainLayout>
        </>
    )
}