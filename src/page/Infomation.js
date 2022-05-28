import apiAuth from '../api/apiAuth';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import Context from '../store/Context';
import Cookies from 'js-cookie'
import {
    UserOutlined,
    LockOutlined,
    PhoneOutlined,
    MailOutlined,
    HomeOutlined,
    LoadingOutlined
} from "@ant-design/icons";

function Infomation() {

    const navigate = useNavigate();

    // const [state, dispatch] = useContext(Context)
    // const user = state.inforUser;

    const [loading, setLoading] = useState(false);
    const [userInfor, setUserInfor] = useState({});

    const listInput = [
        {
            keyValue: "name",
            value: userInfor.name,
            placeholder:"Tên người dùng",
            icon: <UserOutlined className="icon-auth"/>,
        },
        {
            keyValue: "phone",
            value: userInfor.phone,
            placeholder:"Số điện thoại",
            icon: <PhoneOutlined className="icon-auth"/>,
        },
        {
            keyValue: "email",
            value: userInfor.email,
            placeholder:"Email",
            icon: <MailOutlined className="icon-auth"/>,
        },
        {
            keyValue: "address",
            value: userInfor.address,
            placeholder:"Địa chỉ chi tiết",
            icon: <HomeOutlined className="icon-auth"/>,
        }
    ]

    const handleLogout = () => {
        setLoading(true);
        notification.success({
            message: "Đăng xuất thành công"
        })
        Cookies.remove('token');
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
        setLoading(false);
    }
    
    return(
        <div className="container">
            <h1 className='title-page'>Thông tin người dùng</h1>
            <div>
                {
                    listInput.map(({keyValue, placeholder, icon, value}, index) => (
                        <div key={index}>
                            <div>{placeholder}</div>
                            <input
                                placeholder={placeholder}
                                value={ value || '' }
                                onChange={(e) => setUserInfor({...userInfor, [keyValue]: e.target.value})}
                            />
                        </div>
                    ))
                }
            </div>

            <button
                className='btn-logout'
                onClick={handleLogout}
            >
                Đăng xuất
                {
                    loading &&
                    <LoadingOutlined style={{ fontSize: 24 }} spin />
                }
            </button>
        </div>
    )
}

export default Infomation;