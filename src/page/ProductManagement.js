import { Space, notification, Modal, Button } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import '../styles/admin.css'
import apiProduct from '../api/apiProduct';
import ProductManagementModal from '../component/modal/ProductManagementModal';
import { Select } from 'antd';

function ProductManagement(){

  const { confirm } = Modal;
  const { Option } = Select;

  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueModal, setValueModal] = useState({});
  const [refetch, setRefetch] = useState(true);
  const [filterProduct, setFilterProduct] = useState('');

  useEffect(() => {
    const params = {type: filterProduct}
    apiProduct.getListProducts(params ,(res, err) => {
      if(res){
        setProducts(res.product);
      }
    })
  } , [refetch, filterProduct]);

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
                <th style={{width: "15%"}}>Tên sản phẩm</th>
                <th style={{width: "10%"}}>Ảnh</th>
                <th style={{width: "15%"}}>
                  Danh mục
                  <select
                    value={filterProduct}
                    className="filter-product"
                    onChange={e => setFilterProduct(e.target.value)}
                  > 
                    <option value="">Tất cả</option>
                    <option value="phone">Điện thoại</option>
                    <option value="computer">Máy tính</option>
                    <option value="accessories">Phụ kiện</option>
                  </select>
                </th>
                <th style={{width: "10%"}}>Giá</th>
                <th style={{width: "45%"}}>Mô tả</th>
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
                    <td>
                      <Select
                        value={product.type}
                        style={{ width: 120 }}
                        disabled
                      > 
                        <Option value="phone">Điện thoại</Option>
                        <Option value="computer">Máy tính</Option>
                        <Option value="accessories">Phụ kiện</Option>
                      </Select>
                    </td>
                    <td>{product.price}</td>
                    <td style={{maxWidth: "450px"}}>{product.description}</td>
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