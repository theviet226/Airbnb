import React from 'react'
import css from "./header.module.scss"
import { Link, useNavigate } from 'react-router-dom'
import imgVn from "src/assets/images/vn.png"

function Header() {
  return (
    <>
      <header className={css.header}>
        <Link to={'/'}>
          <h1>airbnb</h1>
        </Link>
        <div className='header-right'>
          <span>VND</span>
          <img src="src/assets/images/vn.png" />
          <div>
            <a href="#">Đăng nhập</a>
            <a href="#">Đăng ký</a>
          </div>
        </div>

      </header>
    </>
  )
}

export default Header