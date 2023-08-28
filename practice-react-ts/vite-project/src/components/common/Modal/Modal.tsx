import React from 'react';
import { Product } from '../../../types/product';

interface ModalProps {
    onClose : () => void,
    onSubmit: (formData: Product) => void;
    children: React.ReactNode
    product: Product;
}
const Modal = ( { children} : ModalProps) => {
    

    const handleSubmit = () => {

    }
    return (
        <div className='modal-custome'>
            <div className='overlay'></div>
            <div className='header'>Add product</div>
            {children}
            <div className='footer'>
                <button onClick={handleSubmit }>

                </button>

                <button>

                </button>
            </div>
        </div>
    );
};



export default Modal;