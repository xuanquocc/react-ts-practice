import React from "react";
import { Product } from "../../../types/product";
import Button from "../Button/Button";
import { AiOutlineClose } from "react-icons/ai";
import "./modal.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal = ({ title, onClose, children }: ModalProps) => {
  return (
    <div className="modal-custome">
      <div className="overlay"></div>
        <div className="modal-content">
        <div className="header">
            {title}
            <Button className="btn-close" onClick={onClose} size="large"><AiOutlineClose/></Button>
        </div>
        
          
        
      </div>
      {children}
    </div>
  );
};

export default Modal;
