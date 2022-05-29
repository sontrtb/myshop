import InputQuaitity from "./InputQuaitity";
import {useState, useEffect, useRef} from "react";
import apiCart from "../api/apiCart";

function InputQuaitityCart({ quantity, id, up, down }) {

    const quantityCurrent = useRef(quantity);

    const [quaitityCart, setQuantityCart] = useState(quantity);
    const [isEdit, setIsEdit] = useState(false);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        setQuantityCart(quantity);
    }, [id]);

    useEffect(() => {
        setIsEdit(true);
        if(quantity !== quaitityCart || isEdit){
            handleAddCart();
        }
    }, [quaitityCart])

    const handleAddCart = () => {
        const cartBody = {
            "productId": id,
            "productQuantity": quaitityCart,
        }
        setDisable(true)
        apiCart.creactCart(cartBody, (res, err) => {
            setDisable(false);
            if(res){
                (quantityCurrent.current > quaitityCart) ? down() : up();
                quantityCurrent.current = quaitityCart;
            }
        })
    };

    return (
        <InputQuaitity
            quantity={quaitityCart}
            setQuantity={setQuantityCart}
            disable={disable}
        />
    )
}

export default InputQuaitityCart;