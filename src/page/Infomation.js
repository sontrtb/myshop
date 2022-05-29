import apiAuth from '../api/apiAuth';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect, useRef } from 'react';
import '../styles/information.css';
// import Context from '../store/Context';
import {
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
    HomeOutlined,
    LoadingOutlined,
    LogoutOutlined,
    EditOutlined
} from "@ant-design/icons";
import apiUser from '../api/apiUser';

function Infomation() {

    const navigate = useNavigate();

    // const [state, dispatch] = useContext(Context)
    // const user = state.inforUser;

    const [loading, setLoading] = useState(false);
    const [userInfor, setUserInfor] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const userCurrent = useRef(userInfor);

    const listInput = [
        {
            keyValue: "username",
            value: userInfor.username,
            placeholder:"Tên tài khoản",
            icon: <UserOutlined className="icon-profile"/>,
        },
        {
            keyValue: "phone",
            value: userInfor.phone,
            placeholder:"Số điện thoại",
            icon: <PhoneOutlined className="icon-profile"/>,
        },
        {
            keyValue: "email",
            value: userInfor.email,
            placeholder:"Email",
            icon: <MailOutlined className="icon-profile"/>,
        },
        {
            keyValue: "address",
            value: userInfor.address,
            placeholder:"Địa chỉ chi tiết",
            icon: <HomeOutlined className="icon-profile"/>,
        }
    ]

    useEffect(() => {
        apiUser.getUser("6292c646677c4aa6817a4c28", (res, err) => {
            if(res){
                setUserInfor(res.info);
                userCurrent.current = res.info;
            }
        })
    }, []);

    const handleLogout = () => {
        setLoading(true);
        notification.success({
            message: "Đăng xuất thành công"
        })
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
        setLoading(false);
    }

    const handleEditInput = () => {
       setIsEdit(!isEdit)
    }

    const handleEditProfile = () => {
        if(userCurrent.current !== userInfor) {
            apiUser.editUser(userInfor, (res, err) => {
                if(res){
                    notification.success({
                        message: "Thay đổi thông tin thành công"
                    })
                }
            })
        }
    }

    
    return(
        <div className="container">
            <h1 className='title-page'>Thông tin người dùng</h1>
            <div className='information-wrap'>
                <div className="icon-edit-profile" onClick={handleEditInput}>
                    Chỉnh sửa thông tin
                    <span> </span>
                    <EditOutlined/>
                </div>
                {   
                    listInput.map(({keyValue, placeholder, icon, value}, index) => (
                        <div key={index} className="item-informaton">
                            <div className='label-wrap_profile'>
                                {icon}
                                <div className='label-information'>{placeholder}</div>
                            </div>
                            <input
                                placeholder={placeholder}
                                className='input-information'
                                value={ value || '' }
                                disabled={!isEdit || keyValue==='username'}
                                onChange={(e) => setUserInfor({...userInfor, [keyValue]: e.target.value})}
                            />
                        </div>
                    ))
                }
                <div className='btn-wrap_profile'>
                    <div
                        className='btn-edit-profile'
                        onClick={handleEditProfile}
                    >
                        Lưu thay đổi
                    </div>
                    <div
                        className='btn-logout'
                        onClick={handleLogout}
                    >
                        Đăng xuất
                        {
                            loading ?
                            <LoadingOutlined style={{ fontSize: 24 }} spin /> :
                            <LogoutOutlined style={{marginLeft: '10px'}}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Infomation;