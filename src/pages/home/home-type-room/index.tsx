import React, { useRef } from 'react';
import css from './home-type-room.module.scss';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';

const HomeTypeRoom: React.FC = () => {
    const refCarousel = useRef<CarouselRef>(null);

    const items = [
        { imgSrc: 'src/assets/images/room/1.jpeg', title: 'Khách sạn' },
        { imgSrc: 'src/assets/images/room/2.jpeg', title: 'Căn hộ' },
        { imgSrc: 'src/assets/images/room/3.jpeg', title: 'Resort' },
        { imgSrc: 'src/assets/images/room/4.jpeg', title: 'Biệt thự' },
        { imgSrc: 'src/assets/images/room/5.jpeg', title: 'Nhà gỗ' },
        { imgSrc: 'src/assets/images/room/6.jpeg', title: 'Nhà nghĩ thôn dã' },
        { imgSrc: 'src/assets/images/room/7.jpeg', title: 'Khách sạn căn hộ' },
        { imgSrc: 'src/assets/images/room/8.jpeg', title: 'Nhà nghỉ ven đường' },
    ];

    return (
        <div className='home'>
            <div className='container'>
                <p className="home-title">Loại chỗ nghỉ</p>
                <Carousel ref={refCarousel} autoplay slidesToShow={4}>
                    {items.map((item, index) => (
                        <div key={`item-${index}`} className={css['carousel-item']}>
                            <img src={item.imgSrc} alt="" />
                            <h2>{item.title}</h2>
                        </div>
                    ))}
                </Carousel>
            </div>

        </div>
    );
};

export default HomeTypeRoom;
