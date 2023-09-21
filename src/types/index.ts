export type TUserInfo = {
    id: number;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    gender: boolean | undefined;
    name: string;
    date: string;
    role:string;
    // Thêm các trường thông tin khác của người dùng nếu cần
};