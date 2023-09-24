import React, { useRef } from 'react';
import css from './home-type-room.module.scss';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import ks from 'src/assets/images/room/1.jpeg'
import ch from 'src/assets/images/room/2.jpeg'
import rs from 'src/assets/images/room/3.jpeg'
import bt from 'src/assets/images/room/4.jpeg'
import ng from 'src/assets/images/room/5.jpeg'
import nn from 'src/assets/images/room/6.jpeg'
import ksch from 'src/assets/images/room/7.jpeg'
import nnvd from 'src/assets/images/room/8.jpeg'


const HomeTypeRoom: React.FC = () => {
    const refCarousel = useRef<CarouselRef>(null);

    const items = [
        { imgSrc: ks, title: 'Khách sạn' },
        { imgSrc: ch, title: 'Căn hộ' },
        { imgSrc: rs, title: 'Resort' },
        { imgSrc: bt, title: 'Biệt thự' },
        { imgSrc: ng, title: 'Nhà gỗ' },
        { imgSrc: nn, title: 'Nhà nghĩ thôn dã' },
        { imgSrc: ksch, title: 'Khách sạn căn hộ' },
        { imgSrc: nnvd, title: 'Nhà nghỉ ven đường' },
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
