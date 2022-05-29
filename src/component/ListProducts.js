import {useState, useEffect} from 'react'
import {Row, Col, notification } from 'antd'
import '../styles/list_products.css'
import { ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';

import apiProduct from '../api/apiProduct';
import apiCart from '../api/apiCart';

import { useNavigate, useParams } from 'react-router-dom';

function ListProducts( {title, full, type, search} ) {

  let navigate = useNavigate();
  let {id} = useParams();
  if(!id) id = "0";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if(search){
      const params = {title: search}
      apiProduct.getProductsSearch(params, (res, err) => {
        if(res){
          setProducts(res.product);
        }
      })
    }
    else {
      const params = {type: type}
      apiProduct.getListProducts(params, (res, err) => {
        if(res){
          setProducts(res.product);
        }
      })
    }
  } , [type, search])

  const handleNavigation = (id) => {
    navigate(`/product/${id}`);
  }

  const handleAddToCart = (id) => {
    const cartBody = {
      "productId": id,
      "productQuantity": 1,
    }
    apiCart.creactCart(cartBody, (res, err) => {
        if(res){
            notification.success({
                message: "Đã thêm sản phẩm vào giỏ hàng"
            })
        }
        else {
            if(err.message === "Request failed with status code 403"){
              notification.warning({
                message: "Sản phẩm đã có trong giỏ hàng"
              })
            }
            else{
              notification.error({
                message: err.message
              })
            }    
        }
    })
  }

  const handleGoPage = () => {
    navigate(`/categoty/${type}/${title}`);
  }

  return(
    <div className="container list-product-container">
      <h1 className='title-products' onClick={handleGoPage}>{title}</h1>
      <Row justify="space-around">
        {
          products
            .filter(product => product._id !== id)
            .map((product, index) => (
              (full || index < 4) &&
              <Col
                key = {product._id}
                className="product-item" xs={10} sm={10} md={7} lg={5} xl={5}
              >
                <div onClick={() => handleNavigation(product._id)}>
                  <img
                    className="product-img"
                    src={product.img}
                    alt="Ảnh sản phẩm"
                  />
                  <h3 className='name-product'>{product.title}</h3>
                  <h3 className='price-product'><DollarOutlined style={{marginRight: "5px"}}/>{product.price}</h3>
                  <p className='list-producrt_description'>{product.description}</p>
                </div>
                <div className='add-to-cart-container' onClick={() => handleAddToCart(product._id)}>
                  <h2>
                    <ShoppingCartOutlined />
                    <span> Thêm vào giỏ hàng</span>
                  </h2>
                </div>
              </Col> 
          ))}
      </Row>
    </div>
  )
}

export default ListProducts;