import '../styles/input-quaitity.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function InputQuaitity({ quantity, setQuantity, disable }) {

    let {id} = useParams()

    useEffect(() => {
        setQuantity(1);
    } , [id])

    return(
        <div style={{display:'flex'}}>
            <div className='input-quaitity-container'>
                <button
                    disable={disable}
                    className='input-quaitity_btn'
                    onClick={() => { quantity>0 ? setQuantity(quantity - 1) : setQuantity(0) }}
                >-</button>
                <input
                    disable={disable}
                    type="number"
                    className='input-quaitity_input'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value) }
                />
                <button
                    disable={disable}
                    className='input-quaitity_btn'
                    onClick={() => setQuantity(quantity + 1)}
                >+</button>
            </div>
        </div>
    )
}

export default InputQuaitity;