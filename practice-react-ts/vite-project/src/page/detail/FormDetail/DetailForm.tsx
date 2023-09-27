import { FC, memo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button/Button";
import Input from "../../../components/common/Input/Input";
import { Product } from "../../../types/product";
import "./detailForm.css";

import {
  CustomSelect,
  SelectOption,
} from "../../../components/common/SelectBox/SelectBox";

interface DetailFormProps {
  product: Product;
  onBack: () => void;
}

const DetailForm: FC<DetailFormProps> = ({ product, onBack }) => {
  const [formData, setFormData] = useState<Product>(product);

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

  return (
    <div className="wrapper">
      <h1 className="title">{formData.name}</h1>
      <div className="content">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="input-name">
            <Input
              type="text"
              name="name"
              label="Product"
              value={formData.name}
              placeholder="Name"
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>
          <div className="input-quantity">
            <Input
              type="number"
              name="quantity"
              label="Quantity"
              value={formData.quantity}
              placeholder="Quantity"
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>
          <div className="input-price">
            <Input
              type="number"
              name="price"
              label="Price"
              value={formData.price}
              placeholder="Price"
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>
          <div className="select">
            <CustomSelect
              label="Status"
              name="status"
              options={options}
              value={formData.status}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />

            <CustomSelect
              label="Type"
              name="type"
              options={optionsType}
              value={formData.type}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>
          <div className="brand-image">
            <div className="input-brand">
              <Input
                type="text"
                name="brand"
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
                value={formData.image}
                placeholder="Image here"
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="input-action">
            <Button className="submit-btn" size="medium" kind="primary">
              Submit
            </Button>
            <Button className="cancel-btn" size="medium">
              <Link to="/" onClick={onBack}>
                back
              </Link>
            </Button>
          </div>
        </form>

        <img className="img-detail" src={formData.image} alt="" />
      </div>
    </div>
  );
};

export default memo(DetailForm);
