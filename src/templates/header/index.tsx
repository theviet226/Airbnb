import React from 'react'
import css from "./header.module.scss"
import { Link, useNavigate } from 'react-router-dom'
import imgVn from "src/assets/images/vn.png"

function Header() {
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
            <div className={css["header-right-author"]}>
              <Link to="/login">Login</Link>
            </div>
            <div className={css["header-right-author"]}>
              <Link to="/register">Register</Link>
            </div>
          </div>

        </header>
      </div>

    </div>
  )
}

export default Header