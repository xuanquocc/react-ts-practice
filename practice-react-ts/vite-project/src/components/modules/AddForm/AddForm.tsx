import React, { useState, useEffect, useCallback } from "react";
import "./addForm.css";
import { Product } from "../../../types/product";
import Modal from "../../common/Modal/Modal";
import Input from "../../common/Input/Input";
import { Errors, validator } from "../../../utils/validater";
import { SelectOption, CustomSelect } from "../../common/SelectBox/SelectBox";
import Button from "../../common/Button/Button";

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

  const [errorMessages, setErrorMessages] = useState<Errors>({
    id: "",
    name: "",
    status: "",
    type: "",
    quantity: "",
    brand: "",
    price: "",
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

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const errors = validator({
        isRequired: [
          { key: "name", value: formData.name },
          { key: "status", value: formData.status },
          { key: "type", value: formData.type },
          { key: "quantity", value: formData.quantity },
          { key: "price", value: formData.price },
          { key: "brand", value: formData.brand },
          { key: "image", value: formData.image },
        ],
      });
      setErrorMessages(errors.errors);
      console.log(errorMessages.name)
      if (errors.valid) {
        onSubmit({...formData});
      }
    },
    [formData, onSubmit]
  );
  
  
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
            error={errorMessages.name}
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
            error={errorMessages.quantity}
            value={formData.quantity}
            placeholder="Quantity"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-price">
          <Input
            type="number"
            name="price"
            error={errorMessages.price}
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
        <div className="brand-image">
            <div className="input-brand">
              <Input
                type="text"
                name="brand"
                error={errorMessages.brand}
                label="Brand"
                value={formData.brand}
                placeholder="Brand"
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </div>

            <div className="input-image">
              <Input
                type="text"
                error={errorMessages.image}
                name="image"
                label="Image"
                value={formData.image}
                placeholder="Image here"
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </div>
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
            error={errorMessages.name}
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
            error={errorMessages.quantity}
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
            error={errorMessages.price}
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
        <div className="brand-image">
            <div className="input-brand">
              <Input
                type="text"
                name="brand"
                error={errorMessages.brand}
                label="Brand"
                value={formData.brand}
                placeholder="Brand"
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </div>

            <div className="input-image">
              <Input
                type="text"
                name="image"
                label="Image"
                error={errorMessages.image}
                value={formData.image}
                placeholder="Image here"
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </div>
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
