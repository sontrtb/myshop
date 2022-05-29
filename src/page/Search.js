import ListProducts from '../component/ListProducts';
import {useParams} from 'react-router-dom';
import Footer from '../component/Footer';

function Search() {

    let {search} = useParams();

    return(
        <div style={{marginTop: '130px'}}>
            <ListProducts
                title={"Danh sách tìm kiếm: " + search}
                type={''}
                full={true}
                search={search}
            />
        </div>
    )
}

export default Search;