import React, { useState } from "react";
import './addForm.css'
import { Product } from "../../../types/product";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import { SelectOption, CustomSelect } from "../SelectBox/SelectBox";
import Button from "../Button/Button";

interface AddProductFormProps {
  onSubmit: (newProduct: Product) => void;
  onClose: () => void;
}

const AddProductForm = ({ onSubmit, onClose }: AddProductFormProps) => {
  const options: SelectOption[] = [
    { value: "available", label: "Available" },
    { value: "soldout", label: "Sold Out" },
  ];

  const [selectedFruit, setSelectedFruit] = useState("apple");

  const handleFruitChange = (newFruit: string) => {
    setSelectedFruit(newFruit);
  };

  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    status: "",
    type: "",
    quantity: 0,
    brand: "",
    price: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal title="Add new Product" onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <div className="input-name">
          <Input
            type="text"
            name="name"
            label="Name"
            value={formData.name}
            placeholder="Name"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-quantity">
          <Input
            type="number"
            name="quantity"
            label="Quantity"
            value={formData.quantity}
            placeholder="Quantity"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-price">
          <Input
            type="number"
            name="price"
            label="Price"
            value={formData.price}
            placeholder="Price"
            onChange={handleInputChange}
          />
        </div>
        <div className="select">
          <CustomSelect
            options={options}
            value={selectedFruit}
            onChange={handleFruitChange}
          />
        </div>
        <div className="input-brand">
          <Input
            type="text"
            name="brand"
            label="Brand"
            value={formData.brand}
            placeholder="Brand"
            onChange={handleInputChange}
          />
        </div>

        <div className="input-action">
        <Button className="submit-btn" onClick={() => handleSubmit}>Submit</Button>
        <Button className="cancel-btn" onClick={handleCloseModal}>Cancel</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductForm;
