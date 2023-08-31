import React, { useState, useEffect } from "react";
import "./addForm.css";
import { Product } from "../../../types/product";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import { SelectOption, CustomSelect } from "../SelectBox/SelectBox";
import Button from "../Button/Button";

interface AddProductFormProps {
  onSubmit: (newProduct: Product) => void;
  onClose: () => void;
  initialData?: Product | null;
}

const AddProductForm = ({
  onSubmit,
  onClose,
  initialData,
}: AddProductFormProps) => {
  const options: SelectOption[] = [
    { value: "", label: "Select" },
    { value: "available", label: "Available" },
    { value: "soldout", label: "Sold Out" },
  ];

  const optionsType: SelectOption[] = [
    { value: "", label: "Select" },
    { value: "ring", label: "Ring" },
    { value: "crown", label: "Crown" },
  ];

  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    status: "",
    type: "",
    quantity: 0,
    brand: "",
    price: 0,
    image: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name, value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleCloseModal = () => {
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  return initialData ? (
    <Modal title="Product information" onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <div className="input-name">
          <Input
            type="text"
            name="name"
            label="Product"
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
            label="Status"
            name="status"
            options={options}
            value={formData.status}
            onChange={handleInputChange}
          />

          <CustomSelect
            label="Type"
            name="type"
            options={optionsType}
            value={formData.type}
            onChange={handleInputChange}
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

        <div className="input-image">
          <Input
            type="text"
            name="image"
            label="Image"
            value={formData.image}
            placeholder="Image here"
            onChange={handleInputChange}
          />
        </div>

        <div className="input-action">
          <Button
            className="submit-btn"
            size="medium"
            kind="primary"
            onClick={() => handleSubmit}
          >
            Submit
          </Button>
          <Button
            className="cancel-btn"
            size="medium"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  ) : (
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
            label="Status"
            name="status"
            options={options}
            value={formData.status}
            onChange={handleInputChange}
          />

          <CustomSelect
            label="Type"
            name="type"
            options={optionsType}
            value={formData.type}
            onChange={handleInputChange}
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

        <div className="input-image">
          <Input
            type="text"
            name="image"
            label="Image"
            value={formData.image}
            placeholder="Image here"
            onChange={handleInputChange}
          />
        </div>

        <div className="input-action">
          <Button
            className="submit-btn"
            size="medium"
            kind="primary"
            onClick={() => handleSubmit}
          >
            Submit
          </Button>
          <Button
            className="cancel-btn"
            size="medium"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductForm;
