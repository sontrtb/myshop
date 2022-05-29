import TopNav from "./TopBav";
import { Badge } from 'antd';
import '../../styles/navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { BarsOutlined, SearchOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { checkAdmin, checkToken } from "../../router/Router";

function Navbar() {

    const navigate = useNavigate();

    const [scroll, setScroll] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 35) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        });
    },[])

    const [navbar, setNavbar] = useState(false);

    return(
        <div >
            <TopNav />
            <div
                className="navbar-container desktop-navbar"
                style={scroll ? {position:'fixed', top: 0, height:'55px'} : {position:'absolute'}}
            >
                <div className="container navbar-body">
                        <div style={{display:"flex", alignItems:'center'}}>
                            <NavLink to="/">
                                <div className="logo_navbar" />
                            </NavLink>
                            
                            <ul className="navbar-list">
                                <li>
                                    <NavLink to="/" className="navbar-item">Trang chủ</NavLink>
                                </li>
                                <li>
                                    {
                                        checkAdmin() &&
                                        <NavLink
                                            to="/product_management"
                                            className="navbar-item"
                                        >
                                            Sản phẩm
                                        </NavLink>
                                    }
                                </li>
                                <li>
                                    {
                                        checkAdmin() && <NavLink to="/order_management" className="navbar-item">Đơn hàng</NavLink>
                                    }
                                </li>
                                <li>
                                    {
                                        checkAdmin() && <NavLink to="/user_management" className="navbar-item">Người dùng</NavLink>
                                    }
                                </li>
                                <li>
                                    {
                                        !checkAdmin() && <NavLink to="/categoty/phone/Điện%20thoại" className="navbar-item">Điện thoại</NavLink>
                                    }
                                </li>
                                <li>
                                    {
                                        !checkAdmin() && <NavLink to="/categoty/computer/Máy%20tính" className="navbar-item">Máy tính</NavLink>
                                    }
                                </li>
                                <li>
                                    {
                                        !checkAdmin() && <NavLink to="/categoty/accessories/Phụ%20kiện%20điện%20tử" className="navbar-item">Phụ kiện</NavLink>
                                    }
                                </li>
                            </ul>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <div className="search-container">
                                <input
                                    placeholder="Tìm kiếm..."
                                    className="input-search"
                                    value={searchValue}
                                    onChange={e => setSearchValue(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && navigate('/search/' + searchValue)}
                                />
                                <SearchOutlined
                                    style={{fontSize: '25px'}}
                                    className="search-icon"
                                    onClick={() => {
                                        navigate('/search/' + searchValue)
                                        setSearchValue('')
                                    }}
                                />
                            </div>
                            
                            {
                                checkToken() && !checkAdmin() &&
                                // <Badge count={5} className="navbar-icon">
                                    <NavLink to='/cart' style={{color: '#333'}}>
                                        <ShoppingCartOutlined style={{fontSize: '30px'}} />
                                    </NavLink>
                                // </Badge>
                            }
                            
                            <NavLink to="/user" className="navbar-item">
                                <UserOutlined style={{fontSize: '30px'}} className="navbar-icon"/>
                            </NavLink>
                        </div>
                        
                </div>
            </div>

            {/* mobile */}
            <div
                className="navbar-container mobile-navbar"
                style={scroll ? {position:'fixed', top: 0} : {position:'absolute'}}
            >
                <div className="container navbar-body">
                    <div>
                        <h1 style={{margin: 0, color:'rgb(34, 109, 230)'}}>Nhóm 7</h1>
                    </div>
                    <div>
                        <BarsOutlined
                            style={{ fontSize: '28px', color: '#001d4c', marginTop:'8px'}}
                            onClick={() => setNavbar(!navbar)}
                        />
                    </div>
                    
                    <div
                        className="navbar-mobile-list"
                        style={{transform: navbar ? 'translateX(0)' : 'translateX(-100%)'}}
                    >   
                        <h1 style={{marginLeft: 15, marginBottom: 0, color:'rgb(34, 109, 230)'}}>LOGO</h1>
                        <NavLink to="/" className="navbar-mobile-item">Home</NavLink>
                        <NavLink to="/product_management" className="navbar-mobile-item">Quản lý sản phẩm</NavLink>
                        <NavLink to="/user_management" className="navbar-mobile-item">Quản lý người dùng</NavLink>
                        <NavLink to="/cart" className="navbar-mobile-item">Giỏ hàng</NavLink>
                        <NavLink to="/user" className="navbar-mobile-item">Thông tin cá nhân</NavLink>
                    </div>
                    <div className='navbar-mobile-overlay'
                        style={{display: navbar ? 'block' : 'none'}}
                        onClick={() => setNavbar(!navbar)}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;