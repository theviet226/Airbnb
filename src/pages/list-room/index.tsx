
import  { useEffect } from "react";
import css from "./list-room.module.scss";
import { useParams } from "react-router-dom";

import { getRoomList } from "src/services/room.service";
import { CardRoom } from "src/components/cardRoom";
import { listRoomReduce } from "src/redux/roomReduce";
import { RootState, useAppSelector } from "src/redux/config-store";
import { useDispatch } from "react-redux";
type TPrams = {
  maViTri: string;
};




function ListRoom() {
  const params = useParams<TPrams>();
  const listRoom = useAppSelector((state: RootState) => {
    return state.roomReduce.listRoom;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!params.maViTri) return;
    getRoomList(params.maViTri)
      .then((resp) => {
        console.log(resp);
        const action = listRoomReduce(resp.content);
        dispatch(action);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params.maViTri]);
  return (
    <>
      <div style={{
        padding: "50px 10px"
      }} className='container'>
        <div>
          <div className={css["list-title"]}>
            <p>Chỗ ở tại khu vực bản đồ đã chọn</p>
          </div>
          <div className={css["list-detail"]}>
            <ul>
              <li>
                <button className={css["list-button"]}>Loại nơi ở</button>
              </li>
              <li>
                <button className={css["list-button"]}>Giá</button>
              </li>
              <li>
                <button className={css["list-button"]}>Đặt ngay</button>
              </li>
              <li>
                <button className={css["list-button"]}>
                  Phòng và phòng ngủ
                </button>
              </li>
              <li>
                <button className={css["list-button"]}>Bộ lọc khác</button>
              </li>
            </ul>
          </div>
          <hr />
          <div className={css["list-col"]}>
            <div>
              {listRoom.map((item) => {
                return <CardRoom key={item.id} data={item} />;
              })}
            </div>
            <div className={css["list-map"]}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d299213.59201617626!2d105.6982301238565!3d9.819754702494679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zS2jDoWNoIHPhuqFu!5e0!3m2!1svi!2s!4v1695388312454!5m2!1svi!2s"
                style={{
                  border: 0,
                 
                  zIndex: "1",
                  width: "450px",
                  height: "500px",
                  right: "10x",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListRoom;
