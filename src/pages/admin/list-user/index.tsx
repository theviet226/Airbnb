import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from 'src/services/user.service'; 
import css from "./user.module.scss";
import { setUsers, setSelectedUser } from "src/redux/user.slice";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { updateUser } from 'src/services/user.service'; 

function ListUsers() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
  const users = useSelector((state:any) => state.user.usersList);
  const selectedUser = useSelector((state:any) => state.user.selectedUser);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedGender, setEditedGender] = useState(""); 
  const [editedRole, setEditedRole] = useState(""); 
  
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


    updateUser(selectedUser.id, updatedUserData) 
      .then((updatedUser) => {
        const updatedUsers = users.map((user: { id: any; }) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        dispatch(setUsers(updatedUsers));
       closeModal();
      })
      .catch((error) => {
        console.error(error);
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
  const handleViewUser = (user:any) => {
    dispatch(setSelectedUser(user)); 
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedGender(user.gender.toString()); 
    setEditedRole(user.role);
    openModal(); 
    
  };

  return (
    <div className={css.user}>
        <div className="row">
            <div className="col-md-3">
                <div className="card ">
                    <form id="formdata" >
                        <div className="card-header text-center">
                            <h2>Thêm Mới Tài Khoản</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Họ Và Tên</label>
                                        <input style={{fontSize:"18px"}} tabIndex={1} className="form-control" id="name" name="name" type="text"
                                        placeholder="Nhập vào họ và tên "/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className={css["user-input"]}>
                                        <label className="form-label">Email</label>
                                        <input style={{fontSize:"18px"}} tabIndex={1} className="form-control" id="email" name="email" type="text"
                                        v-model="email" v-on:blur="checkEmail()" placeholder="Nhập vào email" />

                                        <small id="message_email"></small>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className={css["user-input"]}>Mật Khẩu</label>
                                              <input style={{fontSize:"18px"}} tabIndex={1} className="form-control" id="password" name="password"
                                           type="password" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className={css["user-input"]}>Nhập Lại Mật Khẩu</label>
                                 
                                              <input style={{fontSize:"18px"}} tabIndex={1} className="form-control" id="re_password" name="re_password"
                                            type="password" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className={css["user-input"]}>Giới Tính</label>
                                        <select style={{fontSize:"18px"}} name="gioi_tinh" id="gioi_tinh" className="form-control">
                                            <option value="1">Nam</option>
                                            <option value="0">Nữ</option>
                                            <option value="2">Không xác định</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                     <div className="mb-3">
                                        <label className={css["user-input"]}>Quyền Quản Trị</label>
                                        <select style={{fontSize:"18px"}} name="id_quyen" id="id_quyen" className="form-control">                        
                                            <option value="1">Admin</option>
                                            <option value="2">User</option>                                  
                                        </select>
                                     </div>
                                 </div>
                            </div>
                        </div>
                        <div className="card-footer text-end">
                            <button className="btn btn-primary" type="submit">Tạo Tài Khoản</button>
                        </div>
                    </form>
                </div>
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
                                {users.map((user:any, index:any) => (
                                 <tr key={index} className="text-center">
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button  className='btn btn-primary'>
                                            <i className="fa-solid fa-lock"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button style={{ marginRight: "10px" }} className='btn btn-danger' >
                                            <i  className="fa-solid fa-trash"></i>
                                        </button>
                                        <button className='btn btn-warning'
                                        onClick={()=> handleViewUser(user)}>
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
          <Button style={{fontSize:"20px"}} color="primary" onClick={closeModal}>
            Đóng
          </Button>
          <Button style={{fontSize:"20px"}} color="primary" onClick={handleUpdateUser} >
            Cập nhật
          </Button>
        </ModalFooter>
      </Modal>

    </div>
  )
}
export default ListUsers


 
                          

                                              
        