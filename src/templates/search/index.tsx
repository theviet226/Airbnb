import React, { useState } from 'react';
import css from './search.module.scss';
import { DatePicker, Space } from 'antd';
// import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;

function Search() {
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

    const handleDateRangeChange = (dates: any, dateStrings: any) => {
        setSelectedDateRange(dates);
        console.log('Ngày nhận phòng:', dateStrings[0]);
        console.log('Ngày trả phòng:', dateStrings[1]);
    };

    return (
        <>
            <div className={css.search}>
                <div className={css['search-item']}>
                    <div className={css['search-content']}>
                        <p>Địa điểm</p>
                        <div className={css["search-label"]}>
                            <i className="fa-solid fa-map"></i>
                            <input className={css['search-input']} placeholder="Bạn sắp đi đâu ?" />
                        </div>
                    </div>
                </div>
                <div className={css['search-item']}>
                    <div className={css['search-content']}>
                        <p>Ngày nhận phòng -- Ngày trả phòng</p>
                        <div className={css["search-label"]}>
                            <i className="fa-regular fa-calendar-days"></i>
                            <RangePicker
                                className={css['search-input']}
                                placeholder={['Ngày nhận phòng', 'Ngày trả phòng']}
                                format="DD/MM/YYYY"
                                showTime={false}
                                value={selectedDateRange}
                                onChange={handleDateRangeChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={css['search-item']}>
                    <div style={{ border: 'none' }} className={css['search-content']}>
                        <p>Khách</p>
                        <div className={css["search-label"]}>
                            <i className="fa-solid fa-person"></i>
                            <input
                                className={css['search-input']}
                                placeholder='Thêm khách'
                            />
                        </div>
                    </div>
                </div>
                <div className={css['search-item']}>
                    <div style={{
                        border: 'none',
                        fontSize: "30px",
                        height: "60px",
                        width: "60px",
                        lineHeight: "60px",
                        backgroundColor: "#006dde",
                        color: "#fff",
                        borderRadius: "50%",
                        textAlign: "center",
                        padding: "0",
                        marginRight: "20px"
                    }} className={css['search-content']}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
