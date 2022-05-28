import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, notification } from 'antd';
import { useState, useEffect } from 'react';
import '../styles/admin.css'
import apiUser from '../api/apiUser';

function UserManagement(){

  const { confirm } = Modal;

  const [listUser, setListUser] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    apiUser.getAllUser((res, err) => {
      if(res){
        setListUser(res.users);
      }
    })
  } , [refetch]);

  console.log('user');

  //delete
  const handleDelete = (userId) => {
    confirm({
      title: 'Bạn có muốn xóa người dùng này ?',
      icon: <ExclamationCircleOutlined />,
    
      onOk(){
        apiUser.deleteUser( userId, (res, err) => {
          if(res){
            setRefetch(!refetch);
            notification.success({
              message: "Xóa người dùng thành công",
            });
          }
        })
      },

      onCancel() {
        console.log('Cancel');
      },

    });
  }

  return(
    <div>
      <div className="container container-admin">
          <h1 className='title-page'>Quản lý người dùng</h1>

          <table className="table-products">
            <thead>
              <tr>
                <th>Tên tài khoản</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {listUser?.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                          <DeleteOutlined
                              style={{color: 'red', cursor: 'pointer', fontSize: '20px'}}
                              onClick={() => handleDelete(user._id)}
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