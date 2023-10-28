
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Room, deleteRoom, updateRoom } from "src/services/room.service"
import { deleteRoomId, setListRoom, setSelectedRoom } from "src/redux/room.slice";
import css from "./room-manage.module.scss"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { TOKENUSER } from 'src/constants';
import ModalAddRoom from './modal-addroom';






function RoomMangage() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rooms = useSelector((state: any) => state.room.listRoom);
  const selectRoom = useSelector((state: any) => state.room.selectedRoom)

  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 6;
  const indexOfLastUser = currentPage * roomsPerPage;
  const indexOfFirstUser = indexOfLastUser - roomsPerPage;
  const [editedLocal, seteditedLocal] = useState(0);
  const [editedRoomName, setEditedRoomName] = useState('');
  const [editedPrice, setEditedPrice] = useState(0);
  const [editedDescription, setEditedDes] = useState('');
  const [editedGuests, setEditedGuest] = useState('');
  const [editedBeds, setEditedBed] = useState(0);
  const [editedBedRoom, seteditedBedRoom] = useState(0);
  const [editedBathRoom, seteditedBathRoom] = useState(0);
  const [editedTivi, setEditedTivi] = useState(true);
  const [editedWifi, setEditedWifi] = useState(true);
  const [editedHoBoi, setEditedHoBoi] = useState(true);
  const [editedBanLa, setEditedBanLa] = useState(true);
  const [editedBanUi, setEditedBanUi] = useState(true);
  const [editedBep, setEditedBep] = useState(true);
  const [editedDieuHoa, setEditedDieuHoa] = useState(true);
  const [editedDoXe, setEditedDoXe] = useState(true);
  const [editedMayGiat, setEditedMayGiat] = useState(true);
  // const editedImage = useState('')

  const openModal = () => {
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    Room()
      .then((content) => {
        dispatch(setListRoom(content));
      })
      .catch((error) => {
        console.log(error)
      })
  }, [dispatch])
  const handleUpdaterRoom = () => {
    const updatedRoomData = {
      id: selectRoom.id,
      tenPhong: editedRoomName,
      maViTri: editedLocal,
      giaTien: editedPrice,
      moTa: editedDescription,
      khach: editedGuests,
      giuong: editedBeds,
      phongNgu: editedBedRoom,
      phongTam: editedBathRoom,
      banLa: editedBanLa,
      banUi: editedBanUi,
      bep: editedBep,
      dieuHoa: editedDieuHoa,
      doXe: editedDoXe,
      hoBoi: editedHoBoi,
      mayGiat: editedMayGiat,
      tivi: editedTivi,
      wifi: editedWifi,
      hinhAnh: ''
    };

    updateRoom(selectRoom.id, updatedRoomData, TOKENUSER)
      .then((resp) => {
        const updatedRoom = resp.content;
        console.log(updatedRoom)
        const updatedRooms = rooms.map((room: any) =>
          room.id === selectRoom.id ? updatedRoom : room
        );
        dispatch(setListRoom(updatedRooms));
        closeModal();
        toast.success(resp.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Cập nhật phòng thất bại !');
      });
  }

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

  const handleViewRoom = (room: any) => {
    dispatch(setSelectedRoom(room));
    openModal()
    seteditedLocal(room.maViTri);
    setEditedRoomName(room.tenPhong);
    console.log(room.tenPhong)
    setEditedPrice(room.giaTien);
    setEditedDes(room.moTa);
    seteditedBathRoom(room.phongTam);
    seteditedBedRoom(room.phongNgu);
    setEditedBanLa(room.banLa);
    setEditedBanUi(room.banUi)
    setEditedBep(room.bep);
    setEditedBed(room.giuong);
    setEditedDieuHoa(room.dieuHoa);
    setEditedDoXe(room.doXe);
    setEditedGuest(room.khach);
    setEditedHoBoi(room.hoBoi);
    setEditedTivi(room.tivi);
    setEditedWifi(room.wifi);
    setEditedMayGiat(room.mayGiat);

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
      <div className='col-md-3'>
        <ModalAddRoom rooms={rooms}/>
      </div>
      <div className="col-md-9">
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
                  <th className="text-nowrap">Giá tiền</th>
                  <th className="text-nowrap">Mô tả</th>
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
                    <td>{room.giaTien}$</td>
                    <td>{room.moTa}</td>
                    <td>{room.khach}</td>
                    <td>
                      <button onClick={() => handleDeleteRoom(room.id)} style={{ marginRight: "10px" }} className='btn btn-danger' >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button onClick={() => { handleViewRoom(room) }} className='btn btn-warning'>
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
      <Modal isOpen={isModalOpen} toggle={closeModal}>
        <ModalHeader ><h2>Thông tin vị trí</h2></ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="name">Mã phòng</label>
            <input
              type="text"
              id="id"
              name="id"
              value={selectRoom ? selectRoom.id : ''}
              className="form-control"
              disabled
              style={{
                fontSize: "20px"
              }}
            />

          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="name">Mã vị trí</label>
            <input
              type="text"
              id="local"
              name="local"
              value={editedLocal}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            />

          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="email">Tên phòng</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedRoomName}
              onChange={(e) => setEditedRoomName(e.target.value)}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            />
          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="email">Giá tiền</label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedPrice}
              onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            />
          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="email">Mô tả</label>
            <input
              type="text"
              id="des"
              name="des"
              value={editedDescription}
              onChange={(e) => setEditedDes(e.target.value)}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            />
          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="email">Số khách</label>
            <input
              type="number"
              id="guest"
              name="guest"
              value={editedGuests}
              onChange={(e) => setEditedGuest(e.target.value)}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            />
          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="email">Số giường</label>
            <input
              type="text"
              id="bed"
              name="bed"
              value={editedBeds}
              onChange={(e) => setEditedBed(parseFloat(e.target.value))}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            />
          </div><div className="form-group">
            <label className={css["modal-label"]} htmlFor="email">Số phòng tắm</label>
            <input
              type="text"
              id="phongtam"
              name="phongtam"
              value={editedBathRoom}
              onChange={(e) => seteditedBathRoom(parseFloat(e.target.value))}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            />
          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="email">Số phòng ngủ</label>
            <input
              type="text"
              id="phongngu"
              name="phongngu"
              value={editedBedRoom}
              onChange={(e) => seteditedBedRoom(parseFloat(e.target.value))}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            />
          </div>
          <div className={css["option-room"]}>
            <div className={css["form-row"]}>
              <div className="form-group">
                <label className={css["modal-label"]} htmlFor="banLa">Bàn là</label>
                <input
                  type="checkbox"
                  id="banLa"
                  name="banLa"
                  checked={editedBanLa}
                  onChange={(e) => setEditedBanLa(e.target.checked)}
                  className="form-check-input"
                />
              </div>
              <div className="form-group">
                <label className={css["modal-label"]} htmlFor="banUi">Bàn ủi</label>
                <input
                  type="checkbox"
                  id="banUi"
                  name="banUi"
                  checked={editedBanUi}
                  onChange={(e) => setEditedBanUi(e.target.checked)}
                  className="form-check-input"
                />
              </div>
              <div className="form-group">
                <label className={css["modal-label"]} htmlFor="bep">Bếp</label>
                <input
                  type="checkbox"
                  id="bep"
                  name="bep"
                  checked={editedBep}
                  onChange={(e) => setEditedBep(e.target.checked)}
                  className="form-check-input"
                />
              </div>
              <div className="form-group">
                <label className={css["modal-label"]} htmlFor="dieuhoa">Điều hòa</label>
                <input
                  type="checkbox"
                  id="dieuhoa"
                  name="dieuhoa"
                  checked={editedDieuHoa}
                  onChange={(e) => setEditedDieuHoa(e.target.checked)}
                  className="form-check-input"
                />
              </div>
            </div>
            <div className={css["form-row"]}>
              <div className="form-group">
                <label className={css["modal-label"]} htmlFor="doxe">Đỗ xe</label>
                <input
                  type="checkbox"
                  id="doxe"
                  name="doxe"
                  checked={editedDoXe}
                  onChange={(e) => setEditedDoXe(e.target.checked)}
                  className="form-check-input"
                />
              </div>
              <div className="form-group">
                <label className={css["modal-label"]} htmlFor="maygiat">Máy giặt</label>
                <input
                  type="checkbox"
                  id="maygiat"
                  name="maygiat"
                  checked={editedMayGiat}
                  onChange={(e) => setEditedMayGiat(e.target.checked)}
                  className="form-check-input"
                />
              </div>
              <div className="form-group">
                <label className={css["modal-label"]} htmlFor="maygiat">Hồ bơi</label>
                <input
                  type="checkbox"
                  id="hoboi"
                  name="hoboi"
                  checked={editedHoBoi}
                  onChange={(e) => setEditedHoBoi(e.target.checked)}
                  className="form-check-input"
                />
              </div>
              <div className="form-group">
                <label className={css["modal-label"]} htmlFor="tivi">Tivi</label>
                <input
                  type="checkbox"
                  id="tivi"
                  name="tivi"
                  checked={editedTivi}
                  onChange={(e) => setEditedTivi(e.target.checked)}
                  className="form-check-input"
                />
              </div>
              <div className="form-group">
                <label className={css["modal-label"]} htmlFor="wifi">Wifi</label>
                <input
                  type="checkbox"
                  id="wifi"
                  name="wifi"
                  checked={editedWifi}
                  onChange={(e) => setEditedWifi(e.target.checked)}
                  className="form-check-input"
                />
              </div>
            </div>
          </div>



        </ModalBody>
        <ModalFooter>
          <Button onClick={closeModal} style={{ fontSize: "20px" }} color="danger" >
            Đóng
          </Button>
          <Button onClick={handleUpdaterRoom} style={{ fontSize: "20px" }} color="primary"  >
            Cập nhật
          </Button>
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </div>

  )
}

export default RoomMangage