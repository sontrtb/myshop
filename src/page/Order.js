import { DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import '../styles/cart.css';
import '../styles/order.css';
import apiBill from "../api/apiBill";
import apiCart from '../api/apiCart';
import { notification, Tag } from 'antd';

function Order(){

    const [listBills, setListBills] = useState([]);
    const [listBillsCart, setListBillsCart] = useState([]);
    const [selectBill, setSelectBill] = useState('cart');

    useEffect(() => {
      if(selectBill === 'cart'){
        apiCart.getAllCart((res, err) => {
          if(res){
            setListBillsCart(res.total)
          }
        })
      }
      else{
        apiBill.getListBill((res, err) => {
          if(res){
            setListBills(res);
          }
        })
      }
    }, [selectBill]);

    const handleEditStatus = (bill, index) => {
      apiBill.editBill({...bill, status: !bill.status}, (res, err) => {
        if(res){
          listBills[index] = {...listBills[index], status: true}
          setListBills([...listBills])
          notification['success']({
            message: 'Đơn hàng đã được xử lý'
          });
        }
      })
    }

    const handleDeleteBill = (bill, index) => {
      if(!bill.status){
        notification.error({
          message: 'Đơn hàng chưa được xác nhận'
        });
        return;
      }
      apiBill.deleteBill(bill.id, (res, err) => {
        if(res){
          const newListBill = listBills.filter(item => item.id != bill.id)
          setListBills([...newListBill])
          notification['success']({
            message: 'Đã xóa đơn hàng'
          });
        }
      })
    }

    return(
        <div className="container container-cart">
            <h1 className='title-page'>Đơn hàng</h1>

            <div className='select_order'>
              <div
                className={selectBill === 'fast' ? 'option_order' : 'option_order_selected' + ' cursor-pointer'}
                onClick={() => setSelectBill('cart')}
              >
                Từ giỏ hàng
              </div>
              <div
                className={selectBill === 'fast' ? 'option_order_selected' : 'option_order' + ' cursor-pointer'}
                onClick={() => setSelectBill('fast')}
              >
                Mua nhanh
              </div>
            </div>

            <table
              className="table-products"
              style={selectBill === 'cart' ? {display: 'none'} : null}  
            >
              <thead>
                <tr>
                  <th>Tên khách hàng</th>
                  <th>Địa chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {listBills?.map((bill, index) => (
                    <tr
                      key={bill.id}
                      style={{backgroundColor: bill.status ? "#9df5a0" : "#fc8781"}}
                    >
                      <td>{bill.username}</td>
                      <td>{bill.address}</td>
                      <td>{bill.phone}</td>
                      <td>{bill.title}</td>
                      <td>{bill.quantity}</td>
                      <td>{bill.price}</td>
                      <td>
                        {
                          bill.status ?
                          <Tag color="blue"> Đã xử lý </Tag>
                          :
                          <Tag
                            color="orange"
                            onClick={() => handleEditStatus(bill, index)}
                            className="cursor-pointer"
                          >
                            Chưa xử lý
                          </Tag>
                        }
                      </td>
                      <td>
                        <DeleteOutlined
                          style={{color: "red"}}
                          onClick={() => handleDeleteBill(bill, index)}
                        />
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>

            <table
              className="table-products"
              style={selectBill === 'fast' ? {display: 'none'} : null}  
            >
              <thead>
                <tr>
                  <th>Tên khách hàng</th>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {listBillsCart?.map((bill, index) => {
                  if(bill.sum === 0)
                    return;
                  else return (
                    <tr
                      key={bill.id}
                      style={{backgroundColor: bill.status ? "#9df5a0" : "#fc8781", borderWidth: "2px"}}
                    >
                      <td>{bill.username}</td>
                      <td style={{padding: 0}}>
                        {
                          bill?.bill?.map(item => (
                            <div className="list-cart_order" style={{textAlign: "start"}}>
                              {item.cart.productId.title}
                            </div>
                          ))
                        }
                      </td>
                      <td style={{padding: 0}}>
                        {
                          bill?.bill?.map(item => (
                            <div className="list-cart_order">
                              {item.cart.productId.price}
                            </div>
                          ))
                        }
                      </td>
                      <td style={{width: "10%", padding: 0}}>
                        {
                          bill?.bill?.map(item => (
                            <div className="list-cart_order">
                              {item.cart.productQuantity}
                            </div>
                          ))
                        }
                      </td>
                      <td>{bill.sum}</td>
                      <td>
                        {
                          bill.status ?
                          <Tag color="blue"> Đã xử lý </Tag>
                          :
                          <Tag
                            color="orange"
                            onClick={() => handleEditStatus(bill, index)}
                            className="cursor-pointer"
                          >
                            Chưa xử lý
                          </Tag>
                        }
                      </td>
                      <td>
                        <DeleteOutlined
                          style={{color: "red"}}
                          onClick={() => handleDeleteBill(bill, index)}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
        </div>
    )
}

export default Order;