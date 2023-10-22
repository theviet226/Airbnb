import Search from "src/templates/search";
import css from "./header-list-room.module.scss";
import { Link } from "react-router-dom";
import icvn from "src/assets/images/vn.png";
import { useEffect, useState } from "react";
import avatar from "../../../assets/images/avatar.jpg"
function HeaderListRoom() {
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("authLogin");
    if (userFromLocalStorage) {
      const parsedUserData = JSON.parse(userFromLocalStorage);
      setUserData(parsedUserData.user);
    }
  }, []);
  return (
    <div
      style={{
        background: "#003b91",
      }}
    >
      <div className="container">
        <header className={css.header}>
          <Link to={"/"}>
            <h1>airbnb</h1>
          </Link>
          <div className={css["header-right"]}>
            <div className={css["header-right-icon"]}>
              <span>VND</span>
              <img className={css["header-icon"]} src={icvn} />
            </div>
            <div className={css["user-profile"]}>
              {userData ? (
              <div className={css["user-name"]}>
                <img src={avatar}/>
                {userData.name}
              <div className={css["header-right-author"]}>
                <Link to="/">Trang chủ</Link>
              </div>
              </div>
              ):(
                <div className={css["user-name"]}>
                <div className={css["header-right-author"]}>
                <Link to="/login">Đăng nhập</Link>
              </div>
              <div className={css["header-right-author"]}>
                <Link to="/register">Đăng ký</Link>
              </div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Search />
        </div>
      </div>
    </div>
  );
}

export default HeaderListRoom;
