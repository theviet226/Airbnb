// import React from 'react'
import css from "./home-preferential.module.scss"

export default function HomePreferential() {
    return (
        <div className='home'>
            <div className='container'>
                <p className='home-title'>Ưu đãi</p>
                <p className='home-text'>Khuyễn mãi ,giảm giá và ưu đãi đặc biệt dành riêng cho bạn</p>
                <div className={css.preferential}>
                    <div className={css['preferential-item']}>
                        <img src="src/assets/images/preferential/1.jpeg" alt="" />
                        <div className={css['preferential-content']}>
                            <p className={css['preferential-text']}>Vi vu theo cách của bạn
                                <p className={css['preferential-text2']}>Tiết kiệm ít nhất 15% cho lưu trú toàn cầu, từ nghỉ dưỡng đến phiêu lưu hoang dã</p>
                            </p>

                            <button style={{
                                fontSize: "16px",
                                fontWeight: "500"
                            }} className='btn btn-primary'>Tìm ưu đãi mùa du lịch</button>
                        </div>
                    </div>
                    <div className={css['preferential-item']}>
                        <img src="src/assets/images/preferential/2.jpeg" alt="" />
                        <div className={css['preferential-content']}>
                            <p className={css['preferential-text']}>Vi vu theo cách của bạn</p>
                            <p className={css['preferential-text2']}>Khám phá hàng nghìn điểm đến khắp thế giới và tiết kiệm từ 15%</p>
                            <button style={{
                                fontSize: "16px",
                                fontWeight: "500"
                            }} className='btn btn-primary'>Tìm ưu đãi cuối năm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
