import { DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import '../styles/cart.css';
import apiCart from '../api/apiCart';


function Order(){

    const [products, setProducts] = useState([]);

    useEffect(() => {
        apiCart.getListCart((res, err) => {
          if(res){
            console.log(res);
          }
        })
    }, []);


    return(
        <div className="container container-cart">
            <h1 className='title-page'>Giỏ hàng</h1>
            <table className="table-products">
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  {/* <th>Số tiền</th> */}
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>
                          <img className={'admin-products-img'} src={product.image}/>
                      </td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                      <td>
                            <DeleteOutlined
                                style={{color: 'red', cursor: 'pointer', fontSize: '20px'}}
                                // onClick={() => handleDelete(product)}
                            />
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
            <div className='payment-container'>
                <h1 style={{margin:0}}>Tổng thanh toán: </h1>
                <button className="btn-payment">Thanh toán</button>
            </div>
        </div>
    )
}

export default Order;