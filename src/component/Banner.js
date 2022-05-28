import '../styles/banner.css'
import { Carousel, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import apiProduct from '../api/apiProduct';
import icon1 from '../image/icon1.png';
import icon2 from '../image/icon2.png';
import icon3 from '../image/icon3.png';
import icon4 from '../image/icon4.png';
import banner21 from '../image/banner21.jpg';
import banner22 from '../image/banner22.jpg';
import banner23 from '../image/banner23.jpg';

function Banner() {

    const [listProduct, setListproduct] = useState([]);

    useEffect(() => {
        apiProduct.radomProduct((res, err) => {
            if(res){
                setListproduct(res.product);
            }
        });
    }, []);

    return(
        <div className="banner-container">
            <Carousel autoplay>
                {
                    listProduct?.map((product, index) => {
                        if(index % 2===0)
                            return (
                                <div className="banner-item banner-item-1" key={product._id}>
                                    <div className="container">
                                        <Row  align="middle" justify="space-between">
                                            <Col span={24} md={11} data-aos="fade-right">
                                                <h1 className='title-banner'>{product.title}</h1>
                                                <p>Giảm giá mạnh, cấu hình khủng trong tầm giá</p>
                                            </Col>
                                            <Col span={24} md={11} data-aos="fade-left">
                                                <img className="img-banner" src={product.img}/>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            )
                        else return (
                            <div className="banner-item banner-item-2" key={product._id}>
                                <div className="container">
                                    <Row  align="middle" justify="space-between">
                                        <Col span={24} md={11} data-aos="fade-left">
                                            <img className="img-banner" src={product.img}/>
                                        </Col>
                                        <Col span={24} md={11} data-aos="fade-right">
                                            <h1 className='title-banner'>{product.title}</h1>
                                            <p>Cấu hình khủng, bán chạy nhất thời điểm hiện tại</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        )
                    })
                }
            </Carousel>

            <div className="container" style={{padding: 0, marginTop: '50px' }}>
                <Row>
                    <Col span={12} style={{overflow: 'hidden'}}>
                        <img className="img-banner-2" src={banner21} style={{paddingRight: '15px'}}/>
                    </Col>
                    <Col span={12} style={{overflow: 'hidden'}}>
                        <img className="img-banner-2" src={banner22} style={{padding:'0 0 14px 15px'}}/>
                        <img className="img-banner-2" src={banner23} style={{padding:'14px 0 0 15px'}}/>
                    </Col>
                </Row>
            </div>

            <div className="container service-container">
                <div style={{display:'flex'}}>
                    <img src={icon1} alt="" className="img-responsive"/>
                    <div>
                        <h3 style={{margin: 0}}>Free Shipping</h3>
                        <p style={{marginBottom: 0}}>Tối đa 200.000</p>
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <img src={icon2} alt="" className="img-responsive"/>
                    <div>
                        <h3 style={{margin: 0}}>Free Shipping</h3>
                        <p style={{marginBottom: 0}}>Tối đa 200.000</p>
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <img src={icon3} alt="" className="img-responsive"/>
                    <div>
                        <h3 style={{margin: 0}}>Free Shipping</h3>
                        <p style={{marginBottom: 0}}>Tối đa 200.000</p>
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <img src={icon4} alt="" className="img-responsive"/>
                    <div>
                        <h3 style={{margin: 0}}>Free Shipping</h3>
                        <p style={{marginBottom: 0}}>Tối đa 200.000</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Banner;