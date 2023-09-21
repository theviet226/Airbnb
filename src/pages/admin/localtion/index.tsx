import React from 'react'

function Location() {
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
                  <th className="text-nowrap">Mã phòng</th>
                  <th className="text-nowrap">Tên Phòng</th>
                  <th className="text-nowrap">Hình ảnh</th>
                  <th className="text-nowrap">Vị trí</th>
                  <th className="text-nowrap">Số người</th>
                  <th className="text-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
    
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Location