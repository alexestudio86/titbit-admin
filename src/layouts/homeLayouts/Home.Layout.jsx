import { useLoginContext } from "../../context/LoginProvider";
import { GeneralSidebarLayout } from "../generalLayouts/GeneralSidebar.Layout";
    import { HomeSignOutForm } from "../../components/homeComponents/Home.SignOutForm";
    import { HomePlaceholderLogin } from "../../components/homeComponents/Home.PlaceholderLogin";
    import { HomeSignInForm } from "../../components/homeComponents/Home.SignInForm";
import { GeneralMainLayout } from "../generalLayouts/GeneralMain.Layout";
    import { HomeBienvenida } from "../../components/homeComponents/Home.Bienvenida";
    import { KeepOut } from "../../components/KeepOut";


export function HomeLayout () {

    const {user} = useLoginContext();

    return (
        <>
            <GeneralSidebarLayout>
                {
                    user.authenticated
                    ?
                    <HomeSignOutForm/>
                    :
                        user.loader
                        ?
                        <HomePlaceholderLogin/>
                        :
                        <HomeSignInForm />
                }
            </GeneralSidebarLayout>
            <GeneralMainLayout>
                {
                    user.authenticated
                    ?
                    <HomeBienvenida />
                    :
                    <KeepOut/>
                }
            </GeneralMainLayout>
        </>
    )
}