import { useState } from 'react';
import css from './search.module.scss';
import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';
import AutoCompleteInput from 'src/components/SearchResults';
// import 'antd/dist/antd.css';

// const { RangePicker } = DatePicker;

function Search() {
    const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

    const handleSelect = (data: any) => {
        console.log('Selected:', data);
    };

    const handleDateRangeChange = (dates: any) => {
        setSelectedDateRange(dates);
    };

    return (
        <>
            <div className={css.search}>
                <div className={css['search-item']}>
                    <div className={css['search-content']}>
                        <p>Địa điểm</p>
                        <div className={css["search-label"]}>
                            <i className="fa-solid fa-map"></i>
                            {/* <input className={css['search-input']} placeholder="Bạn sắp đi đâu ?" /> */}
                            <AutoCompleteInput onSelect={handleSelect} />
                        </div>
                    </div>
                </div>
                <div className={css['search-item']}>
                    <div className={css['search-content']}>
                        <p>Ngày nhận phòng -- Ngày trả phòng</p>
                        <div className={css["search-label"]}>
                            <i className="fa-regular fa-calendar-days"></i>
                            <DatePicker.RangePicker
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
