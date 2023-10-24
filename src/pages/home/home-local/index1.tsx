import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import css from "./home-local.module.scss"

import { CarouselRef } from 'antd/es/carousel';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';

import { Local } from 'src/services/localtion.service';
import { setListLocal } from 'src/redux/localtion.slice';

const HomeLocal: React.FC = () => {
    const refCarousel = useRef<CarouselRef>(null);
    const locals = useSelector((state: any) => state.local.listLocal);
    console.log(locals)
    const dispatch = useDispatch();
    useEffect(() => {
        Local()
            .then((content) => {
                dispatch(setListLocal(content));
                console.log(content)
            });
    }, [dispatch])

    return (
        <div className='home'>
            <div className='container'>
                <p className="home-title">Khám phá Việt Nam
                    <p className='home-text'>Các địa điểm nổi tiếng này có nhiều điều chờ đón bạn</p>
                </p>

                <Carousel ref={refCarousel} autoplay slidesToShow={6}>
                    {locals.map((item:any, index:any) => (
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