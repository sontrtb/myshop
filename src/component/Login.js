import { useState, useContext } from 'react';
import { notification } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"
import apiAuth from "../api/apiAuth"
// import Context from '../store/Context';

function Login({setDisplayRegister}) {

    // const [state, dispatch] = useContext(Context)

    const navigate = useNavigate();

    const [account, setAccount] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = (account) => {
        if(account.username === undefined || account.username.length === 0){
            return {
                    message: 'Email đăng nhập không được để trống',
                    status: false
                }
        }
        if(account.password === undefined || account.password.length === 0 )
            return {
                message: 'Mật khẩu không được để trống',
                status: false
            }
        return true;
    }

    const handleLogin = () => {
        if(validateForm(account) === true) {
            setLoading(true);
            apiAuth.login( JSON.stringify(account), (res, err) => {
                if(res){
                    notification.success({
                        message: "Đăng nhập thành công"
                    })
                    localStorage.setItem('token', JSON.stringify(res.accessToken))
                    // localStorage.setItem('user', JSON.stringify(res.customer))
                    navigate("/");
                    window.location.reload();
                    // dispatch({
                    //     type: 'setUser',
                    //     payload: res.customer,
                    // })
                }
                else {
                    notification.error({
                        message: "Email hoặc Mật khẩu không chính xác"
                    })
                }
                setLoading(false);
            })
        } else {
            notification.error({
                message: validateForm(account).message,
                description: "Vui lòng điền đầy đủ thông tin",
            })
        }
    }

    return(
        <div>
            <h1>Đăng nhập</h1>
            <div className='form-login'>
                <div className="form-item">
                    <input
                        className='input-login'
                        placeholder='Tên đăng nhập'
                        value={account.username || ''}
                        onChange={(e) => setAccount({...account, username: e.target.value})}
                    />
                    <UserOutlined className="icon-auth"/>
                </div>
                <div className="form-item">
                    <input
                        className='input-login'
                        placeholder='Mật khẩu'
                        value={account.password || ''}
                        onChange={(e) => setAccount({...account, password: e.target.value})}
                    />
                    <LockOutlined className="icon-auth"/>
                </div>
                <button
                    className='btn-login'
                    onClick={handleLogin}
                
                >
                    Đăng nhập
                    {
                        loading &&
                        <LoadingOutlined style={{ fontSize: 18, marginLeft: '10px' }} spin/>
                    }
                </button>
                <div className='line'></div>
                <div>Chưa có tài khoản?
                    <span
                        className='link-login-register'
                        onClick={() => setDisplayRegister(true)}
                    > Đăng ký</span>
                </div>
            </div>
        </div>
    )
}

export default Login;