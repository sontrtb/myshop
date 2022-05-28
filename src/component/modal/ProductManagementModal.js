import { notification, Modal, Input } from 'antd';
import UploadImage from './UploadImage';
import apiProduct from '../../api/apiProduct';

function ProductManagementModal(props) {

  const {
      edit,
      isModalVisible,
      setIsModalVisible,
      valueModal,
      setValueModal,
      refetch,
    } = props;

    const { TextArea } = Input;
    let titleModal = edit ? 'Sửa thông tin sản phẩm' : 'Thêm sản phẩm';

    const handleOk = () => {
      if(edit){
        console.log(valueModal);
        apiProduct.editProduct(valueModal, (res, err) => {
          if(res){
            notification.success({
              message: "Sửa sản phẩm thành công",
            });
            refetch();
            setValueModal({});
          }
          else{
            notification.error({
                message: "Sửa sản phẩm thất bại",
                description: err.message
            });
          }
          setIsModalVisible(false);
        })
      }
      else{
        console.log(valueModal);
        apiProduct.addProduct( valueModal , (res, err) => {
          if(res){
            notification.success({
              message: "Thêm sản phẩm thành công",
            });
            refetch();
            setValueModal({});
          }
          else{
            notification.error({
                message: "Thêm sản phẩm thất bại",
                description: err.message
            });
          }
          setIsModalVisible(false);
        })
      }
    };
      
    const handleCancel = () => {
      setIsModalVisible(false);
      setValueModal({});
    };

    const handleGetValue = (e) => {
      setValueModal({...valueModal, [e.target.name]: e.target.value});
    }

    return (
      <Modal title={titleModal} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h3>Tên sản phẩm</h3>
        <Input
          value={valueModal.title}
          placeholder="Tên sản phẩm"
          name="title"
          onChange={e => handleGetValue(e)}
        />
        <h3>Giá</h3>
        <Input
          value={valueModal.price}
          placeholder="Giá"
          name="price"
          onChange={e => handleGetValue(e)}
        />
        <h3>Mô tả</h3>
        <TextArea
          value={valueModal.description}
          placeholder="Mô tả"
          name='description'
          onChange={e => handleGetValue(e)}
        />

        <h3>Ảnh sản phẩm</h3>
        <UploadImage
          setValueModal={setValueModal}
          valueModal={valueModal}  
        />
        
      </Modal>
    )
}

export default ProductManagementModal;