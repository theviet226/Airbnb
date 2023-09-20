// AdminComponent.js

import React, { useState } from 'react';
import css from "./admin.module.scss";

function Admin() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`admin-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Sidebar */}
      <div className={css.slidebar}>
        <h2>Danh mục</h2>
        <ul>
          <li>Quản lý người dùng</li>
          <li>Quản lý thông tin vị trí</li>
          <li>Quản lý thông tin phòng</li>
        </ul>
      </div>

      {/* Content */}
      <div className={css.content}>
        {/* Navbar */}
        <div className={css.navbar}>
          <span>Tên tài khoản</span>
          <button>Đăng xuất</button>
        </div>

        {/* Table */}
        <div className="table">
          {/* Đặt bảng thông tin ở đây */}
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <button className={css["toggle-sidebar"]} onClick={toggleSidebar}>
        {isSidebarOpen ? 'Ẩn Sidebar' : 'Hiện Sidebar'}
      </button>
    </div>
  );
}

export default Admin;
