import { Select } from 'antd';
import { useState, useEffect } from 'react';
import apiAddress from '../api/apiAddress'

function SelectAddress({ valueFormRegister, setValueFormRegister }) {

    const { Option } = Select;

    // get list tỉnh thành
    const [listCities, setListCities] = useState([]);
    const getListCities = () => {
        apiAddress.getProvinces((res, err) => {
            if(res){
                setListCities(res.provinces)
            }
        })
    }
    useEffect(getListCities, []);

    // Chọn tỉnh thành + get list quận huyện
    const [listDistrict, setListDistrict] = useState([]);
    const getListDistrict = (e) => {
        apiAddress.getDistricts(e, (res, err) => {
            setListDistrict(res.districts)
        })
    }
    const chooseProvince = (e) => {
        setValueFormRegister({...valueFormRegister, province: e, district: null, commune: null});
        getListDistrict(e);
        setListDistrict([]);
        setListWard([]);
    }

    // Chọn quận huyện + get list phường xã
    const [listWard, setListWard] = useState([]);
    const getListWard = (e) => {
        apiAddress.getCommunes(e, (res, err) => {
            setListWard(res.communes)
        })
    }
    const chooseDistrict = (e) => {
        setValueFormRegister({...valueFormRegister, district: e, commune: null});
        getListWard(e);
        setListWard([]);
    }

    // Chọn phường xã
    const chooseWard = (e) => {
        setValueFormRegister({...valueFormRegister, commune: e});
    }

    return(
        <div>
            <div>
                <Select
                    allowClear
                    className='select-address'
                    placeholder="Tỉnh/ Thành phố"
                    value={valueFormRegister.city}
                    onSelect={e => chooseProvince(e)}
                    onClear={() => setValueFormRegister({})}
                >
                    {listCities && listCities.map(city => (
                        <Option value={city.id} key={city.id}>{city.name}</Option>
                    ))}
                </Select>
            </div>
            
            <div>
                <Select
                    allowClear
                    className='select-address'
                    value={valueFormRegister.district}
                    style={{ width: '100%', marginBottom: '20px'}}
                    placeholder="Quận/ Huyện"
                    onSelect={e => chooseDistrict(e)}
                    onClear={() => setValueFormRegister({...valueFormRegister, district: null, ward: null})}
                >
                    {listDistrict && listDistrict.map(district => (
                        <Option value={district.id} key={district.id}>{district.name}</Option>
                    ))}
                </Select>
            </div>

            <div>
                <Select
                    allowClear
                    className='select-address'
                    value={valueFormRegister.ward}
                    style={{ width: '100%', marginBottom: '20px' }}
                    placeholder="Phường/ Xã"
                    onSelect={e => chooseWard(e)}
                    onClear={() => setValueFormRegister({...valueFormRegister, ward: null})}
                >
                    {listWard && listWard.map(item => (
                        <Option value={item.id} key={item.id} >{item.name}</Option>
                    ))}
                </Select>
            </div> 
        </div>
    )
}

export default SelectAddress;