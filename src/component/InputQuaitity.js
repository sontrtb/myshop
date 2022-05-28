import '../styles/input-quaitity.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function InputQuaitity({ quantity, setQuantity }) {

    let {id} = useParams()

    useEffect(() => {
        setQuantity(1);
    } , [id])

    return(
        <div style={{display:'flex'}}>
            <h3>Số lượng:</h3>
            <div className='input-quaitity-container'>
                <button
                    className='input-quaitity_btn'
                    onClick={() => { quantity>1 ? setQuantity(quantity - 1) : setQuantity(1) }}
                >-</button>
                <input
                    type="number"
                    className='input-quaitity_input'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value) }
                />
                <button
                    className='input-quaitity_btn'
                    onClick={() => setQuantity(quantity + 1)}
                >+</button>
            </div>
        </div>
    )
}

export default InputQuaitity;