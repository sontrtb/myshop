import { DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import '../styles/cart.css';
import apiBill from "../api/apiBill";
import { notification, Tag } from 'antd';

function Order(){

    const [listBills, setListBills] = useState([]);

    useEffect(() => {
      apiBill.getListBill((res, err) => {
        if(res){
          setListBills(res);
        }
      })
    }, []);

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

            <div>
              <div>Mua nhanh</div>
              <div>Từ giỏ hàng</div>
            </div>

            <table className="table-products">
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
                {listBills?.reverse().map((bill, index) => (
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
        </div>
    )
}

export default Order;