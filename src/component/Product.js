import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Col, Row , Divider, Button, Space } from "antd";
import InputQuaitity from "./InputQuaitity";

import ProductModal from "./modal/ProductModal";
import { ShoppingCartOutlined } from '@ant-design/icons';

import apiProduct from "../api/apiProduct";

import '../styles/product.css'

function Product() {
    
    const [product, setProduct] = useState({});

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [imageMain, setImageMain] = useState('');

    const [quantity, setQuantity] = useState(1);

    let {id} = useParams()

    useEffect(() => {
        apiProduct.getProduct(id, (res, err) => {
            if(res){
                setProduct(res.product);
                setImageMain(res.product.image);
            }
        })
    } , [id])

    //modal
    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleBuy = () => {
        showModal();
    }

    return(
        <div className="container">
            <Row justify="space-between" align="middle" className="product-container">
                <Col span={10}>
                    <img src={product.img} className="product-detail-img"/>
                </Col>
                <Col span={12} className="product-detail-content">
                    <h1>{product.title}</h1>
                    <h2 style={{color: 'red'}}>{product.price} VNĐ</h2>
                    <p>{product.description}</p>

                    <Divider></Divider>

                    <InputQuaitity
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                    <Space style={{marginTop: "20px"}}>
                        <Button type="primary" ghost >
                            <ShoppingCartOutlined />
                            Thêm vào giỏ hàng
                        </Button>
                        <Button
                            danger
                            onClick={handleBuy}
                        >
                            Mua ngay
                        </Button>
                    </Space>
                </Col>
            </Row>

            <ProductModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                quantity={quantity}
                setQuantity={setQuantity}
                product={product}
            />
        </div>
    )
}

export default Product;