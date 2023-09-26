
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListBooking } from 'src/redux/booking-room.slice';
import { BookingRoom } from "src/services/room.service"

function BookingInfo() {
  const dispatch = useDispatch();
  const bookings = useSelector((state: any) => state.booking.listBooking)
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const bookingsPerPage = 21; // Số lượng người dùng trên mỗi trang
  const indexOfLastUser = currentPage * bookingsPerPage;
  const indexOfFirstUser = indexOfLastUser - bookingsPerPage;

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
  const totalUsers = bookings.length;
  const totalPages = Math.ceil(totalUsers / bookingsPerPage);

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
                {bookings.slice(indexOfFirstUser,indexOfLastUser).map((booking: any, index: any) => (
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
        <div style={{textAlign:"center"}}>
            
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
    </div>
  )
}

export default BookingInfo