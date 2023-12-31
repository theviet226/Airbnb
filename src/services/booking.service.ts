
import { axiosWithAuth, axiosWithoutAuth } from "./config.service"

export const Booking = async (data: { ngayDen: string, ngayDi: string, soLuongKhach: string }) => {
  try {
    const resp = await axiosWithoutAuth({
      method: "post",
      url: "/dat-phong",
      data
    })
    return resp.data
  } catch (error) {
    console.log(error)
  }
}
export const checkBooking = async (maPhong: string): Promise<any> => {
  try {
    const resp = await axiosWithoutAuth({
      method: "get",
      url: "/dat-phong",
      data: maPhong,
    });

    const allBookings = resp.data.content;


    return allBookings;
  } catch (error) {
    console.log(error);
    return "Có lỗi xảy ra khi kiểm tra lịch đặt.";
  }
};




export const deleteBooking = async (id: string) => {
  try {
    const resp = await axiosWithAuth({
      method: "delete",
      url: `/dat-phong/${id}`
    })
    console.log(resp.data)
    return resp.data
  } catch (error) {
    console.log(error)
  }
}

export const bookingHistory = async (id: string) => {
  try {
    const resp = await axiosWithoutAuth({
      method: 'get',
      url: `/dat-phong/lay-theo-nguoi-dung/${id}`
    })
    return resp.data.content
  } catch (error) {
    console.log(error)
  }
}
