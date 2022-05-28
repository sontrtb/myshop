import React, {useMemo} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from '../component/hearder/Navbar';
import Home from '../page/Home';
import ProductManagement from '../page/ProductManagement';
import Account from '../page/Account';
import Cart from '../page/Cart';
import ProductDetail from '../page/ProductDetail';
import Infomation from '../page/Infomation';
import Search from "../page/Search";
import UserManagement from "../page/UserManagement";

import jwtDecode from "jwt-decode";

export const checkToken = () => {
    let token = localStorage.getItem('token');
    if(token){
        let decode = jwtDecode(token);
        if(decode.exp < Date.now() / 1000){
            localStorage.removeItem('token');
            return false;
        }
        return true;
    }
    return false;
};

export const checkAdmin = () => {
    let token = localStorage.getItem('token');
    if(token){
        let decode = jwtDecode(token);
        if(decode.isAdmin){
            return true;
        }
        return false;
    }
    return false;
}

function RouterApp(){

    return(
        <Router>
            <Navbar />
            <div className='content'>
                <Routes>
                    <Route path="/product_management" element={<ProductManagement />}/>
                    <Route path="/user_management" element={<UserManagement />} />
                    <Route path="/user"
                        element={
                            checkToken() ?
                            <Infomation /> :
                            <Account />
                        }
                    />
                    <Route path='/cart' element={<Cart />} />
                    <Route path="/product/:id" element={<ProductDetail />}/>
                    <Route path="/search/:param" element={<Search />}/>
                    <Route path="*" element={<Home />}/>
                </Routes>
            </div>
        </Router>
    )
}

export default RouterApp;