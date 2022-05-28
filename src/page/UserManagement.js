import { DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import '../styles/admin.css'
import apiProduct from '../api/apiProduct';

function UserManagement(){

  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueModal, setValueModal] = useState({});

    useEffect(() => {
      apiProduct.getListProducts((res, err) => {
        if(res){
          setProducts(res.products);
        }
      })
    } , [])

    //delete
    const handleDelete = (record) => {}

    return(
      <div>
        <div className="container container-admin">
            <h1 className='title-page'>Quản lý người dùng</h1>

            <table className="table-products">
              <thead>
                <tr>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>
                    Số điện thoại
                  </th>
                  <th>Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                      <td>
                            <DeleteOutlined
                                style={{color: 'red', cursor: 'pointer', fontSize: '20px'}}
                                onClick={() => handleDelete(product)}
                            />
                      </td>
                    </tr>
                ))}
              </tbody>
          </table>
        </div>
    
      </div>
    )
}

export default UserManagement;