
import { axiosWithoutAuth } from "./config.service"

export const Booking =  async(data:{ngayDen:string,ngayDi:string,soLuongKhach:string}) =>{
    try {
        const resp = await axiosWithoutAuth({
            method:"post",
            url:"/dat-phong",
            data
        })
        return resp.data
    } catch (error) {
        console.log(error)
    }
}
export const checkBooking = async (startDate: string, endDate: string): Promise<string | null> => {
    try {
      const resp = await axiosWithoutAuth({
        method: "get",
        url: "/dat-phong",
        params: {
          startDate,
          endDate
        }
      });
  
      const bookings = resp.data;
      if (bookings.length > 0) {
        return "Ngày đến và ngày đi đã được đặt trước đó. Vui lòng chọn ngày khác.";
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return "Đã xảy ra lỗi khi kiểm tra đặt phòng. Vui lòng thử lại sau.";
    }
  };
