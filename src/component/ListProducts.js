import {useState, useEffect} from 'react'
import {Row, Col } from 'antd'
import '../styles/list_products.css'
import { ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';

import apiProduct from '../api/apiProduct';

import { useNavigate, useParams } from 'react-router-dom';

function ListProducts( {title, full, searchValue} ) {

  let navigate = useNavigate();
  let {id} = useParams();
  if(!id) id = "0";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if(!searchValue) {
      apiProduct.getListProducts((res, err) => {
        if(res){
          setProducts(res.product);
        }
      })
    }
    else {
      apiProduct.getSearchProducts(searchValue, (res, err) => {
        if(res){
          setProducts(res.products);
        }
      })
    }
  } , [searchValue])

  const handleNavigation = (id) => {
    navigate(`/product/${id}`);
  }

  return(
    <div className="container list-product-container">
      <h1 className='title-products'>{title}</h1>
      <Row justify="space-around">
        {
          products
            .filter(product => product.id !== id)
            .map((product, index) => (
              (full || index < 4) &&
              <Col
                key = {product.id}
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
                <div className='add-to-cart-container'>
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