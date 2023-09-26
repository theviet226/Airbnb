
import css from "./card.module.scss";
import { Link } from "react-router-dom";



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
