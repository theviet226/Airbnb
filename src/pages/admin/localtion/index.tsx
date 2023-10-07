import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setListLocal } from 'src/redux/localtion.slice';
import { Local } from 'src/services/localtion.service';

function Location() {
  const dispatch = useDispatch();
  const locals = useSelector((state: any) => state.local.listLocal)
  const [currentPage, setCurrentPage] = useState(1);
  const localsPerPage = 9; // Số lượng người dùng trên mỗi trang
  const indexOfLastUser = currentPage * localsPerPage;
  const indexOfFirstUser = indexOfLastUser - localsPerPage;

  useEffect(() => {
    Local({
      id: locals?.id,
      tenViTri: locals?.tenViTri,
      tinhThanh: locals?.tinhThanh,
      quocGia: locals?.quocGia,
      hinhAnh: locals?.hinhAnh,
    })
      .then((content) => {
        console.log(content)
        dispatch(setListLocal(content));
      })
  }, [dispatch])
  const totalUsers = locals.length;
  const totalPages = Math.ceil(totalUsers / localsPerPage);

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
            <h2>Danh sách vị trí</h2>
          </div>
          <div className="card-body table-responsive">
            <table className="table table-bordered table-responsive" id="danhSachAdmin">
              <thead>
                <tr className="text-center bg-primary">
                  <th className="text-nowrap">ID</th>
                  <th className="text-nowrap">Tên vị trí</th>
                  <th className="text-nowrap">Tỉnh thành</th>
                  <th className="text-nowrap">Quốc gia</th>
                  <th className="text-nowrap">Hình ảnh</th>
                  <th className="text-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {locals.slice(indexOfFirstUser, indexOfLastUser).map((local: any, index: any) => (
                  <tr key={index}>
                    <td>{local.id}</td>
                    <td>{local.tenViTri}</td>
                    <td>{local.tinhThanh}</td>
                    <td>{local.quocGia}</td>
                    <td><img style={{ display: "block", width: "100px" }} src={local.hinhAnh} alt="" /></td>
                    <td>
                      <button style={{ marginRight: "10px" }} className='btn btn-danger' >
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
        <div style={{
          textAlign: "center"
        }}>

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

export default Location