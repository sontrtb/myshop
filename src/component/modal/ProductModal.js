import { Modal, Button, Input, Divider, Row, Col, notification } from 'antd';
import { useState, useContext } from 'react';
import {  DollarOutlined } from '@ant-design/icons';
import "../../styles/modal/product-modal.css";
import Context from '../../store/Context';
import apiOrder from '../../api/apiOrder';

function ProductModal({ isModalVisible, setIsModalVisible, quantity, setQuantity, product }) {

    // const [state, dispatch] = useContext(Context)
    // const user = state.inforUser;

    const [ informationOrder, setInformationOrder ] = useState({
        title: product.title,
        img: product.img,
        price: 0,
        quantity: quantity,
        address: '',
        name: '',
        phone: '',
    });

    const validateForm = (informationOrder) => {
        // if(informationOrder.name === undefined || informationOrder.name.length === 0){
        //     return {
        //             message: 'Tên không được để trống',
        //             status: false
        //         }
        // }
        // if(informationOrder.phone === undefined || informationOrder.phone.length === 0 )
        //     return {
        //         message: 'Số điện thoại không được để trống',
        //         status: false
        //     }
        // if( isNaN(informationOrder.phone) || informationOrder.phone.length < 10 )
        //     return {
        //         message: 'Số điện thoại không hợp lệ',
        //         status: false
        //     }
        // if(informationOrder.address === undefined || informationOrder.address.length === 0)
        //     return {
        //         message: 'Địa chỉ không được để trống',
        //         status: false
        //     }
        return true;
    }

    const handleChange = (e) => {
        setInformationOrder({
            ...informationOrder,
            [e.target.name]: e.target.value
        })
    }

    const handleOk = () => {
        if(validateForm(informationOrder) === true) {
            
            apiOrder.creactOrder(informationOrder, (res, err) => {
                if(res){
                    notification['success']({
                        message: 'Đặt hàng thành công',
                        description: 'Vui lòng chờ xác nhận từ nhân viên bán hàng',
                    });
                }
                setInformationOrder({});
                setIsModalVisible(false);
            })
        } else {
            notification['error']({
                message: 'Vui lòng điền đầy đủ thông tin',
                description: validateForm(informationOrder).message,
            });
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setInformationOrder({});
    };

    return (
        <Modal
            title="Mua hàng ngay"
            visible={isModalVisible}
            footer={[
                <Button
                    key="cancel"
                    onClick={handleCancel}
                >
                    Hủy
                </Button>,
                <Button
                    key="ok"
                    danger
                    onClick={handleOk}
                >
                    Mua hàng
                </Button>,
            ]}
        >   
            <div>
                <h2>Thông tin liên hệ</h2>

                <h3>Họ và tên :</h3>
                <Input
                    placeholder="Phạm Văn A"
                    name="name"
                    value={informationOrder.name}
                    onChange={e => handleChange(e)}
                />

                <h3>Số điện thoại :</h3>
                <Input
                    placeholder='0312345678'
                    name='phone'
                    value={informationOrder.phone}
                    onChange={e => handleChange(e)}
                />

                <h3>Địa chỉ liên hệ :</h3>
                <Input
                    placeholder='Ngõ 6 Nguyễn Văn Trỗi, Mộ Lao, ...'
                    name='address'
                    value={informationOrder.address}
                    onChange={e => handleChange(e)}
                />

                <Divider></Divider>
                <Row className="product-modal-container">
                    <Col span={10}>
                        <img src={product.img} className="product-modal-img"/>
                    </Col>
                    <Col className="product-modal-content" span={12}>
                        <h2>{product.title}</h2>
                        <h3 style={{color: 'red'}}>
                            <DollarOutlined style={{marginRight: "5px"}}/>{product.price} VNĐ
                        </h3>
                        <h4>Số lượng: {quantity}</h4>
                        <Divider />
                        <h2 style={{textAlign: "end"}}>Đơn giá:
                            <span style={{color: 'orange'}}>
                                <span> </span>
                                {quantity*product.price} VNĐ
                            </span>
                        </h2>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
};

export default ProductModal;