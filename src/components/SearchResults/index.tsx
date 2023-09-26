import { useState, useEffect, SetStateAction } from 'react';
import { AutoComplete } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { setListLocal } from 'src/redux/localtion.slice';
import { Local } from 'src/services/localtion.service';
type OnSelectCallback = (value: string) => void;
interface AutoCompleteInputProps {
    onSelect: OnSelectCallback;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({ onSelect }) => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();
    const locals = useSelector((state: any) => state.local.listLocal);
    const data = locals?.map((local: any) => local.tinhThanh);

    useEffect(() => {
        Local({
            id: locals?.id,
            tenViTri: locals?.tenViTri,
            tinhThanh: locals?.tinhThanh,
            quocGia: locals?.quocGia,
            hinhAnh: locals?.hinhAnh,
        })
            .then((content) => {
                dispatch(setListLocal(content));
            })
    }, [dispatch])

    const onChange = (data: SetStateAction<string>) => {
        setValue(data);
    };

    const handleSearch = (text: string) => {
        // Lọc danh sách tỉnh thành dựa trên từ khóa tìm kiếm
        const filteredProvinces = data.filter((data: string) =>
            data.toLowerCase().includes(text.toLowerCase())
        );

        const filteredOptions = filteredProvinces.map((data: any) => ({ value: data }));
        setOptions(filteredOptions);
    };

    return (
        <AutoComplete
            options={options}
            style={{
                width: 200,
            }}
            onSelect={onSelect}
            onSearch={handleSearch}
            value={value}
            onChange={onChange}
            placeholder="Địa điểm bạn muốn đến"
        />
    );
};

export default AutoCompleteInput;
