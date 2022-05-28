import { useState } from "react";
import SelectAddress from "./SelectAddress";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import {
    UserOutlined,
    LockOutlined,
    PhoneOutlined,
    MailOutlined,
    HomeOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import apiAuth from "../api/apiAuth";

function Register({setDisplayRegister}) {

    let navigate = useNavigate();

    const [valueFormRegister, setValueFormRegister] = useState({});
    const [loading, setLoading] = useState(false);

    const listInput = [
        {
            keyValue: "username",
            value: valueFormRegister.username,
            placeholder:"Tên đăng nhập",
            icon: <MailOutlined className="icon-auth"/>,
        },
        {
            keyValue: "password",
            value: valueFormRegister.password,
            placeholder:"Mật khẩu",
            icon: <LockOutlined className="icon-auth"/>,
        },
        // {
        //     keyValue: "passwordAgain",
        //     value: valueFormRegister.passwordAgain,
        //     placeholder:"Nhập lại mật khẩu",
        //     icon: <LockOutlined className="icon-auth"/>,
        // },
        {
            keyValue: "email",
            value: valueFormRegister.email,
            placeholder:"Địa chỉ Email",
            icon: <MailOutlined className="icon-auth"/>,
        },
        {
            keyValue: "phone",
            value: valueFormRegister.phone,
            placeholder:"Số điện thoại",
            icon: <PhoneOutlined className="icon-auth"/>,
        },
        {
            keyValue: "address",
            value: valueFormRegister.address,
            placeholder:"Địa chỉ",
            icon: <HomeOutlined className="icon-auth"/>,
        }
    ]

    //validate
    const validateForm = (valueFormRegister) => {
        listInput.map(item => {
            if( item.value === undefined || item.value.length === 0){
                return {
                    message: `${item.placeholder} không được để trống`,
                    status: false
                }
            }
        })
        if(valueFormRegister.commune === undefined || valueFormRegister.district === undefined || valueFormRegister.province === undefined)
            return {
                message: 'Vui lòng chọn địa chỉ',
                status: false
            }
        if (valueFormRegister.password !== valueFormRegister.passwordAgain)
            return {
                message: 'Mật khẩu nhập lại không chính xác',
                status: false
            }
        else return true;
    }

    //handle register
    const handleRegister = () => {
        console.log(valueFormRegister);
        if(validateForm(valueFormRegister)) {
            setLoading(true);
            apiAuth.register(JSON.stringify(valueFormRegister) , (res, err) => {
                if(res){
                    notification.success({
                        message: "Đăng kí tài khoản thành công",
                    });
                    // localStorage.setItem('token', res.token);
                    navigate("/");
                    window.location.reload();
                }
                else{
                    notification.error({
                        message: "Đăng kí tài khoản thất bại",
                        description: err.message
                    });
                }
                setLoading(false);
            })
        } else {
            notification.error({
                message: validateForm(valueFormRegister).message,
                description: "Vui lòng điền đầy đủ thông tin",
            });
        }
    }

    return(
        <div>
            <h1>Đăng ký</h1>
            <div className='form-login'>
                {
                    listInput.map(({keyValue, placeholder, icon, value}, index) => (
                        <div className="form-item" key={index}>
                            <input
                                className='input-login'
                                placeholder={placeholder}
                                value={ value || '' }
                                onChange={(e) => setValueFormRegister({...valueFormRegister, [keyValue]: e.target.value})}
                            />
                            {icon}
                        </div>
                    ))
                }

                <br />

                <button
                    className='btn-login'
                    onClick={handleRegister}
                
                >
                    Đăng ký
                    {
                        loading &&
                        <LoadingOutlined style={{ fontSize: 18, marginLeft: '10px' }} spin/>
                    }
                </button>
                <div className='line'></div>
                <div>Đã có tài khoản?
                    <span
                        className='link-login-register'
                        onClick={() => setDisplayRegister(false)}
                    > Đăng nhập</span>
                </div>
            </div>
        </div>
    )
}

export default Register;