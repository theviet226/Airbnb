
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListBooking } from 'src/redux/booking-room.slice';
import { BookingRoom } from "src/services/room.service"

function BookingInfo() {
  const dispatch = useDispatch();
  const bookings = useSelector((state: any) => state.booking.listBooking)

  useEffect(() => {
    BookingRoom({
      id: bookings?.id,
      maPhong: bookings?.maPhong,
      ngayDen: bookings?.ngayDen,
      ngayDi: bookings?.ngayDi,
      soLuongKhach: bookings?.soLuongKhach
    })
      .then((content) => {
        dispatch(setListBooking(content));

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
            <h2>Danh sách đặt phòng</h2>
          </div>
          <div className="card-body table-responsive">
            <table className="table table-bordered table-responsive" id="danhSachAdmin">
              <thead>
                <tr className="text-center bg-primary">
                  <th className="text-nowrap">ID</th>
                  <th className="text-nowrap">Mã Phòng</th>
                  <th className="text-nowrap">Ngày đến</th>
                  <th className="text-nowrap">Ngày đi</th>
                  <th className="text-nowrap">Số lượng khách</th>
                  <th className="text-nowrap">Mã người dùng</th>
                  <th className="text-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking: any, index: any) => (
                  <tr key={index}>
                    <td>{booking.id}</td>
                    <td>{booking.maPhong}</td>
                    <td>{booking.ngayDen}</td>
                    <td>{booking.ngayDi}</td>
                    <td>{booking.soLuongKhach}</td>
                    <td>{booking.maNguoiDung}</td>
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

export default BookingInfo