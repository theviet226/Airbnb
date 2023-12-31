export type TRoomIteam = {
    id: number;
    tenPhong: string;
    khach: string;
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
export type TAdminInfo = {
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    name: string;
    role: string;
};
export type TComment = {
    id: number;
    ngayBinhLuan: string;
    noiDung:string;
    saoBinhLuan: number;
    tenNguoiBinhLuan: string;
    avatar: string;
}


export type TLocalInfo = {
    hinhAnh: string;
    // id : string;
    quocGia: string;
    tenViTri : string;
    tinhThanh: string
}
export type  TProfileUser= {
    email: string;
    phone: string;
    gender: boolean | undefined;
    name: string;
    date: string;
    avarta: string;
    role:string;
  };
    


