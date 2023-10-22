import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from 'src/services/user.service';
import css from "./user.module.scss";
import { setUsers, setSelectedUser, deleteUserId } from "src/redux/user.slice";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { updateUser, deleteUser } from 'src/services/user.service';
import ModalAddUser from './modal-add-user';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ListUsers() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const users = useSelector((state: any) => state.user.usersList);
  const selectUser = useSelector((state: any) => state.user.selectedUser);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedGender, setEditedGender] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20; // Số lượng người dùng trên mỗi trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;


console.log(users)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleUpdateUser = () => {
    const updatedUserData = {
      name: editedName,
      email: editedEmail,
      gender: editedGender,
      role: editedRole,
      avatar: '',
    };


    updateUser(selectUser.id, updatedUserData)
      .then((updatedUser) => {
        const updatedUsers = users.map((user: { id: any; }) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        dispatch(setUsers(updatedUsers));
        closeModal();
        toast.success('Cập nhật người dùng thành công!');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Cập nhật người dùng thất bại!');
      });
  };
  const handleDeleteUser = (userId: string) => {
    deleteUser(userId)
      .then(() => {
        dispatch(deleteUserId(userId));
        toast.success('Xoá người dùng thành công!');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Xoá người dùng thất bại!');
      });
  };
  useEffect(() => {
    User()
      .then((content) => {
        dispatch(setUsers(content));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);
  const handleViewUser = (user: any) => {
    dispatch(setSelectedUser(user));
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedGender(user.gender.toString());
    setEditedRole(user.role);
    openModal();

  };
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

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
    <div className={css.user}>
      <div className="row">
        <div className="col-md-3">
          <ModalAddUser />
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-header text-center">
              <h2>Danh sách tài khoản User</h2>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-bordered table-responsive" id="danhSachAdmin">
                <thead>
                  <tr className="text-center bg-primary">
                    <th className="text-nowrap">#</th>

                    <th className="text-nowrap">Họ Và Tên</th>
                    <th className="text-nowrap">Email</th>

                    <th className="text-nowrap">Quyền</th>
                    <th className="text-nowrap">Pass</th>
                    <th className="text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(indexOfFirstUser, indexOfLastUser).map((user: any, index: any) => (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className='btn btn-primary'>
                          <i className="fa-solid fa-lock"></i>
                        </button>
                      </td>
                      <td>
                        <button style={{ marginRight: "10px" }}
                          onClick={() => handleDeleteUser(user.id)}
                          className='btn btn-danger' >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                        <button className='btn btn-warning'
                          onClick={() => handleViewUser(user)}>
                          <i className="fa-solid fa-user-pen"></i>
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

      </div>


      <Modal isOpen={isModalOpen} toggle={closeModal}>
        <ModalHeader ><h2>Thông tin người dùng</h2></ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="name">Họ và Tên:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            />
          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            />
          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="gioi_tinh">Giới Tính:</label>
            <select
              id="gioi_tinh"
              name="gioi_tinh"
              value={editedGender}
              onChange={(e) => setEditedGender(e.target.value)}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            >
              <option value="true">Nam</option>
              <option value="false">Nữ</option>
            </select>
          </div>
          <div className="form-group">
            <label className={css["modal-label"]} htmlFor="id_quyen">Quyền Quản Trị:</label>
            <select
              id="id_quyen"
              name="id_quyen"
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
              className="form-control"
              style={{
                fontSize: "20px"
              }}
            >
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button style={{ fontSize: "20px" }} color="danger" onClick={closeModal}>
            Đóng
          </Button>
          <Button style={{ fontSize: "20px" }} color="primary" onClick={handleUpdateUser} >
            Cập nhật
          </Button>
        </ModalFooter>
      </Modal>
      <ToastContainer />

    </div>
  )
}
export default ListUsers






