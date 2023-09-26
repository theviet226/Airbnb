import { useState } from "react";
import css from "./menu-admin.module.scss"
import { Link } from 'react-router-dom'

function MenuAdmin() {
    const [userData, setUserData] = useState(null);
    const handleLogout = () => {

        localStorage.removeItem("userData");
        setUserData(null);

        window.location.href = "/login";
    };
    return (
        <div className={css.menu}>
            <div className={css["navbar-brand-box"]}>
                <span>Vuesy</span>
            </div>
            <button type="button" style={{
                position: "absolute",
                left: "250px",
                top: "20px",
                fontSize: "20px",
                zIndex: "2"
            }} className="btn">
                <i className="fa fa-fw fa-bars"></i>
            </button>
            <div data-simplebar className={css["sidebar-menu-scroll"]}>
                <div id={css["sidebar-menu "]}>
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className={css["menu-title"]} data-key="t-menu">Menu</li>
                        <li className={css["menu-content"]}>
                            <Link to="/admin/quan-ly-nguoi-dung">
                                <i className="fa fa-user nav-icon"></i>
                                <span className={css["menu-item"]} data-key="t-dashboard">Quản lý người dùng</span>
                            </Link>
                        </li>
                        <li className={css["menu-content"]}>
                            <Link to="/admin/quan-ly-vi-tri">
                                <i className="fa-solid fa-warehouse nav-icon"></i>
                                <span className={css["menu-item"]} data-key="t-ecommerce">Quản lý vị trí</span>
                            </Link>
                        </li>
                        <li className={css["menu-content"]}>
                            <Link to="/admin/quan-ly-phong">
                                <i className="fa-solid fa-warehouse nav-icon"></i>
                                <span className={css["menu-item"]} data-key="t-ecommerce">Quản lý phòng</span>
                            </Link>

                        </li>
                        <li className={css["menu-content"]}>
                            <Link to="/admin/thong-tin-dat-phong">
                                <i className="fa-solid fa-warehouse nav-icon"></i>
                                <span className={css["menu-item"]} data-key="t-ecommerce">Quản lý thông tin đặt phòng</span>
                            </Link>

                        </li>
                        <li className={css["menu-content"]}>
                            <Link onClick={handleLogout} to='/'>
                                <i className="fa-solid fa-right-from-bracket nav-icon"></i>
                                <span className={css["menu-item"]} data-key="t-gallery">Đăng Xuất</span>
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default MenuAdmin