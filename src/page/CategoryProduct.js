import ListProducts from "../component/ListProducts";
import Footer from "../component/Footer";

function CategoryProduct() {
    
    return(
        <div className="category-product">
            <ListProducts
                title="Điện thoại"
                api="/api/products"
                full={true}
            />

            <Footer />
        </div>
    )
}

export default CategoryProduct;