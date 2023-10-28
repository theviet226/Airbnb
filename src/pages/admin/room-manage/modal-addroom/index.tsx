import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import { setListRoom } from 'src/redux/room.slice';
import { TRoomIteam } from 'src/types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOKENUSER } from 'src/constants';
import { addRoom } from 'src/services/room.service';
const validationSchema = Yup.object().shape({
  tenPhong: Yup.string().required('Bạn phải nhập tên phòng'),
  maViTri: Yup.string().required('Bạn phải nhập mã vị trí'),
  giaTien: Yup.string().required('Bạn phải nhập giá tiền'),
  moTa: Yup.string().required('Bạn phải nhập mô tả'),
  khach: Yup.string().required('Bạn phải nhập sô khách'),
  giuong: Yup.string().required('Bạn phải nhập số giường'),
  phongNgu: Yup.string().required('Bạn phải nhập số phòng ngủ'),
  phongTam: Yup.string().required('Bạn phải nhập số phòng tắm'),
})
interface ModalAddRoomProps {
  rooms: any; 
}



function ModalAddRoom({ rooms }: ModalAddRoomProps) {
  const dispatch = useDispatch();
  const [formData] = useState<TRoomIteam>({
    id: 0,
    tenPhong: '',
    maViTri: 0,
    giaTien: 0,
    moTa: '',
    khach: '',
    giuong: 0,
    phongNgu: 0,
    phongTam: 0,
    banLa: true,
    banUi: true,
    bep: true,
    dieuHoa: true,
    doXe: true,
    hoBoi: true,
    mayGiat: true,
    tivi: true,
    wifi: true,
    hinhAnh: '',
  });
  return (
    <div className='card'>
      <div className='card-header text-center'>
        <h2>Thêm phòng</h2>
      </div>
      <div className='card-body'>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={async (data, { resetForm }) => {
            try {
              const newRoom = await addRoom(data, TOKENUSER);
              dispatch(setListRoom([...rooms, newRoom]));
              console.log('New user added:', newRoom);
           
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
                    <label>Tên phòng</label>
                    <Field
                      style={{ fontSize: '18px' }}
                      className='form-control'
                      type='text'
                      name="tenPhong"
                    />
                    <ErrorMessage
                      name='tenPhong'
                      component='div'
                      className='error-message text-danger'
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label >Mã vị trí</label>
                    <Field
                      style={{ fontSize: '18px' }}
                      className='form-control'
                      type='number'
                      name="maViTri"
                    />
                    <ErrorMessage
                      name='maViTri'
                      component='div'
                      className='error-message text-danger'
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label>Giá</label>
                    <Field
                      style={{ fontSize: '18px' }}
                      className='form-control'
                      type='number'
                      name="giaTien"
                    />
                    <ErrorMessage
                      name='giaTien'
                      component='div'
                      className='error-message text-danger'
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label>Mô tả</label>
                    <Field
                      style={{ fontSize: '18px' }}
                      className='form-control'
                      type='text'
                      name="moTa"
                    />
                    <ErrorMessage
                      name='moTa'
                      component='div'
                      className='error-message text-danger'
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label>Số khách</label>
                    <Field
                      style={{ fontSize: '18px' }}
                      className='form-control'
                      type='number'
                      name="khach"
                    />
                    <ErrorMessage
                      name='khach'
                      component='div'
                      className='error-message text-danger'
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label>Số giường</label>
                    <Field
                      style={{ fontSize: '18px' }}
                      className='form-control'
                      type='number'
                      name="giuong"
                    />
                    <ErrorMessage
                      name='giuong'
                      component='div'
                      className='error-message text-danger'
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label>Số phòng tắm</label>
                    <Field
                      style={{ fontSize: '18px' }}
                      className='form-control'
                      type='number'
                      name="phongTam"
                    />
                    <ErrorMessage
                      name='phongTam'
                      component='div'
                      className='error-message text-danger'
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label>Số phòng ngủ</label>
                    <Field
                      style={{ fontSize: '18px' }}
                      className='form-control'
                      type='number'
                      name="phongNgu"
                    />
                    <ErrorMessage
                      name='phongNgu'
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
                Thêm phòng
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ModalAddRoom