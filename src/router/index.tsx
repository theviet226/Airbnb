import { createBrowserRouter } from "react-router-dom"
import { BaseTemplate } from "../templates/base"
import { lazy } from "react"
// import BaseLoginRegister from "../templates/login-register"
import { AdminBaseTemplate } from "../templates/admin"
import BaseLoginRegister from "src/templates/login-register"
const Admin = lazy(() => import("../pages/admin/admin"))
const Home = lazy(() => import("../pages/home"))
const ListRoom = lazy(() => import("../pages/list-room"))
const DetailRoom = lazy(() => import("../pages/detail-room"))
const Profile = lazy(() => import("../pages/profile"))
const Login = lazy(() => import("../pages/login"))
const Register = lazy(() => import("../pages/register"))


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

        ]
    },
    {
        element: <AdminBaseTemplate />,
        children: [
            {
                index: true,
                path: "/admin",
                element: <Admin />
            }
        ]
    },
    {
        element: <BaseLoginRegister />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
        ]
    }

])