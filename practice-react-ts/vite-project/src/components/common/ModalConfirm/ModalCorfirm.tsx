import {memo} from 'react'

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
//styles
import "./modalConfirm.css";

interface ModalConfirmProps {
  onClose: () => void;
  onConfirm: () => void;
}
const ModalConfirm = ({ onClose, onConfirm }: ModalConfirmProps) => {
  return (
    <Modal title="" onClose={onClose}>
      <div className="modal-confirm">
        <h3>Delete product</h3>
        <p>
          Are you sure you want to delete this product? This action cannot be
          undone
        </p>
        <div className="btn-action-confirm">
          <Button className="btn-confirm" onClick={onConfirm} size="large" kind="error">
            Delete
          </Button>
          <Button className="btn-cancel" onClick={onClose} size="large">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default memo(ModalConfirm);
