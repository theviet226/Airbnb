import { useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import css from "./home-local.module.scss"
// import { Local } from 'src/services/localtion.service';
// import { setListLocal } from 'src/redux/localtion.slice';
import { CarouselRef } from 'antd/es/carousel';
import { Carousel } from 'antd';
import dn from "src/assets/images/local/danang.jpg"
import dl from "src/assets/images/local/dl.jpg"
import hcm from 'src/assets/images/local/hcm.jpg'
import hn from 'src/assets/images/local/hn.jpg'
import nt from 'src/assets/images/local/nhatrang.jpg'
import pt from 'src/assets/images/local/phanthiet.jpg'
import vt from 'src/assets/images/local/vungtau.jpg'
const HomeLocal: React.FC = () => {
    const refCarousel = useRef<CarouselRef>(null);
    const locals = [
        { imgSrc: dn, title: 'Đà Nẵng', id: '' },
        { imgSrc: dl, title: 'Đà Lạt' },
        { imgSrc: hcm, title: 'Hồ Chí Minh', id: '1' },
        { imgSrc: hn, title: 'Hà Nội' },
        { imgSrc: nt, title: 'Nha Trang' },
        { imgSrc: pt, title: 'Phan Thiết' },
        { imgSrc: vt, title: 'Vũng Tàu' },
    ]
    // const dispatch = useDispatch();   
    // const locals = useSelector((state: any) => state.local.listLocal)
    // console.log(locals)

    // useEffect(() => {
    //     Local({
    //         id: locals?.id,
    //         tenViTri: locals?.tenViTri,
    //         tinhThanh: locals?.tinhThanh,
    //         quocGia: locals?.quocGia,
    //         hinhAnh: locals?.hinhAnh,
    //     })
    //         .then((content) => {
    //             dispatch(setListLocal(content));
    //         })
    // }, [dispatch])
    return (
        <div className='home'>
            <div className='container'>
                <p className="home-title">Khám phá Việt Nam
                    <p className='home-text'>Các địa điểm nổi tiếng này có nhiều điều chờ đón bạn</p>
                </p>

                <Carousel ref={refCarousel} autoplay slidesToShow={6}>
                    {locals.map((item, index) => (
                        <div key={index} className={css['carousel-item']}>
                            <img src={item.imgSrc} alt="" />
                            <h2 style={{ marginTop: "10px" }}>{item.title}</h2>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default HomeLocal