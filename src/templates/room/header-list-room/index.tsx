
import Search from "src/templates/search"
import css from "./header-list-room.module.scss"
import { Link } from 'react-router-dom'


function HeaderListRoom() {

  return (
    <div style={{
      background: "#003b91"
    }
    }>
      <div className='container'>
        <header className={css.header}>
          <Link to={'/'}>
            <h1>airbnb</h1>
          </Link>
          <div className={css["header-right"]}>
            <div className={css["header-right-icon"]}>
              <span>VND</span>
              <img className={css["header-icon"]} src="src/assets/images/vn.png" />
            </div>
            <div className={css["header-right-author"]} >
              <Link to="/login">Đăng nhập</Link>
            </div>
            <div className={css["header-right-author"]}>
              <Link to="/register">Đăng ký</Link>
            </div>
          </div>

        </header>
        <nav>
          <ul className={css["nav"]}>
            <li>
              <Link className={css["active"]} to={'/'}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to={'/'}>
                Chỗ ở
              </Link>
            </li>
            <li>
              <Link to={'/'}>
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <Search />
        </div>
      </div>


    </div>
  )
}

export default HeaderListRoom