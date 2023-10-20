

export type TRoomIteam = {
    id: number;
    tenPhong: string;
    khach: number;
    phongNgu: number;
    giuong: number;
    phongTam: number;
    moTa: string;
    giaTien: number;
    mayGiat: boolean;
    banLa: boolean;
    tivi: boolean;
    dieuHoa: boolean;
    wifi: boolean;
    bep: boolean;
    doXe: boolean;
    hoBoi: boolean;
    banUi: boolean;
    maViTri: number;
    hinhAnh: string;
}

export type TUserInfo = {
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    gender: boolean | undefined;
    name: string;
    date: string;
    role: string;
};
export type TComment = {
    id: number;
    ngayBinhLuan: string;
    noiDung: string;
    saoBinhLuan: number;
    tenNguoiBinhLuan: string;
    avatar: string;
    saoBinhLuan:string;


<<<<<<< HEAD
}
=======
    
}
>>>>>>> 44519e7e9f3618b700821e3ac65065b8ce5f1433
