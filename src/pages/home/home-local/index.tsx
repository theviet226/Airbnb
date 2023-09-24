import {  useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import css from "./home-local.module.scss"
// import { Local } from 'src/services/localtion.service';
// import { setListLocal } from 'src/redux/localtion.slice';
import { CarouselRef } from 'antd/es/carousel';
import { Carousel } from 'antd';

const HomeLocal: React.FC = () => {
    const refCarousel = useRef<CarouselRef>(null);
    const locals = [
        { imgSrc: 'src/assets/images/local/danang.jpg', title: 'Đà Nẵng', id: '' },
        { imgSrc: 'src/assets/images/local/dl.jpg', title: 'Đà Lạt' },
        { imgSrc: 'src/assets/images/local/hcm.jpg', title: 'Hồ Chí Minh',id: '1' },
        { imgSrc: 'src/assets/images/local/hn.jpg', title: 'Hà Nội' },
        { imgSrc: 'src/assets/images/local/nhatrang.jpg', title: 'Nha Trang' },
        { imgSrc: 'src/assets/images/local/phanthiet.jpg', title: 'Phan Thiết' },
        { imgSrc: 'src/assets/images/local/vungtau.jpg', title: 'Vũng Tàu' },
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