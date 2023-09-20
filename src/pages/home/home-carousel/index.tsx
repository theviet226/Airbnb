import React, { useRef } from "react";

import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import css from "./home-carousel.module.scss";
import PrevIcon from "src/assets/icons/prev.icon";
import NextIcon from "src/assets/icons/next.icon";
// type Props = {
//   data: TCard[];
// };



const HomeCarousel: React.FC = () => {


    const refCarousel = useRef<CarouselRef>(null);

    const hanldeNext = () => {
        refCarousel.current?.next();
    };
    const hanldePrev = () => {
        refCarousel.current?.prev();
    };

    return (
        <>
            <button className={css["button-Prev"]} onClick={hanldePrev}>
                <PrevIcon />
            </button>
            <button className={css["button-Next"]} onClick={hanldeNext}>
                <NextIcon />
            </button>
            <Carousel
                ref={refCarousel}
                autoplay

                className={css["carousel-main"]}
            >
                <div className={css["inf-home"]}>

                    <div>
                        <img style={{
                            display: "block",
                            width: "100%",
                            height: "600px",
                            objectFit: "cover"
                        }}
                            src="https://cdn.discordapp.com/attachments/944428791638417428/1153944040933425232/Vietnamese-Phrases-For-Travel.jpg"
                        />
                    </div>

                </div>
            </Carousel>
        </>
    );
};

export default HomeCarousel;
