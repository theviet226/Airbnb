import { createBrowserRouter } from "react-router-dom"
import { BaseTemplate } from "../templates/base"
import { lazy } from "react"
// import BaseLoginRegister from "../templates/login-register"
import { AdminBaseTemplate } from "../templates/admin"
import BaseLoginRegister from "src/templates/login-register"
import RoomMangage from "src/pages/admin/room-manage"
import ListRoomTemplate from "src/templates/room"


const Location = lazy(() => import("../pages/admin/localtion"))
const BookingInfo = lazy(() => import("../pages/admin/booking-info"))
const Admin = lazy(() => import("../pages/admin"))
const ListUsers = lazy(() => import("../pages/admin/list-user"))
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
        ]
    },
    {
        element: <ListRoomTemplate/>,
        children: [
            {
                path: "list-room/:maViTri",
                element: <ListRoom />
            },
            {
                path: "detail/:detailId",
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
            },
            {
                path: "/admin/quan-ly-nguoi-dung",
                element: <ListUsers />
            },
            {
                path: "/admin/quan-ly-phong",
                element: <RoomMangage />
            },
            {
                path: "/admin/thong-tin-dat-phong",
                element: <BookingInfo />
            },
            {
                path: "/admin/quan-ly-vi-tri",
                element: <Location/>
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