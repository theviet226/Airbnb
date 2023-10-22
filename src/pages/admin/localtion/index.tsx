import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setListLocal, setSelectedLocal, deleteLocalId } from 'src/redux/localtion.slice';
import { Local, updateLocal, deleteLocal } from 'src/services/localtion.service';
import ModalAddLocal from './modal-addLocal';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import css from "./localtion.module.scss"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOKENUSER } from 'src/constants';

function Location() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const locals = useSelector((state: any) => state.local.listLocal);
  const selectLocal = useSelector((state: any) => state.local.selectedLocal);
  const [editedNameLocal, setEditedNameLocal] = useState("");
  const [editedNameProvince, setEditedNameProvince] = useState("");
  const [editedCountry, setEditedCountry] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const localsPerPage = 9; // Số lượng người dùng trên mỗi trang
  const indexOfLastUser = currentPage * localsPerPage;
  const indexOfFirstUser = indexOfLastUser - localsPerPage;
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    Local()
      .then((content) => {
        dispatch(setListLocal(content));
      });
  }, [dispatch]);

  console.log(locals)
  const handleUpdaterLocal = () => {
    const updatedLocalData = {
      id: selectLocal.id,
      tenViTri: editedNameLocal,
      tinhThanh: editedNameProvince,
      quocGia: editedCountry,
      hinhAnh: editedImage,
    };

    updateLocal(selectLocal.id, updatedLocalData, TOKENUSER)
      .then((updateLocal) => {
        // Sử dụng map để tìm và cập nhật local trong mảng locals
        const updatedLocals = locals.map((local: any) =>
          local.id === updateLocal.id ? updateLocal : local
        );
        dispatch(setListLocal(updatedLocals));
        closeModal();
        toast.success('Cập nhật vị trí thành công !');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Cập nhật vị trí thất bại !');
      });
  }
  const handleDeleteLocal = (localId: string) => {
    deleteLocal(localId)
      .then(() => {
        dispatch(deleteLocalId(localId))
        toast.success('Xoá vị trí thành công !')
      })
      .catch((error) => {
        console.log(error)
        toast.error('Xoá vị trí không thành công !')
      })
  }

  const handleViewLocal = (local: any) => {
    dispatch(setSelectedLocal(local));
    setEditedNameLocal(local.tenViTri);
    setEditedNameProvince(local.tinhThanh);
    setEditedCountry(local.quocGia);
    setEditedImage(local.hinhAnh);
    openModal();
  }
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
      <div className='col-3'>
        <ModalAddLocal />
      </div>
      <div className="col-md-9">
        <div className="card">
          <div className="card-header text-center">
            <h2>Danh sách vị trí</h2>
          </div>
          <div className="card-body table-responsive">
            <table className="table table-bordered table-responsive" id="danhSachAdmin">
              <thead>
                <tr className="text-center bg-primary">
                  <th className="text-nowrap">Mã Vị Trí</th>
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
                      <button style={{ marginRight: "10px" }} className='btn btn-danger' onClick={()=> {handleDeleteLocal(local.id)}} >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button className='btn btn-warning' onClick={() => { handleViewLocal(local) }}>
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
      <Modal isOpen={isModalOpen} toggle={closeModal}>
        <ModalHeader ><h2>Thông tin vị trí</h2></ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="name">Mã vị trí</label>
            <input
              type="text"
              id="id"
              name="id"
              value={selectLocal ? selectLocal.id : ''}
              className="form-control"
              disabled
              style={{
                fontSize: "20px"
              }}
            />

          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="email">Tên vị trí</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedNameLocal}
              onChange={(e) => setEditedNameLocal(e.target.value)}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            />
          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="email">Tỉnh Thành</label>
            <input
              type="text"
              id="tinhthanh"
              name="tinhthanh"
              value={editedNameProvince}
              onChange={(e) => setEditedNameProvince(e.target.value)}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            />
          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="email">Quốc gia</label>
            <input
              type="text"
              id="quocgia"
              name="quocgia"
              value={editedCountry}
              onChange={(e) => setEditedCountry(e.target.value)}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            />
          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="email">Hình ảnh</label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-control-file"
              accept='image/*'
              style={{
                fontSize: "20px"
              }}
            />
          </div>
          <div className='form-group'>
            <label className={css["modal-label"]} htmlFor="preview">Xem trước</label>
            <img
              id='preview'
              className='img-preview'
              src=''
              alt='Xem Trước'
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button style={{ fontSize: "20px" }} color="danger" onClick={closeModal}>
            Đóng
          </Button>
          <Button style={{ fontSize: "20px" }} color="primary" onClick={handleUpdaterLocal} >
            Cập nhật
          </Button>
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default Location