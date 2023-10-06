
import css from "./header.module.scss"
import { Link, useNavigate } from 'react-router-dom'
import Search from '../search'
import icvn from "src/assets/images/vn.png"
import { useEffect, useState } from "react"
import { getLocalStorage, removeLocalStorage } from "src/utils"
import { ACCESS_TOKEN } from "src/constants"


function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  useEffect(() => {
    const accessToken = getLocalStorage(ACCESS_TOKEN);
    const storedIsLoggedIn = getLocalStorage('isLoggedIn')
    setIsLoggedIn(!!accessToken || storedIsLoggedIn)
  }, []);
  const navigate = useNavigate()
  const handleLogout = () =>{
    removeLocalStorage(ACCESS_TOKEN)
    removeLocalStorage("email")
    removeLocalStorage("isLoggedIn")
    setIsLoggedIn(false)
    navigate("/")
  }
  const renderLogin = () =>{
    const[email,setEmail] =useState<string>('')
    useEffect(()=>{
      setEmail(getLocalStorage('email')|| '')
    },[])
   
    if (email !== ''){
      return(
        <div className={css["header-right"]}>
        <div className={css["header-right-author"]} >
          {email}
        </div>
        <div className={css["header-right-author"]}>
          <Link to="/" onClick={handleLogout}>Đăng xuất</Link>
          
        </div>
      </div>
      )
    }else{
      return(
        <div className={css["header-right"]}>
        <div className={css["header-right-author"]} >
          <Link to="/login">Đăng nhập</Link>
        </div>
        <div className={css["header-right-author"]}>
          <Link to="/register">Đăng ký</Link>
        </div>
      </div>
      )
    }
  }
 
  return (
    <>
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
              <img className={css["header-icon"]} src={icvn} />
            </div>
            {renderLogin()}
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
    </>
  )
}

export default Header