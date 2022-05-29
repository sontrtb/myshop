import ListProducts from '../component/ListProducts';
import {useParams} from 'react-router-dom';
import Footer from '../component/Footer';

function CategoryProduct() {

    let {type, title} = useParams();

    return(
        <div style={{marginTop: '130px'}}>
            <div style={{minHeight: "80vh"}}>
                <ListProducts
                    title={title}
                    type={type}
                    full={true}
                />
            </div>
            <Footer />
        </div>
    )
}

export default CategoryProduct;