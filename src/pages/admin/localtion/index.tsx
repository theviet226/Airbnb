import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setListLocal } from 'src/redux/localtion.slice';
import { Local } from 'src/services/localtion.service';

function Location() {
  const dispatch = useDispatch();
  const locals = useSelector((state: any) => state.local.listLocal)

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
                {locals.map((local: any, index: any) => (
                  <tr key={index}>
                    <td>{local.id}</td>
                    <td>{local.tenViTri}</td>
                    <td>{local.tinhThanh}</td>
                    <td>{local.quocGia}</td>
                    <td><img style={{ display: "block", width: "50%" }} src={local.hinhAnh} alt="" /></td>
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

export default Location