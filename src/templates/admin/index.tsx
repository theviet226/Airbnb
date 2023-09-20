
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export function AdminBaseTemplate() {
  return (
    <div className="admin-template">
      <Suspense fallback={<>Loading...</>}>
        <Outlet />
      </Suspense>


      {/* Bất kỳ phần footer của trang admin nào bạn muốn thêm vào đây */}
    </div>
  );
}
