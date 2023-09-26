import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import HeaderListRoom from "./header-list-room";
import Footer from "../footer";

function ListRoomTemplate() {
    return (
        <div>
            <HeaderListRoom/>
            <Suspense fallback={<>Loading...</>}>
                <Outlet />
            </Suspense>
            <Footer/>
        </div>
    )
}

export default ListRoomTemplate