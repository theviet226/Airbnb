
import css from "./home-sale.module.scss"
import { Link } from 'react-router-dom'
import sale from "src/assets/images/login/GlobeGeniusBadge.png"

function HomeSale() {
  return (
    <div className="home">
      <div className='container'>
        <div className={css['homesale-content']}>
          <div className={css['homesale-item']}>
            <img src={sale} alt="" />
          </div>
          <div className={css['homesale-info']}>
            <div className={css['homesale-text']}>
              <p className={css['homesale-title']}>Nhận giảm giá tức thì</p>
              <p className='home-text'>Chỉ cần đăng nhập tài khoản Airbnb của bạn</p>
            </div>
            <div className={css['homesale-links']}>
              <Link className={css.active} to='/login'>Đăng nhập</Link>
              <Link to='/register'>Đăng ký</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSale
