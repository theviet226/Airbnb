
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import HeaderLogin from './header-login';



function BaseLoginRegister() {
    return (
        <div>
            <HeaderLogin/>
            <Suspense fallback={<>Loading...</>}>
                <Outlet />
            </Suspense>
            
        </div>
    )
}

export default BaseLoginRegister