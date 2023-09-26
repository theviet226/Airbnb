import { useState, useEffect } from "react";
import css from "./detail.module.scss";
import { useParams } from "react-router-dom";

import { getRoomId } from "src/services/room.service";

import { TRoomIteam } from "src/types";

import { useAppDispatch, useAppSelector } from "src/redux/config-store";
import { Booking, checkBooking } from "src/services/booking.service";
import { setBookingRoom } from "src/redux/bookingReduce";
import { setLocalStorage } from "src/utils";
import { ACCESS_TOKEN, BOOKING } from "src/constants";
import { type } from "os";
import { number } from "yup";

type TPrams = {
  detailId: string;
};

function DetailRoom() {
  const [open, setOpen] = useState<boolean>(false);
  const orderBooking = useAppSelector(
    (state: any) => state.booking.setBookingRoom,
  );
  const hanldeDropDown = (state: boolean) => {
    setOpen(!state);
  };
  const [booking, setBooking] = useState({
    ngayDen: "",
    ngayDi: "",
    soLuongKhach: "",
    maNguoiDung:0,
    maPhong:0,
   
  });

  const params = useParams<TPrams>();
  const [roomId, setRoomId] = useState<TRoomIteam>();
  const [quantity,setQuantity] = useState(0)
  const [childQuanTiTy,setChildQuanTity] = useState(0)
  const [babyQuanTiTy,setBabyQuanTity] = useState(0)
  const [total,setTotal] =useState(0)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!params.detailId) return;
    getRoomId(params.detailId)
      .then((resp) => {
        setRoomId(resp.content);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params.detailId]);
  const [soLuongKhach,setSoLuongKhach] = useState("")
  const handleBooking = (e: any) => {
    e.preventDefault();
      
    const updatedBooking ={
     ...booking,
      
      soLuongKhach:total.toString()
    }
  
    setBooking(updatedBooking)
    setSoLuongKhach(updatedBooking.soLuongKhach)
    Booking(updatedBooking)
      .then((resp) => {
        setLocalStorage(BOOKING, resp.content);
        dispatch(setBookingRoom(resp.content));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() =>{
    checkBooking(params).then((content)=>{

    }).catch((e)=>{
      console.log(e)
    })
  })
  
  const handleIncrease = () =>{
    setQuantity(quantity+1)
    setTotal(total+1)
  }
  const handleDecrease = () =>{
    if (quantity > 0){
      setQuantity(quantity-1)
      setTotal(total-1)
    }
  }
  const handleIncreaseChild = () =>{
    setChildQuanTity(childQuanTiTy+1)
    setTotal(total+1)
  }
  const handleDecreaseChild = () =>{
    if (childQuanTiTy > 0){
      setChildQuanTity(childQuanTiTy-1)
      setTotal(total-1)
    }
  }
  const handleIncreaseBaby = () =>{
    setBabyQuanTity(babyQuanTiTy+1)
    setTotal(total+1)
  }
  const handleDecreaseBaby = () =>{
    if (babyQuanTiTy >0){
      setBabyQuanTity(babyQuanTiTy-1)
      setTotal(total-1)
    }
  }

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setBooking({
      ...booking,
      [name]: value,
    });
  };
  return (
    <>
      <div className="container">
        <div className={css["detail-header"]}>
          <hr />
          <h2 className={css["detail-title"]}>
            <span className={css["span-1"]}>
              <i className="fa-brands fa-periscope"></i>
            </span>
            {roomId?.tenPhong}
          </h2>
        </div>
        <div className={css["detail-content"]}>
          <div>
            <ul className={css["detail-ul"]}>
              <li>
                <i className="fa-solid fa-star"></i> 4,85
              </li>
              <span>-</span>
              <li>
                <a href="#" style={{ color: "rgb(34, 34, 34)" }}>
                  Đánh giá
                </a>
              </li>
              <span>-</span>
              <li>
                <a href="#" style={{ color: "rgb(34, 34, 34)" }}>
                  Việt Nam
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className={css["detail-ul-2"]}>
              <li>
                <i className="fa-solid fa-arrow-up-from-bracket"></i>
                <a
                  href="#"
                  style={{ color: "rgb(34, 34, 34)", paddingLeft: "10px" }}
                >
                  Chia sẻ
                </a>
              </li>
              <li>
                <i className="fa-regular fa-heart"></i>
                <a
                  href="#"
                  style={{ color: "rgb(34, 34, 34)", paddingLeft: "10px" }}
                >
                  Lưu
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={css["detail-img"]}>
          <img src={roomId?.hinhAnh} />
        </div>
        <div className={css["detail-col"]}>
          <div className={css["detail-left"]}>
            <div className={css["detail-name"]}>
              <div>
                <h4 className={css["detail-h4"]}>{roomId?.tenPhong}</h4>
                <p className={css["detail-p"]}>
                  {roomId?.khach} khách - {roomId?.phongNgu} phòng ngủ-{" "}
                  {roomId?.giuong} giường - {roomId?.phongTam} phòng tắm
                </p>
              </div>
              <div>
                <img
                  src="http://i.pravatar.cc?img=1"
                  style={{ width: 70, height: 70, borderRadius: "50%" }}
                />
              </div>
            </div>
            <hr />
            <div>
              <div className={css["detail-convenient"]}>
                <div className={css["detail-convenient-i"]}>
                  <i className="fa-solid fa-house"></i>
                </div>
                <div>
                  <p className={css["detail-convenient-p"]}>Toàn bộ nhà</p>
                  <span className={css["detail-convenient-span"]}>
                    Bạn sẽ có chung cư cao cấp cho riêng mình
                  </span>
                </div>
              </div>
              <div className={css["detail-convenient"]}>
                <div className={css["detail-convenient-i"]}>
                  <i className="fa-solid fa-door-closed"></i>
                </div>
                <div>
                  <p className={css["detail-convenient-p"]}>Tự nhận phòng</p>
                  <span className={css["detail-convenient-span"]}>
                    Tự nhận phòng bằng khóa thông minh
                  </span>
                </div>
              </div>
              <div className={css["detail-convenient"]}>
                <div className={css["detail-convenient-i"]}>
                  <i className="fa-regular fa-calendar"></i>
                </div>
                <div>
                  <p className={css["detail-convenient-p"]}>
                    Miễn phí hủy trong 48 giờ
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div className={css["detail-transe"]}>
              <i
                className="fa-solid fa-language"
                style={{ paddingRight: 15, fontSize: "30px" }}
              ></i>
              <span>Một số thông tin đã được dịch tự động.</span>
              <a
                href=""
                style={{
                  fontWeight: "600",
                  color: "black",
                  textDecoration: "underline",
                }}
              >
                {" "}
                Hiển thị ngôn ngữ gốc.
              </a>
            </div>
            <div>
              <p className={css["detail-info"]}>{roomId?.moTa}</p>
            </div>
            <hr />
            <div className={css["detail-about"]}>
              <p className={css["detail-about-title"]}>
                Nơi này có những gì cho bạn
              </p>
              <div className={css["detail-about-col"]}>
                <div className={css["detail-about-left"]}>
                  {roomId?.mayGiat && (
                    <div className={css["detail-about-img"]}>
                      <i
                        className="fa-solid fa-droplet"
                        style={{
                          fontSize: "24px",
                          paddingRight: "15px",
                          textAlign: "center",
                        }}
                      ></i>
                      <span className={css["detail-about-span"]}>Máy Giặt</span>
                    </div>
                  )}
                  {roomId?.banLa && roomId?.banUi && (
                    <div className={css["detail-about-img"]}>
                      <i
                        className="fa-solid fa-shirt"
                        style={{
                          fontSize: "24px",
                          paddingRight: "15px",
                          textAlign: "center",
                        }}
                      ></i>
                      <span className={css["detail-about-span"]}>
                        Bàn là, bàn ủi
                      </span>
                    </div>
                  )}
                  {roomId?.tivi && (
                    <div className={css["detail-about-img"]}>
                      <i
                        className="fa-solid fa-tv"
                        style={{
                          fontSize: "24px",
                          paddingRight: "15px",
                          textAlign: "center",
                        }}
                      ></i>
                      <span className={css["detail-about-span"]}>Tivi</span>
                    </div>
                  )}
                  {roomId?.dieuHoa && (
                    <div className={css["detail-about-img"]}>
                      <i
                        className="fa-solid fa-snowflake"
                        style={{
                          fontSize: "24px",
                          paddingRight: "15px",
                          textAlign: "center",
                        }}
                      ></i>
                      <span className={css["detail-about-span"]}>Điều hòa</span>
                    </div>
                  )}
                </div>
                <div className={css["detail-about-right"]}>
                  {roomId?.wifi && (
                    <div className={css["detail-about-img"]}>
                      <i
                        className="fa-solid fa-wifi"
                        style={{
                          fontSize: "24px",
                          paddingRight: "15px",
                          textAlign: "center",
                        }}
                      ></i>
                      <span className={css["detail-about-span"]}>wifi</span>
                    </div>
                  )}
                  {roomId?.bep && (
                    <div className={css["detail-about-img"]}>
                      <i
                        className="fa-solid fa-utensils"
                        style={{
                          fontSize: "24px",
                          paddingRight: "15px",
                          textAlign: "center",
                        }}
                      ></i>
                      <span className={css["detail-about-span"]}>Bếp</span>
                    </div>
                  )}
                  {roomId?.hoBoi && (
                    <div className={css["detail-about-img"]}>
                      <i
                        className="fa-solid fa-person-swimming"
                        style={{
                          fontSize: "24px",
                          paddingRight: "15px",
                          textAlign: "center",
                        }}
                      ></i>
                      <span className={css["detail-about-span"]}>
                        Bể bơi riêng
                      </span>
                    </div>
                  )}
                  {roomId?.doXe && (
                    <div className={css["detail-about-img"]}>
                      <i
                        className="fa-solid fa-square-parking"
                        style={{
                          fontSize: "24px",
                          paddingRight: "15px",
                          textAlign: "center",
                        }}
                      ></i>
                      <span className={css["detail-about-span"]}>
                        Bãi đổ xe riêng
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={css["detail-right"]}>
            <div className={css["detail-right-price"]}>
              <div>
                <span
                  style={{
                    fontSize: "30px",
                    fontFamily: "Inter",
                    fontWeight: "600",
                  }}
                >
                  ${roomId?.giaTien}
                </span>
                <span> / đêm</span>
              </div>
              <span>
                <i className="fa-solid fa-star"></i>4,89 -{" "}
                <span
                  style={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontWeight: "300",
                    color: "#adadad",
                  }}
                >
                  36 đánh giá
                </span>
              </span>
            </div>
            <div>
              <div className={css["detail-booking"]}>
                <div className={css["detail-booking-col"]}>
                  <label className={css["detail-label"]} style={{ borderRight: "1px solid" }}>
                    <div style={{ padding: "10px 10px" }}>
                      <p style={{ marginBottom: 0 }}>NHẬN PHÒNG</p>
                      <input
                        type="date"
                        style={{ outline: "none", border: "none" }}
                      />
                    </div>
                  </label>
                  <label className={css["detail-label"]}>
                    <div style={{ padding: "10px 10px" }}>
                      <p style={{ marginBottom: 0 }}>TRẢ PHÒNG</p>
                      <input
                        type="date"
                        style={{ outline: "none", border: "none" }}
                      />
                    </div>
                  </label>
                </div>
                <div className={css["dropdown1"]}>
                  <label style={{ padding: "8px 0" }}>
                    <div style={{ fontSize: "14px", fontWeight: "300" }}>KHÁCH</div>
                    <div>
                      <div>
                        <span>1 Khách</span>
                      </div>
                    </div>
                  </label>
                  <div>
                    <i
                      className="fa-solid fa-chevron-down"
                      onClick={() => hanldeDropDown(open)}
                    ></i>
                  </div>
                </div>
                {open && (
                  <div className={css["detail-select"]}>
                    <div className={css["dropdown"]}>
                      <label className={css["detail-dropdown"]}>
                        <div style={{ fontWeight: "600" }}>Người lớn</div>
                        <div>
                          <div>
                            <span style={{ fontWeight: "300" }}>Từ 13 tuổi trở lên</span>
                          </div>
                        </div>
                      </label>
                      <div>
                        <button className={css["detail-dropdown-button"]}>-</button>
                        <span style={{ padding: "0 10px" }}>0</span>
                        <button className={css["detail-dropdown-button"]}>+</button>
                      </div>
                    </div>
                    <div className={css["dropdown"]}>
                      <label className={css["detail-dropdown"]}>
                        <div style={{ fontWeight: "600" }}>Trẻ em</div>
                        <div>
                          <div>
                            <span style={{ fontWeight: "300" }}>Độ tuổi 2 - 12 tuổi</span>
                          </div>
                        </div>
                      </label>
                      <div>
                        <button className={css["detail-dropdown-button"]}>-</button>
                        <span style={{ padding: "0 10px" }}>0</span>
                        <button className={css["detail-dropdown-button"]}>+</button>
                      </div>
                    </div>
                    <div className={css["dropdown"]}>
                      <label className={css["detail-dropdown"]}>
                        <div style={{ fontWeight: "600" }}>Em bé</div>
                        <div>
                          <div>
                            <span style={{ fontWeight: "300" }}>Dưới 2 tuổi</span>
                          </div>
                        </div>
                      </label>
                      <div>
                        <button className={css["detail-dropdown-button"]}>-</button>
                        <span style={{ padding: "0 10px" }}>0</span>
                        <button className={css["detail-dropdown-button"]}>+</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ padding: "15px 40px" }}>
                <button className={css["detail-pay"]}>Đặt phòng</button>
                <p style={{
                  padding: "20px 0 0px 0",
                  textAlign: "center",
                  fontWeight: "300",
                  fontSize: "16px"
                }}>Bạn vẫn chưa bị trừ tiền</p>
              </div>
              <div className={css["detail-cacl"]}>
                <p>$254 x 5 đêm</p>
                <p>$1.272</p>
              </div>
              <div className={css["detail-cacl"]}>
                <p>Phí dịch vụ</p>
                <p>$28</p>
              </div >
              <hr />
              <div className={css["detail-total"]}>
                <p>Tổng trước thuế</p>
                <p>$1.4757</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className={css["detail-comment"]}>
          <div>
            <div className={css["detail-comment-img"]}>
              <img
                src="http://i.pravatar.cc/?img=1"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              />
              <div className={css["detail-comment-img-text"]}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: 0,
                  }}
                >
                  Gero
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    marginBottom: 0,
                    color: "#717171",
                  }}
                >
                  tháng 8 năm 2023
                </p>
              </div>
            </div>
            <div>
              <span style={{ fontSize: "16px", fontFamily: "Roboto" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
                tempore?
              </span>
            </div>
          </div>
          <div>
            <div className={css["detail-comment-img"]}>
              <img
                src="http://i.pravatar.cc/?img=1"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              />
              <div className={css["detail-comment-img-text"]}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: 0,
                  }}
                >
                  Gero
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    marginBottom: 0,
                    color: "#717171",
                  }}
                >
                  tháng 8 năm 2023
                </p>
              </div>
            </div>
            <div>
              <span style={{ fontSize: "16px", fontFamily: "Roboto" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
                tempore?
              </span>

            </div>
          </div>
          <div className={css["detail-under"]}>
            <div className={css["detail-booking"]}>
              <div style={{ zIndex: "1" }}>
                <div className={css["detail-booking-col"]}>
                  <label
                    className={css["detail-label"]}
                    style={{ borderRight: "1px solid" }}
                  >
                    <div style={{ padding: "10px 10px" }}>
                      <p style={{ marginBottom: 0 }}>NHẬN PHÒNG</p>
                      <input
                        type="date"
                        style={{ outline: "none", border: "none" }}
                        onChange={handleChange}
                        value={booking.ngayDen}
                        name="ngayDen"
                      />
                    </div>
                  </label>
                  <label className={css["detail-label"]}>
                    <div style={{ padding: "10px 10px" }}>
                      <p style={{ marginBottom: 0 }}>TRẢ PHÒNG</p>
                      <input
                        type="date"
                        style={{ outline: "none", border: "none" }}
                        onChange={handleChange}
                        value={booking.ngayDi}
                        name="ngayDi"
                      />
                    </div>
                  </label>
                </div>
                <div className={css["dropdown1"]}>
                  <label style={{ padding: "8px 0" }}>
                    <div style={{ fontSize: "14px", fontWeight: "300" }}>
                      KHÁCH
                    </div>
                    <div>
                      <div>
                        <span>Số Lượng:</span>
                        <input  type="text" value={total} name="soLuongKhach" onChange={handleChange} style={{ outline: "none", border: "none" }}/>
                        
                      </div>
                    </div>
                  </label>
                  <div>
                    <i
                      className="fa-solid fa-chevron-down"
                      onClick={() => hanldeDropDown(open)}
                    ></i>
                  </div>
                </div>
                {open && (
                  <div className={css["detail-select"]}>
                    <div className={css["dropdown"]}>
                      <label className={css["detail-dropdown"]}>
                        <div style={{ fontWeight: "600" }}>Người lớn</div>
                        <div>
                          <div>
                            <span style={{ fontWeight: "300" }}>
                              Từ 13 tuổi trở lên
                            </span>
                          </div>
                        </div>
                      </label>
                      <div>
                        <button onClick={handleDecrease} className={css["detail-dropdown-button"]}>
                          -
                        </button>
                        <span style={{ padding: "0 10px" }}>{quantity}</span>
                        <button onClick={handleIncrease} className={css["detail-dropdown-button"]}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className={css["dropdown"]}>
                      <label className={css["detail-dropdown"]}>
                        <div style={{ fontWeight: "600" }}>Trẻ em</div>
                        <div>
                          <div>
                            <span style={{ fontWeight: "300" }}>
                              Độ tuổi 2 - 12 tuổi
                            </span>
                          </div>
                        </div>
                      </label>
                      <div>
                        <button onClick={handleDecreaseChild} className={css["detail-dropdown-button"]}>
                          -
                        </button>
                        <span style={{ padding: "0 10px" }}>{childQuanTiTy}</span>
                        <button onClick={handleIncreaseChild} className={css["detail-dropdown-button"]}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className={css["dropdown"]}>
                      <label className={css["detail-dropdown"]}>
                        <div style={{ fontWeight: "600" }}>Em bé</div>
                        <div>
                          <div>
                            <span style={{ fontWeight: "300" }}>
                              Dưới 2 tuổi
                            </span>
                          </div>
                        </div>
                      </label>
                      <div>
                        <button onClick={handleDecreaseBaby} className={css["detail-dropdown-button"]}>
                          -
                        </button>
                        <span style={{ padding: "0 10px" }}>{babyQuanTiTy}</span>
                        <button onClick={handleIncreaseBaby} className={css["detail-dropdown-button"]}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div style={{ padding: "15px 40px" }}>
              <button
                className={css["detail-pay"]}
                type="submit"
                onClick={handleBooking}
              >
                Đặt phòng
              </button>
              <p
                style={{
                  padding: "20px 0 0px 0",
                  textAlign: "center",
                  fontWeight: "300",
                  fontSize: "16px",
                }}
              >
                Bạn vẫn chưa bị trừ tiền
              </p>
            </div>
            <div className={css["detail-cacl"]}>
              <p>$254 x 5 đêm</p>
              <p>$1.272</p>
            </div>
            <div className={css["detail-cacl"]}>
              <p>Phí dịch vụ</p>
              <p>$28</p>
            </div>
            <hr />
            <div className={css["detail-total"]}>
              <p>Tổng trước thuế</p>
              <p>$1.4757</p>


            </div>
          </div>
        </div>
        <div className={css["detail-cm"]}>
          <img
            src="http://i.pravatar.cc/?img=2"
            style={{ width: 70, height: 70, borderRadius: "50%" }}
          />
          <form>
            <textarea cols={130} rows={8} />
          </form>
        </div>
        <div className={css["detail-cm-buuton"]}>
          <button className={css["detail-cm-add"]}>Add Comment</button>
        </div>
      </div>

    </>
  );
}

export default DetailRoom;
