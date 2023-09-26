import { useState } from "react";
import css from "./modal-add-user.module.scss"
import { TUserInfo } from 'src/types'
import { useFormik } from "formik";
import { addUser } from "src/services/user.service";
import * as Y from "yup";
const addUserSchema = Y.object({
    email: Y.string().email("Email không hợp lệ").required("Bạn chưa nhập Email"),
    password: Y.string().min(2, "Password quá ngắn").max(20, "Password quá ngắn"),
    confirmPassword: Y.string().oneOf([Y.ref("password")], "Phải trùng với Password").required("Bạn chưa nhập lại password"),
    phone: Y.number().typeError("Số điện thoại không đúng").positive("Số điện thoại không bắt đầu bằng chữ hoặc ký tự đặc biệt").integer("Số điện thoại không bao gồm dấu thập phân").min(10, "Số điện thoại không được dưới 10 số").max(11, "Số điện thoại không được dài hơn 11 số"),
    name: Y.string().matches(/^[A-Za-z ]*$/, "Vui lòng nhập tên hợp lệ").max(40).required("Bạn chưa nhập dữ liệu"),
});
function ModalAddUser() {
    const [gender, setGender] = useState<boolean | undefined>(undefined);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            name: "",
            date: "",
            gender: undefined,
            role: ""
        },
        validationSchema: addUserSchema,
        onSubmit: (value) => {
            const data: TUserInfo = {
                email: value.email,
                password: value.password,
                confirmPassword: value.confirmPassword,
                phone: value.phone,
                name: value.name,
                gender: gender,
                date: value.date,
                role: value.role,

            };
            addUser(data).then(() => {

            }).catch((e) => {
                console.log(e)
            })
        },
    });
    return (
        <div className="card ">
            <form onSubmit={formik.handleSubmit} >
                <div className="card-header text-center">
                    <h2>Thêm Mới Tài Khoản</h2>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Họ Và Tên</label>
                                <input
                                    style={{ fontSize: "18px" }}
                                    required
                                    className="form-control" type="text"
                                    placeholder="Nhập vào họ và tên "
                                    {...formik.getFieldProps("name")}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className={css["user-input"]}>
                                <label className="form-label">Email</label>
                                <input
                                    style={{ fontSize: "18px" }}
                                    required
                                    className="form-control"
                                    type="text"
                                    placeholder="Nhập vào email"
                                    {...formik.getFieldProps("email")}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className={css["user-input"]}>Mật Khẩu</label>
                                <input
                                    style={{ fontSize: "18px" }}
                                    required
                                    className="form-control"
                                    type="password"
                                    {...formik.getFieldProps("password")}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className={css["user-input"]}>Nhập Lại Mật Khẩu</label>
                                <input
                                    style={{ fontSize: "18px" }}
                                    required
                                    className="form-control"
                                    type="password"
                                    {...formik.getFieldProps("confirmPassword")}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className={css["user-input"]}>Số điện thoại</label>
                                <input
                                    style={{ fontSize: "18px" }}
                                    required
                                    className="form-control"
                                    type="number"
                                    {...formik.getFieldProps("phone")}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className={css["user-input"]}>Quyền Quản Trị</label>
                                <select
                                    style={{ fontSize: "18px" }}
                                    className="form-control"
                                    {...formik.getFieldProps("role")}  
                                >
                                    <option value="1">Admin</option>
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-end">
                    <button className="btn btn-primary" type="submit">Thêm Tài Khoản</button>
                </div>
            </form>
        </div>
    )
}

export default ModalAddUser