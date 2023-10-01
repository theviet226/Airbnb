import { useState } from 'react';
import css from "./admin-header.module.scss";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


function AdminHeader() {
    const [userData, setUserData] = useState<any>(null);

    const handleLogout = () => {

        localStorage.removeItem("authLogin");
        // setUserData(null);

        // window.location.href = "/login";
    };

    useEffect(() => {

        const userFromLocalStorage = localStorage.getItem('authLogin');
        // const user = userFromLocalStorage.user;
        console.log(userFromLocalStorage)
        if (userFromLocalStorage) {
            const parsedUserData = JSON.parse(userFromLocalStorage);
            setUserData(parsedUserData.user);
        }
    }, []);
    return (
        <div>
            <header className={css["header-admin"]}>
                <div className={css["navbar-header"]}>
                    <div className={css["header-content"]}>
                        <form className={css["form"]}>
                            <div className={css["header-search"]}>
                                <input type="text" className={css["form-control"]} placeholder="Search..." />
                                <span className="bx bx-search icon-sm"></span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={css["user-profile"]} >
                    <div className={css["user-name"]}>
                        {userData ? (
                            <>
                                <img src={userData.avatar} alt="" />
                                {userData.name}
                            </>
                        ) : (
                            "Loading..."
                        )}
                    </div>
                    <div className={css["profile-dropdown"]}>
                        <div className={css["profile-actions"]}>
                            <Link to='/profile' className={css["profile-action-btn"]}>Profile</Link>
                            <Link onClick={handleLogout} to='/' className={css["profile-action-btn"]}>Đăng xuất</Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default AdminHeader;
