
import css from "./menu-admin.module.scss"

function MenuAdmin() {
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
                            <a href="">
                                <i className="fa fa-user nav-icon"></i>
                                <span className={css["menu-item"]} data-key="t-dashboard">Quản lý người dùng</span>
                            </a>
                        </li>
                        <li className={css["menu-content"]}>
                            <a href="">
                                <i className="fa-solid fa-truck-field nav-icon"></i>
                                <span className={css["menu-item"]} data-key="t-gallery">Quản lý vị trí</span>
                            </a>
                        </li>
                        <li className={css["menu-content"]}>
                            <a href="">
                                <i className="fa-solid fa-warehouse nav-icon"></i>
                                <span className={css["menu-item"]} data-key="t-ecommerce">Quản lý phòng</span>
                            </a>
                        </li>
                        <li className={css["menu-content"]}>
                            <a href="">
                                <i className="fa-solid fa-right-from-bracket nav-icon"></i>
                                <span className={css["menu-item"]} data-key="t-gallery">Đăng Xuất</span>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default MenuAdmin