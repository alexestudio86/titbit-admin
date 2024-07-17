import { useLoginContext } from "../../context/LoginProvider";
import { GeneralSidebarLayout } from "../generalLayouts/GeneralSidebar.Layout";
    import { DishesSidebarLayout } from "./DishesSidebar.Layout";
        import { HomePlaceholderLogin } from "../../components/homeComponents/Home.PlaceholderLogin";
        import { HomeSignInForm } from "../../components/homeComponents/Home.SignInForm";
import { GeneralMainLayout } from "../../layouts/generalLayouts/GeneralMain.Layout";
    import { DishesProvider } from "../../context/DataProvider";
        import { DishesMainLayout } from "./DishesMain.Layout";
    import { KeepOut } from "../../components/KeepOut";


export function DishesLayout () {

    const {user} = useLoginContext();

    return (
        <>
            <GeneralSidebarLayout>
                {
                    user.authenticated
                    ?
                        <DishesProvider>
                            <DishesSidebarLayout />
                        </DishesProvider>
                    :
                        user.loader
                        ?
                        <HomePlaceholderLogin />
                        :
                        <HomeSignInForm />
                }
            </GeneralSidebarLayout>
            <GeneralMainLayout>
                {
                    user.authenticated
                    ?
                    <DishesProvider>
                        <DishesMainLayout />
                    </DishesProvider>
                    :
                    <KeepOut/>
                }
            </GeneralMainLayout>
        </>
    )
}