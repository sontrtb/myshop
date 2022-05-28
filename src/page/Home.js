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
                full={true}
            />
            <Footer />
        </div>
    )
}

export default Home;