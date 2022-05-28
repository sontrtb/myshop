import Product from "../component/Product";
import ListProducts from "../component/ListProducts";
import Footer from "../component/Footer";
import { Divider } from "antd";
import { useEffect } from "react";


function ProductDetail(){

   useEffect(() => {
       window.scrollTo(0, 0);
   } , []);

    return (
        <div>
            <Product />
            <Divider />
            <ListProducts
                title="Sản phẩm liên quan"
                api="/products"
                full={false}
            />
            <Footer />
        </div>
    )
}

export default ProductDetail;