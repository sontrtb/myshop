import Banner from "../component/Banner"
import ListProducts from "../component/ListProducts";
import Footer from "../component/Footer";
import "../styles/home.css";

function Home(){

    return(
        <div className="home-container">
            <Banner />
            <ListProducts
                title="Điện thoại"
                full={false}
                type='phone'
            />
            <ListProducts
                title="Máy tính"
                full={false}
                type='computer'
            />
            <ListProducts
                title="Phụ kiện điện tử"
                full={false}
                type='accessories'
            />
            <Footer />
        </div>
    )
}

export default Home;