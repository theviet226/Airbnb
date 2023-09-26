import React from 'react'
import css from "./home-service.module.scss"
import s1 from "src/assets/images/service/1.webp"
import s2 from "src/assets/images/service/2.webp"
import s3 from "src/assets/images/service/3.webp"
import s4 from "src/assets/images/service/4.webp"
function HomeService() {
    return (
        <>
            <div className='home'>
                <div style={{ textAlign: "center" }} className='container'>
                    <p className='home-title'>Tại sao nên đặt chỗ với aribnb?</p>
                    <div className={css.service}>
                        <div className={css["service-item"]}>
                            <img src={s1} alt="" />
                            <p className={css['service-text']}>Giải pháp du lịch hoàn thiện</p>
                            <p className='home-text'>Giải pháp toàn diện - giúp bạn tìm chuyến bay và khách sạn khắp Việt Nam và Đông Nam Á một cách tiết kiệm.</p>
                        </div>
                        <div className={css["service-item"]}>
                            <img src={s2} alt="" />
                            <p className={css['service-text']}>Giá rẻ mỗi ngày</p>
                            <p className='home-text'>Giá bạn thấy là giá bạn trả! Dễ dàng so sánh khi không cần phải trả thêm chi phí ẩn! </p>
                        </div>
                        <div className={css["service-item"]}>
                            <img src={s3} alt="" />
                            <p className={css['service-text']}>Phương thức thanh toán an toàn và linh hoạt</p>
                            <p className='home-text'>Giao dịch trực tuyến an toàn với nhiều lựa chọn như thanh toán tại cửa hàng tiện lợi, chuyển khoản ngân hàng, thẻ tín dụng đến Internet Banking. Không tính phí giao dịch. </p>
                        </div>
                        <div className={css["service-item"]}>
                            <img src={s4} alt="" />
                            <p className={css['service-text']}>Hỗ trợ khách hàng 24/7</p>
                            <p className='home-text'>Đội ngũ nhân viên hỗ trợ khách hàng luôn sẵn sàng giúp đỡ bạn trong từng bước của quá trình đặt vé</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default HomeService