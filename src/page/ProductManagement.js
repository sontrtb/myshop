import { Space, notification, Modal, Button } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import '../styles/admin.css'
import apiProduct from '../api/apiProduct';
import ProductManagementModal from '../component/modal/ProductManagementModal';

function ProductManagement(){

  const { confirm } = Modal;

  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueModal, setValueModal] = useState({});
  const [refetch, setRefetch] = useState(true);

    useEffect(() => {
      apiProduct.getListProducts((res, err) => {
        if(res){
          setProducts(res.product);
        }
      })
    } , [refetch])

    //edit
    const handleEdit = (record) => {
      setIsModalVisible(true);
      setEdit(true);
      setValueModal(record);
    }

    //add
    const handleAdd = () => {
      setIsModalVisible(true);
      setEdit(false);
      setValueModal({});
    }
    
    //delete
    const handleDelete = (record) => {
      confirm({
        title: 'Bạn có muốn xóa sản phẩm',
        icon: <ExclamationCircleOutlined />,
      
        onOk(){
          apiProduct.deleteProduct( record._id, (res, err) => {
            if(res){
              setRefetch(!refetch);
              notification.success({
                message: "Xóa sản phẩm thành công",
              });
            }
            else{
              notification.error({
                  message: "Xóa sản phẩm thất bại",
                  description: err.message
              });
            }
          })
        },

        onCancel() {
          console.log('Cancel');
        },
  
      });
    };

    return(
      <div>
        <div className="container container-admin">
            <h1 className='title-page'>Quản lý sản phẩm</h1>

            <Button
              type="primary"
              onClick={() => handleAdd()}
            >
              Thêm sản phẩm
            </Button>

            <table className="table-products">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Ảnh</th>
                  <th>Giá</th>
                  <th>Mô tả</th>
                </tr>
              </thead>
              <tbody>
                {products?.map(product => (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>
                          <img
                            className={'admin-products-img'}
                            src={product.img}
                          />
                      </td>
                      <td>10000</td>
                      <td>{product.description}</td>
                      <td>
                          <Space size="middle">
                              <EditOutlined
                                style={{color: 'rgb(37, 109, 230)', cursor: 'pointer', fontSize: '20px'}}
                                onClick={() => handleEdit(product)}
                              />
                              <DeleteOutlined
                                style={{color: 'red', cursor: 'pointer', fontSize: '20px'}}
                                onClick={() => handleDelete(product)}
                              />
                          </Space>
                      </td>
                    </tr>
                ))}
              </tbody>
          </table>
        </div>

        <ProductManagementModal
          edit={edit}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          valueModal={valueModal}
          setValueModal={setValueModal}
          refetch={() => setRefetch(!refetch)}
        />
    
      </div>
    )
}

export default ProductManagement;