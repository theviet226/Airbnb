import { useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import css from "./home-local.module.scss"
// import { Local } from 'src/services/localtion.service';
// import { setListLocal } from 'src/redux/localtion.slice';
import { CarouselRef } from 'antd/es/carousel';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import dn from "src/assets/images/local/danang.jpg"
import dl from "src/assets/images/local/dl.jpg"
import hcm from 'src/assets/images/local/hcm.jpg'
import hn from 'src/assets/images/local/hn.jpg'
import nt from 'src/assets/images/local/nhatrang.jpg'
import pt from 'src/assets/images/local/phanthiet.jpg'
import vt from 'src/assets/images/local/vungtau.jpg'
import ct from 'src/assets/images/local/ct.jpg'
const HomeLocal: React.FC = () => {
    const refCarousel = useRef<CarouselRef>(null);
    const locals = [
        { imgSrc: dn, title: 'Đà Nẵng', id: 'list-room/6' },
        { imgSrc: dl, title: 'Đà Lạt', id: 'list-room/7' },
        { imgSrc: hcm, title: 'Hồ Chí Minh', id: 'list-room/1' },
        { imgSrc: hn, title: 'Hà Nội', id: 'list-room/4' },
        { imgSrc: nt, title: 'Nha Trang', id: 'list-room/3' },
        { imgSrc: pt, title: 'Mũi Né', id: 'list-room/8' },
        { imgSrc: vt, title: 'Vũng Tàu', id: 'list-room/2' },
        // { imgSrc: ct, title: 'Cần Thơ', id: 'list-room/2' },
    ]
    return (
        <div className='home'>
            <div className='container'>
                <p className="home-title">Khám phá Việt Nam
                    <p className='home-text'>Các địa điểm nổi tiếng này có nhiều điều chờ đón bạn</p>
                </p>

                <Carousel ref={refCarousel} autoplay slidesToShow={6}>
                    {locals.map((item, index) => (
                        <div key={index} className={css['carousel-item']}>
                            <Link to={item.id}>
                                <img src={item.imgSrc} alt="" />
                                <h2 style={{ marginTop: "10px" }}>{item.title}</h2>
                            </Link>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default HomeLocal