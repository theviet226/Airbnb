// AdminComponent.js

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from 'src/services/user.service'; 
import css from "./user.module.scss";
import { setUsers } from "src/redux/user.slice";

function Users() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
  const users = useSelector((state:any) => state.user);
  
  const openModal = () => {
    setIsModalOpen(true);
};

// Tạo hàm để đóng modal
const closeModal = () => {
    setIsModalOpen(false);
};

  useEffect(() => {
        User({name: users?.name,
             email: users?.email,
             avatar: users?.avatar,
             role: users?.role,
        })
    .then((content) => {
        dispatch(setUsers(content)); 
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);


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
                                        <button style={{ marginRight: "10px" }} className='btn btn-danger' onClick={openModal}>
                                            <i  className="fa-solid fa-trash"></i>
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
        {/* <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="editModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Cập Nhật Admin</h5>
                        <button className="btn-close" type="button" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" name="id" id="id_admin_edit" hidden/>
                        <div className="mb-3">
                            <label className="form-label">Họ và tên</label>
                            <input tabIndex={1} className="form-control" id="name_edit" name="name"
                                v-model="edit_ds.name" type="text"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input tabIndex={2} className="form-control" id="email_edit"
                                v-model="edit_ds.email" name="email" type="text"/>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Giới Tính</label>
                                <select name="gioi_tinh" id="gioi_tinh_edit" className="form-control" v-model="edit_ds.gioi_tinh">
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                    <option value="2">Không xác định</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Quyền Quản Trị</label>
                                <select v-model="edit_ds.id_quyen" name="id_quyen" id="id_quyen_edit"
                                    className="form-control">
                                    <template v-for="(v, k) in list_quyen">
                                        <option v-bind:value="v.id"> </option>
                                    </template>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                        <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}>Đóng</button>
                            <button v-on:click="updateAdmin()" className="btn btn-secondary"
                                type="button">Lưu Thay Đổi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
    </div>
  )
}
export default Users


 {/* <div className="modal fade" id="modalPassword" tabIndex={-1}
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Đổi Mật Khẩu</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                          
                                              <input type="hidden" v-model="edit_pass.id" />
                                            <div className="mb-3">
                                                <label className="form-label">Mật Khẩu</label>
                                                      <input type="password" className="form-control" name="password"
                                                    v-model="edit_pass.edit_pass" placeholder="Nhập vào mật khẩu mới *" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Xác Nhận Mật Khẩu</label>
                                             
                                                      <input type="password" className="form-control" name="re_password"
                                                    v-model="edit_pass.re_password" placeholder="Nhập lại mật khẩu mới *"/>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal">Đóng</button>
                                            <button type="button" className="btn btn-primary"
                                                v-on:click="updatePassword()">Cập Nhật</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                          

                       
                            {/* <div className="modal fade" id="deleteModal" tabIndex={-1} role="dialog"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Xoá Admin</h5>
                                            <button className="btn-close" type="button" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <input type="text" id="id_admin" hidden/>
                                            <div className="alert alert-danger" role="alert">
                                                <h4 className="alert-heading">Xóa Admin!</h4>
                                                <p>Bạn có chắc chắn muốn xóa Admin <b
                                                        className="text-warning"></b> này không?.</p>
                                                <hr />
                                                <p className="mb-0"><i>Lưu ý: Hành động không thể khôi phục
                                                        lại</i>.</p>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-primary" type="button"
                                                data-bs-dismiss="modal">Đóng</button>
                                            <button v-on:click="xoaAdmin()" className="btn btn-danger"
                                                type="button">Xóa</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}