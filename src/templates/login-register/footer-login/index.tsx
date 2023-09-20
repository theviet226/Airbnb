
import css from './footer-login.module.scss';

function FooterLogin() {
  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css['footer-content']}>
          <div className={css['footer-logo']}>
            <a href="/">
            <h1>airbnb</h1>
            </a>
            
          </div>
          <div className={css['footer-links']}>
            <ul>
              <li><a href="/">Trang chủ</a></li>
              <li><a href="/">Khám phá</a></li>
              <li><a href="/">Đặt chỗ</a></li>
              <li><a href="/">Địa điểm</a></li>
            </ul>
          </div>
          <div className={css['footer-links']}>
            <ul>
              <li><a href="/">Trang chủ</a></li>
              <li><a href="/">Khám phá</a></li>
              <li><a href="/">Đặt chỗ</a></li>
              <li><a href="/">Địa điểm</a></li>
            </ul>
          </div>
          <div className={css['footer-subscribe']}>
            <h2>Tiết kiệm thời gian và tiền bạc!</h2>
            <p>Hãy đăng ký và chúng tôi sẽ gửi những ưu đãi tốt nhất cho bạn</p>
            <div className={css['subscribe-input']}>
              <input
                type="email"
                placeholder="Nhập địa chỉ email"
                className={css['subscribe-email']}
              />
              <button type="submit" className={css['subscribe-button']}>
                Đăng ký
              </button>
            </div>
            <div className={css['footer-social']}>
              <a href="/" className={css['social-icon']}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="/" className={css['social-icon']}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/" className={css['social-icon']}>
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className={css['footer-legal']}>
          <p>&copy; 2023 Airbnb, Inc.</p>
          <p>Quyền riêng tư · Điều khoản · Sơ đồ trang web</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterLogin;
