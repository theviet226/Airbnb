// AdminBaseTemplate.js
import React from "react";

export function AdminBaseTemplate({ children }) {
  return (
    <div className="admin-template">
      
      {children}
      
      {/* Bất kỳ phần footer của trang admin nào bạn muốn thêm vào đây */}
    </div>
  );
}
