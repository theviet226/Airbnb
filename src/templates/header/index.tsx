
import css from "./header.module.scss"
import { Link } from 'react-router-dom'
import Search from '../search'
import icvn from "src/assets/images/vn.png"

import { useEffect } from 'react';
import { useState } from 'react';
import avatar from "../../assets/images/avatar.jpg"

function Header() {
  const [userData, setUserData] = useState<any>(null);


  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('authLogin');
    if (userFromLocalStorage) {
      const parsedUserData = JSON.parse(userFromLocalStorage);
      setUserData(parsedUserData.user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authLogin");
    setUserData(null);
  };


  return (
    <div style={{ background: "#003b91" }}>
      <div className="container">
        <header className={css.header}>
          <Link to={"/"}>
            <h1>airbnb</h1>
          </Link>
          <div className={css["header-right"]}>
            <div className={css["header-right-icon"]}>
              <span>VND</span>
              <img className={css["header-icon"]} src={icvn} alt="Vietnamese Flag" />
            </div>
            <div className={css["user-profile"]}>
              {userData ? (
                <div className={css["user-name"]}>
                  <img src={avatar} alt="" />
                  {userData.name}
                  <div className={css["profile-dropdown"]}>

                    <Link to="/profile" className={css["profile-action-btn"]}>
                      Profile
                    </Link>
                    <Link onClick={handleLogout} to="/" className={css["profile-action-btn"]}>
                      Đăng xuất
                    </Link>

                  </div>
                </div>
              ) : (

                <div className={css["user-name"]}>
                  <Link className={css["header-right-author"]} to="/login">Đăng nhập</Link>
                  <Link className={css["header-right-author"]} to="/register">Đăng ký</Link>
                </div>
              )}
            </div>
          </div>
        </header>
        <nav>
          <ul className={css["nav"]}>
            <li>
              <Link className={css["active"]} to={"/"}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to={"/"}>Chỗ ở</Link>
            </li>
            <li>
              <Link to={"/"}>Liên hệ</Link>
            </li>
          </ul>
        </nav>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Search />
        </div>
      </div>
    </div>
  );
}


export default Header