
import css from "./card.module.scss";
import { Link } from "react-router-dom";
// const data = {
//   id: 1,
//   tenPhong: "NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!",
//   khach: 3,
//   phongNgu: 1,
//   giuong: 1,
//   phongTam: 1,
//   moTa: "Tự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nDinh Long là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.",
//   giaTien: 28,
//   mayGiat: true,
//   banLa: true,
//   tivi: true,
//   dieuHoa: false,
//   wifi: true,
//   bep: false,
//   doXe: true,
//   hoBoi: true,
//   banUi: true,
//   maViTri: 1,
//   hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg",
// };
type TRoom = {
  tenPhong: string;
  giuong: number;
  moTa: string;
  giaTien: number;
  hinhAnh: string;
  id:number
};
type Props = {
  data: TRoom;
};

export function CardRoom(props:Props) {
  const { data } = props;
  return (
    <div className={css["card"]}>
      <div className={css["card-img"]}>
        <img className={css["img"]} src={data.hinhAnh} />
      </div>

      <div>
        <div className={css["content"]}>
          <h4 className={css["room-name"]}>{data.tenPhong}</h4>
          <div className={css["room-title"]}>{data.moTa}</div>
          <p className={css["room-title"]}>{data.giuong} Giường</p>
        </div>
        <div className={css["room-hiden"]}>
        <Link className={css["button"]} to={`/detail/${data.id}`}>Xem chi tiết</Link>
          <span className={css["price"]}>${data.giaTien} / đêm</span>
          
        </div>
      </div>
    </div>
  );
}
