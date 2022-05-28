import {useParams} from 'react-router-dom';
import ListProducts from '../component/ListProducts';

function Search() {

    const {param} = useParams();

    return(
        <div>
            <ListProducts
                title={`Kết quả tìm kiếm với từ khóa "${param}"`}
                searchValue={param}
            />
        </div>
    )
}

export default Search;