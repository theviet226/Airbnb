import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TLocalInfo } from 'src/types';
import { addLocal } from 'src/services/localtion.service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOKENUSER } from 'src/constants';
const validationSchema = Yup.object().shape({
    vitri: Yup.string().required('Bạn phải nhập tên vị trí'),
    tinhthanh: Yup.string().required('Bạn phải tên tỉnh thành'),
    quocgia: Yup.string().required('Bạn phải nhập tên quốc gia'),
})
function ModalAddLocal() {
    const [formData] = useState<TLocalInfo>({
        hinhAnh: '',
        quocGia: '',
        tenViTri: '',
        tinhThanh: '',
    });
    return (
        <div className='card'>
            <div className='card-header text-center'>
                <h2>Thêm vị trí</h2>
            </div>
            <div className='card-body'>
                <Formik
                    initialValues={formData}
                    validationSchema={validationSchema}
                    onSubmit={async (data, { resetForm }) => {
                        try {
                            const newLocal = await addLocal(data, TOKENUSER);
                            console.log('New user added:', newLocal);
                            toast.success('Thêm vị trí thành công')
                            resetForm()
                        } catch (error) {
                            console.log(error)
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label>Tên vị trí</label>
                                        <Field
                                            style={{ fontSize: '18px' }}
                                            className='form-control'
                                            type='text'
                                            name="vitri"
                                        />
                                        <ErrorMessage
                                            name='vitri'
                                            component='div'
                                            className='error-message text-danger'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label >Tỉnh thành</label>
                                        <Field
                                            style={{ fontSize: '18px' }}
                                            className='form-control'
                                            type='text'
                                            name="tinhthanh"
                                        />
                                        <ErrorMessage
                                            name='tinhthanh'
                                            component='div'
                                            className='error-message text-danger'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label>Quốc gia</label>
                                        <Field
                                            style={{ fontSize: '18px' }}
                                            className='form-control'
                                            type='text'
                                            name="quocgia"
                                        />
                                        <ErrorMessage
                                            name='quocgia'
                                            component='div'
                                            className='error-message text-danger'
                                        />
                                    </div>
                                </div>


                            </div>
                            <button
                                style={{ fontSize: '18px' }}
                                type='submit'
                                className='btn btn-primary'
                                disabled={isSubmitting}
                            >
                                Thêm vị trí
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ModalAddLocal