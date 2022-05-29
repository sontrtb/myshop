import { DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import '../styles/cart.css';
import apiCart from '../api/apiCart';
import { useNavigate } from 'react-router-dom';
import InputQuaitityCart from "../component/InputQuaitityCart";

function Cart(){

  const navigate = useNavigate();

  const [productsCart, setProductsCart] = useState([]);
  const [sumPrice, setSumPrice] = useState({});

  useEffect(() => {
    apiCart.getListCart((res, err) => {
      if(res){
        setProductsCart(res.bill)
        setSumPrice(res.sum)
      }
    })
  }, []);

  const handleOpenProduct = (id) => {
    navigate(`/product/${id}`);
  } 

  return(
    <div className="container container-cart">
        <h1 className='title-page'>Giỏ hàng</h1>
        <table className="table-products">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Ảnh</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {productsCart?.map(product => {
              if(product.cart.productQuantity>0) {
                return(
                  <tr key={product.cart._id} >
                    <td 
                      className="cursor-pointer"
                      onClick={() => handleOpenProduct(product.cart.productId._id)}
                    >
                      {product.cart.productId.title}
                    </td>
                    <td
                      className="cursor-pointer"
                      onClick={() => handleOpenProduct(product.cart.productId._id)}
                    >
                      <img className={'admin-products-img'} src={product.cart.productId.img}/>
                    </td>
                    <td>{product.cart.productId.price}</td>
                    <td style={{width: '100px'}}>
                      <InputQuaitityCart
                        quantity={product.cart.productQuantity}
                        id={product.cart.productId._id}
                        up={() => setSumPrice(sumPrice + product.cart.productId.price)}
                        down={() => setSumPrice(sumPrice - product.cart.productId.price)}
                      />
                    </td>
                    <td>
                      <div style={{color: "#ee4d2d", fontWeight: "500"}}>{product.cart.totalProduct}</div>
                    </td>
                    {/* <td>
                          <DeleteOutlined
                              style={{color: 'red', cursor: 'pointer', fontSize: '20px'}}
                              onClick={() => handleDelete(product)}
                          />
                    </td> */}
                  </tr>
                )}
                else return <div/>
            })}
          </tbody>
        </table>
        <div className='payment-container'>
            <h1 style={{margin:0}}>Tổng thanh toán: </h1>
            <h1 className='price_cart'>{sumPrice + "đ"}</h1>
            <button className="btn-payment">Thanh toán</button>
        </div>
    </div>
  )
}

export default Cart;