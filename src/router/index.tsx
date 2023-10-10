import { Navigate, createBrowserRouter } from "react-router-dom"
import { BaseTemplate } from "../templates/base"
import { lazy } from "react"
// import BaseLoginRegister from "../templates/login-register"
import { AdminBaseTemplate } from "../templates/admin"
import BaseLoginRegister from "src/templates/login-register"
// import RoomMangage from "src/pages/admin/room-manage"
import ListRoomTemplate from "src/templates/room"


const Location = lazy(() => import("../pages/admin/localtion"))
const BookingInfo = lazy(() => import("../pages/admin/booking-info"))
const Admin = lazy(() => import("../pages/admin"));
const ListUsers = lazy(() => import("../pages/admin/list-user"));
const RoomManage = lazy(() => import("../pages/admin/room-manage"));


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
                path: "list-room/:maViTri",
                element: <ListRoom />
            },
            {
                path: "detail/:detailId",
                element: <DetailRoom />
            },
        ]
    },
    {
        element: <ListRoomTemplate />,
        children: [

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
                element: isAdminLoggedIn() ? <Admin /> : <Navigate to="/login" />,
            },
            {
                path: "/admin/quan-ly-nguoi-dung",
                element: isAdminLoggedIn() ? <ListUsers /> : <Navigate to="/login" />,
            },
            {
                path: "/admin/quan-ly-phong",
                element: isAdminLoggedIn() ? <RoomManage /> : <Navigate to="/login" />,
            },
            {
                path: "/admin/thong-tin-dat-phong",
                element: isAdminLoggedIn() ? <BookingInfo /> : <Navigate to="/login" />,
            },
            {
                path: "/admin/quan-ly-vi-tri",
                element: isAdminLoggedIn() ? <Location /> : <Navigate to="/login" />,
            },
        ],
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

// kiểm tra xem người dùng có phải là admin hay không
function isAdminLoggedIn() {
    const userDataFromLocalStorage = localStorage.getItem('authLogin');
    if (userDataFromLocalStorage) {
        const userData = JSON.parse(userDataFromLocalStorage);
        // Kiểm tra xem vai trò của người dùng có phải là "ADMIN" hay không
        return userData && userData.user && userData.user.role === 'ADMIN';
    }

    return false;
}
