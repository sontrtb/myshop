import { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function SilderListImageMini( props ){

    const {listImage} = props;
    
    const countMax = listImage.length - 1;
    const [ count, setCount ] = useState(0);

    if(listImage === undefined || listImage.length === 0)
        return <div>Trống</div>

    return (
        <div>
            <LeftOutlined
                style={{fontSize: "20px", padding: "5px"}}
                onClick={() => setCount(count === 0 ? countMax : count - 1)}    
            />
            <img
                className='admin-list-img'
                src={process.env.REACT_APP_API_URL_MEDIA + listImage[count].url}
            />
            <RightOutlined
                style={{fontSize: "20px", padding: "5px"}}
                onClick={() => setCount(count === countMax ? 0 : count + 1)}    
            />
        </div>
    )
}

export default SilderListImageMini;