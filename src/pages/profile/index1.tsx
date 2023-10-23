// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import css from "./profile.module.scss";
// import { updateUser, getProfile, UpdateAvatar } from 'src/services/user.service';
// import { setUsers } from 'src/redux/user.slice';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import { TOKENUSER } from 'src/constants';




// function Profile() {
//   const profileUser = useSelector((state: any) => state.authReducerLogin.authLogin.user);
//   const [file, setFile] = useState<File | undefined>()
//   const [preview, setPreview] = useState<string | ArrayBuffer | undefined>()
//   const [isModalOpen, setModalOpen] = useState(false)
//   const [selectedImage, setSelectedImage] = useState(null);
//   const dispatch = useDispatch()
//   const [userProfile, setUserProfile] = useState<{
//     name: string;
//     email: string;
//     avatar: string;
//     role: string;
//     gender: string;
//     phone: string;
//     birthdate: string
//   }>({ name: '', email: '', avatar: '', role: '', gender: '', phone: '', birthdate: '' });
//   const [editedProfile, setEditedProfile] = useState({ ...userProfile });


//   const fetchUserProfile = async (id: any) => {
//     try {
//       const userProfile = await getProfile(id);
//       setEditedProfile({ ...userProfile });
//       setUserProfile(userProfile);
//       console.log("Thông tin người dùng: ", userProfile);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (profileUser) {
//       fetchUserProfile(profileUser.id);
//     }
//   }, [profileUser]);

//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };
//   const handleImageChange = (event: any) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target) { // Kiểm tra e.target không phải là null
//           setSelectedImage(e.target.result);
//           setFile(selectedFile);
//         }
//       };
//       reader.readAsDataURL(selectedFile);
//     }
//   };
  

//   const handleImageUpload = (e: any) => {
//     e.preventDefault();
//     const formData = new FormData();
//     if (typeof file === 'undefined') return;
//     formData.append('formFile', file);
//     UpdateAvatar(formData, TOKENUSER)
//       .then((resp) => {
//         // Cập nhật thông tin người dùng trong Redux
//         dispatch(setUsers({ ...userProfile, avatar: resp.avatar }));
//         setUserProfile((prevProfile) => ({
//           ...prevProfile,
//           avatar: resp.avatar,
//         }));
//         toast.success("Thay đổi ảnh thành công");
//         setModalOpen(false)
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   return (
//     <>
//       <div style={{ paddingTop: '100px' }} className='container'>
//         <div className={css["profile-container"]}>
//           <div className={css['left-panel']}>

//             <div className={css.avatar}>
//               <label htmlFor="avatar">
//                 <img src={userProfile.avatar} alt="Avatar" id='avatar' />
//                 <button onClick={openModal}>Cập nhật ảnh đại diện</button>
//               </label>
//             </div>

//           </div>

//           {isModalOpen && (
//             <div className={css.modal}>
//               <div className={css["modal-content"]}>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//                 {selectedImage && (
//                   <img
//                     src={selectedImage}
//                     alt="Thumbnail"
//                     className={css["thumbnail"]}
//                   />
//                 )}
//                 <button onClick={handleImageUpload}>OK</button>
//                 <button onClick={closeModal}>Hủy</button>
//               </div>
//             </div>
//           )}

//         </div>
//         <ToastContainer />
//       </div>
//     </>
//   );
// }


// export default Profile;
