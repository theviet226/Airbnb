
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Room } from "src/services/room.service"
import { setListRoom } from "src/redux/room.slice";
import css from "./room-manage.module.scss"


function RoomMangage() {
  const dispatch = useDispatch();
  const rooms = useSelector((state: any) => state.room.listRoom);

  useEffect(() => {
    Room({
      tenphong: rooms?.tenphong,
      khach: rooms?.khach,
      hinhanh: rooms?.hinhanh,
      vitri: rooms?.vitri
    })
      .then((content) => {
        dispatch(setListRoom(content));
        console.log(content)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [dispatch])
  return (
    <div className='row'>
      <div className="col-md-12">
        <div className="card">
          <div className="card-header text-center">
            <h2>Danh sách phòng</h2>
          </div>
          <div className="card-body ">
            <table className="table " id="danhSachAdmin">
              <thead>
                <tr className="text-center bg-primary">
                  <th className="text-nowrap">Mã phòng</th>
                  <th className="text-nowrap">Tên Phòng</th>
                  <th className="text-nowrap">Hình ảnh</th>
                  <th className="text-nowrap">Vị trí</th>
                  <th className="text-nowrap">Số người</th>
                  <th className="text-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room: any, index: any) => (
                  <tr key={index}>
                    <td>{room.id}</td>
                    <td>{room.tenPhong}</td>
                    <td><img className={css["img-room"]} src={room.hinhAnh} alt="11" /></td>
                    <td>{room.maViTri}</td>
                    <td>{room.khach}</td>
                    <td>
                      <button style={{ marginRight: "10px" }} className='btn btn-danger' >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button className='btn btn-warning'>
                        <i className="fa-solid fa-user-pen"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  )
}

export default RoomMangage