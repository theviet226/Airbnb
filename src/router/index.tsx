import { createBrowserRouter } from "react-router-dom"
import { BaseTemplate } from "../templates/base"
import Home from "../pages/home"
import ListRoom from "../pages/list-room"
import DetailRoom from "../pages/detail-room"
import Profile from "../pages/profile"
import Login from "../pages/login"
import Register from "../pages/register"
import Admin from "../pages/admin"
import { AdminBaseTemplate } from "src/templates/admin/index"


export const router = createBrowserRouter([
    {
        element: <BaseTemplate />,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />
            },
            {
                path: "list-room",
                element: <ListRoom />
            },
            {
                path: "detail",
                element: <DetailRoom />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "admin",
                element: (
                    <AdminBaseTemplate>
                        <Admin />
                    </AdminBaseTemplate>
                )
            }

        ]
    }
])