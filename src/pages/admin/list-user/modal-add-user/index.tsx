import  { useState } from 'react';
import { addUser } from 'src/services/user.service';
import { TAdminInfo } from 'src/types';
import css from './modal-add-user.module.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Địa chỉ email không hợp lệ').required('Bạn phải nhập email'),
    password: Yup.string().required('Bạn phải nhập mật khẩu'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Phải trùng với password')
        .required('Bạn phải nhập confirmPassword'),
    phone: Yup.string().required('Bạn phải nhập số điện thoại'),
    name: Yup.string().required('Bạn phải nhập tên'),
    role: Yup.string().required('Bạn phải chọn role'),
});

function ModalAddUser() {
    const [formData] = useState<TAdminInfo>({
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        name: '',
        role: '1',
    });

    return (
        <div className="card">
            <div className="card-header text-center">
                <h2>Add User</h2>
            </div>
            <div className="card-body">
                <Formik
                    initialValues={formData}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            const newUser = await addUser(values);
                            console.log('New user added:', newUser);
                            toast("Thêm mới admin thành công!")
                            resetForm();
                        } catch (error) {
                            console.error('Error adding user:', error);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className={css['user-input']}>Email:</label>
                                        <Field
                                            style={{ fontSize: '18px' }}
                                            className="form-control"
                                            type="text"
                                            name="email"
                                        />
                                        <ErrorMessage

                                            name="email"
                                            component="div"
                                            className="error-message text-danger"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className={css['user-input']}>Password:</label>
                                        <Field
                                            style={{ fontSize: '18px' }}
                                            className="form-control"
                                            type="password"
                                            name="password"
                                        />
                                        <ErrorMessage

                                            name="password"
                                            component="div"
                                            className="error-message text-danger"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className={css['user-input']}>Confirm Password:</label>
                                        <Field
                                            style={{ fontSize: '18px' }}
                                            className="form-control"
                                            type="password"
                                            name="confirmPassword"
                                        />
                                        <ErrorMessage

                                            name="confirmPassword"
                                            component="div"
                                            className="error-message text-danger"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className={css['user-input']}>Phone:</label>
                                        <Field
                                            style={{ fontSize: '18px' }}
                                            className="form-control"
                                            type="text"
                                            name="phone"
                                        />
                                        <ErrorMessage

                                            name="phone"
                                            component="div"
                                            className="error-message text-danger"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className={css['user-input']}>Name:</label>
                                        <Field
                                            style={{ fontSize: '18px' }}
                                            className="form-control"
                                            type="text"
                                            name="name"
                                        />
                                        <ErrorMessage

                                            name="name"
                                            component="div"
                                            className="error-message text-danger "
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className={css['user-input']}>Quyền Quản Trị</label>
                                        <Field
                                            as="select"
                                            style={{ fontSize: '18px' }}
                                            className="form-control"
                                            name="role"
                                        >
                                            <option value="1">Admin</option>
                                        </Field>
                                        <ErrorMessage

                                            name="role"
                                            component="div"
                                            className="error-message text-danger"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                style={{ fontSize: '18px' }}
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                Add User
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ModalAddUser;
