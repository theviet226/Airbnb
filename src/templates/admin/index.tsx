
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import AdminHeader from "./admin-header";
import MenuAdmin from "./menu-admin";

export function AdminBaseTemplate() {
  return (
    <div className="admin-template">
      <div className='row'>
        <div className='col-2'>
          <MenuAdmin />
        </div>
        <div className='col-10'>
          <AdminHeader />
          <Suspense fallback={<>Loading...</>}>
            <Outlet />
          </Suspense>
        </div>
      </div>


    </div>
  );
}
