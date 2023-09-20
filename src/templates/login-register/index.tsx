
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import FooterLogin from "./footer-login"
import HeaderLogin from './header-login';



function BaseLoginRegister() {
    return (
        <div>
            <HeaderLogin/>

            <Suspense fallback={<>Loading...</>}>
                <Outlet />
            </Suspense>
            <FooterLogin />
        </div>
    )
}

export default BaseLoginRegister