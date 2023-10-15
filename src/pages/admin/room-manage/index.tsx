
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Room, deleteRoom } from "src/services/room.service"
import { deleteRoomId, setListRoom } from "src/redux/room.slice";
import css from "./room-manage.module.scss"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RoomMangage() {
  const dispatch = useDispatch();
  const rooms = useSelector((state: any) => state.room.listRoom);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 6; // Số lượng người dùng trên mỗi trang
  const indexOfLastUser = currentPage * roomsPerPage;
  const indexOfFirstUser = indexOfLastUser - roomsPerPage;

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
  const handleDeleteRoom = (id: string) => {
    deleteRoom(id)
      .then(() => {
        dispatch(deleteRoomId(id))
        toast.success('Xoá thông tin  phòng thành công')
      })
      .catch((error) => {
        console.log(error)
        toast.error('Xoá thông tin  phòng thất bại')
      })
  }

  const totalUsers = rooms.length;
  const totalPages = Math.ceil(totalUsers / roomsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
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
                {rooms.slice(indexOfFirstUser, indexOfLastUser).map((room: any, index: any) => (
                  <tr key={index}>
                    <td>{room.id}</td>
                    <td>{room.tenPhong}</td>
                    <td><img className={css["img-room"]} src={room.hinhAnh} alt="11" /></td>
                    <td>{room.maViTri}</td>
                    <td>{room.khach}</td>
                    <td>
                      <button onClick={() =>handleDeleteRoom(room.id)} style={{ marginRight: "10px" }} className='btn btn-danger' >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button className='btn btn-warning'>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={css.pagination}>

          <button className='btn ' onClick={prevPage}><i className="fa-solid fa-backward"></i></button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              style={{
                fontSize: '20px'
              }}
              key={index}
              onClick={() => paginate(index + 1)}
              className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-light'}`}
            >
              {index + 1}
            </button>
          ))}
          <button className='btn ' onClick={nextPage}><i className="fa-solid fa-forward"></i></button>
        </div>
      </div>
      <ToastContainer />
    </div>

  )
}

export default RoomMangage