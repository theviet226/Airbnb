import { useState, useEffect } from "react";
import css from "./detail.module.scss";
import { useParams } from "react-router-dom";
import { getRoomId } from "src/services/room.service";
import { TComment, TRoomIteam } from "src/types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/redux/config-store";
import { Booking, checkBooking } from "src/services/booking.service";
import { setBookingRoom } from "src/redux/bookingReduce";
import { setLocalStorage } from "src/utils";
import { BOOKING } from "src/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker } from "antd";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Comment } from "src/services/comment.service";


dayjs.extend(isBetween);

type TPrams = {
  detailId: string;
};
type TComments = {
  maPhong: string
}

function DetailRoom() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [numberOfNights, setNumberOfNights] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const params = useParams<TPrams>();
  const [userData, setUserData] = useState<any>(null);
  const maPhong = params.detailId || "";
  const [roomId, setRoomId] = useState<TRoomIteam>();
  const [quantity, setQuantity] = useState(0);
  const [childQuanTiTy, setChildQuanTity] = useState(0);
  const [babyQuanTiTy, setBabyQuanTity] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const [comments, setComment] = useState<TComment[]>([]);

  const calculateNumberOfNights = (
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs,
  ) => {
    const duration = endDate.diff(startDate, "day");
    return duration;
  };

  const handleDateRangeChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => {
    setSelectedDateRange(dates);
    if (dates[0] && dates[1]) {
      const startDate = dayjs(dates[0]);
      const endDate = dayjs(dates[1]);
      const nights = calculateNumberOfNights(startDate, endDate);
      setNumberOfNights(nights);
      const roomPrice = roomId?.giaTien || 0;
      const totalPrice = roomPrice * nights;
      setTotalPrice(totalPrice);
    } else {
      setNumberOfNights(null);
      setTotalPrice(null);
    }
  };

  const hanldeDropDown = (state: boolean) => {
    setOpen(!state);
  };
  const [booking, setBooking] = useState({
    ngayDen: "",
    ngayDi: "",
    soLuongKhach: "",
    maNguoiDung: "",
    maPhong: "",
  });


  useEffect(() => {
    Comment(maPhong)
      .then((resp) => {
        setComment(resp)
      })
      .catch((error) => {
        console.log(error)
      });
  }, [maPhong])
  useEffect(() => {
    if (!params.detailId) return;
    getRoomId(params.detailId)
      .then((resp) => {
        setRoomId(resp.content);
      })
      .catch((e) => {
        console.log(e);
      });
    const userFromLocalStorage = localStorage.getItem("authLogin");
    if (userFromLocalStorage) {
      const parsedUserData = JSON.parse(userFromLocalStorage);
      setUserData(parsedUserData.user);
    }
  }, [params.detailId]);
  const [, setSoLuongKhach] = useState("");
  const handleBooking = async (e: any) => {
    e.preventDefault();

    if (!selectedDateRange || !selectedDateRange[0] || !selectedDateRange[1]) {
      toast.error("Vui lòng chọn ngày đến và ngày đi");
      return;
    }

    const [ngayDen, ngayDi] = selectedDateRange.map((date) =>
      date ? date.format("YYYY-MM-DD") : ""
    );

    if (isLoggedIn()) {
      const checkResult = await checkBooking(maPhong);


      // Kiểm tra xung đột ngày đặt
      const isBookingConflict = checkResult.some((booking: { ngayDen: string | number | Dayjs | Date | null | undefined; ngayDi: string | number | Dayjs | Date | null | undefined; }) => {
        const bookingStart = dayjs(booking.ngayDen);
        const bookingEnd = dayjs(booking.ngayDi);
        const userStart = dayjs(ngayDen);
        const userEnd = dayjs(ngayDi);

        return (
          userStart.isBetween(bookingStart, bookingEnd, null, "[]") ||
          userEnd.isBetween(bookingStart, bookingEnd, null, "[]")
        );
      });


      if (isBookingConflict) {
        console.log(isBookingConflict);
        toast.error("Ngày đặt trùng lịch với đơn đặt phòng khác.");
        return;
      }

      const updatedBooking = {
        ...booking,
        ngayDen,
        ngayDi,
        soLuongKhach: total.toString(),
        maNguoiDung: userData.id,
        maPhong: maPhong,
      };
      setBooking(updatedBooking);
      setSoLuongKhach(updatedBooking.soLuongKhach);
      Booking(updatedBooking)
        .then((resp) => {
          setLocalStorage(BOOKING, resp.content);
          dispatch(setBookingRoom(resp.content));
          toast.success("Đặt phòng thành công!");
        })
        .catch((e) => {
          console.log(e);
        });

    } else {
      alert("Bạn cần phải đăng nhập để đặt phòng !");
      navigate("/login");
      return;
    }
  };





  const isLoggedIn = () => {
    const authLoginData = localStorage.getItem("authLogin");
    if (authLoginData) {
      const authLogin = JSON.parse(authLoginData);
      if (authLogin && authLogin.token) {
        return true;
      }
    }

    return false;
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    setTotal(total + 1);
  };
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setTotal(total - 1);
    }
  };
  const handleIncreaseChild = () => {
    setChildQuanTity(childQuanTiTy + 1);
    setTotal(total + 1);
  };
  const handleDecreaseChild = () => {
    if (childQuanTiTy > 0) {
      setChildQuanTity(childQuanTiTy - 1);
      setTotal(total - 1);
    }
  };
  const handleIncreaseBaby = () => {
    setBabyQuanTity(babyQuanTiTy + 1);
    setTotal(total + 1);
  };
  const handleDecreaseBaby = () => {
    if (babyQuanTiTy > 0) {
      setBabyQuanTity(babyQuanTiTy - 1);
      setTotal(total - 1);
    }
  };

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
                  <DatePicker.RangePicker
                    style={{
                      padding: "15px 50px",
                      color: "#000",
                    }}
                    placeholder={["Ngày nhận phòng", "Ngày trả phòng"]}
                    format="DD/MM/YYYY"
                    showTime={false}
                    value={selectedDateRange}
                    onChange={handleDateRangeChange}
                    className={css["date-detail"]}
                  />
                </div>
                <div className={css["dropdown1"]}>
                  <label style={{ padding: "8px 0" }}>
                    <div style={{ fontSize: "14px", fontWeight: "300" }}>
                      KHÁCH
                    </div>
                    <div>
                      <div>
                        <span>Số Lượng:</span>
                        <input
                          type="text"
                          value={total}
                          name="soLuongKhach"
                          onChange={handleChange}
                          style={{ outline: "none", border: "none" }}
                        />
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
                        <button
                          onClick={handleDecrease}
                          className={css["detail-dropdown-button"]}
                        >
                          -
                        </button>
                        <span style={{ padding: "0 10px" }}>{quantity}</span>
                        <button
                          onClick={handleIncrease}
                          className={css["detail-dropdown-button"]}
                        >
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
                        <button
                          onClick={handleDecreaseChild}
                          className={css["detail-dropdown-button"]}
                        >
                          -
                        </button>
                        <span style={{ padding: "0 10px" }}>
                          {childQuanTiTy}
                        </span>
                        <button
                          onClick={handleIncreaseChild}
                          className={css["detail-dropdown-button"]}
                        >
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
                        <button
                          onClick={handleDecreaseBaby}
                          className={css["detail-dropdown-button"]}
                        >
                          -
                        </button>
                        <span style={{ padding: "0 10px" }}>
                          {babyQuanTiTy}
                        </span>
                        <button
                          onClick={handleIncreaseBaby}
                          className={css["detail-dropdown-button"]}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ padding: "15px 40px" }}>
                <button
                  type="submit"
                  onClick={handleBooking}
                  className={css["detail-pay"]}
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
                <p>
                  ${roomId?.giaTien} x {numberOfNights} đêm
                </p>
                <p>${totalPrice}</p>
              </div>
              <div className={css["detail-cacl"]}>
                <p>Phí dịch vụ</p>
                <p>$2</p>
              </div>
              <hr />
              <div className={css["detail-total"]}>
                <p>Tổng trước thuế</p>
                <p>${totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {comments.map((comment) => (
          <div key={comment.id} className={css["detail-comment"]}>
            <div>
              <div className={css["detail-comment-img"]}>
                <img
                  src={comment?.avatar}
                  style={{ width: 50, height: 50, borderRadius: "50%", border: "none", outline: "none" }}
                />
                <div className={css["detail-comment-img-text"]}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: 0,
                    }}
                  >
                    {comment?.tenNguoiBinhLuan}
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      marginBottom: 0,
                      color: "#717171",
                    }}
                  >
                    {comment?.ngayBinhLuan}
                  </p>
                </div>
              </div>
              <div>
                <span style={{ fontSize: "16px", fontFamily: "Roboto" }}>
                  {comment?.noiDung}
                </span>
              </div>
            </div>

          </div>
        ))}


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
      <ToastContainer />
    </>
  );
}

export default DetailRoom;



