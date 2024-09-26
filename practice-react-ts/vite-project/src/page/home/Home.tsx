import { useState, useCallback } from "react";
//type
import { Columns } from "../../types/columnsTtype";
import { useProviderContext } from "../../hooks/useProvider";
//component
import Table from "../../components/common/Table/Table";
import Button from "../../components/common/Button/Button";
import Status from "../../components/common/Status/Status";
import AddProductForm from "../../components/modules/AddForm/AddForm";
import ModalConfirm from "../../components/common/ModalConfirm/ModalCorfirm";
import { Product } from "../../types/product";
import Image from "../../components/common/Image/Image";
import Action from "../../assets/dropdownIcon.svg";
//styles
import "./index.css";
import { Link } from "react-router-dom";


function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDropdownProductId, setShowDropdownProductId] = useState<string | null>(null);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { products, addAction, editAction, deleteAction } =
    useProviderContext();

  const handleEdit = useCallback(
    (editedProduct: Product) => {
      setIsOpenModal(true);
      setSelectedProduct(editedProduct);
      setIsDropdownOpen(false)
    },
    [setIsOpenModal, setSelectedProduct]
  );

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
    setSelectedProduct(null);
  }, [setIsOpenModal, setSelectedProduct]);

  const handleDelete = useCallback(() => {
    if (selectedProduct) {
      deleteAction(selectedProduct.id);
    }
  }, [deleteAction, selectedProduct]);

  const handleSubmit = useCallback(
    (formData: Product) => {
      if (selectedProduct) {
        editAction({ ...selectedProduct, ...formData });
      } else {
        const newProduct: Product = {
          ...formData,
        };
        addAction(newProduct);
      }
      handleCloseModal();
    },
    [addAction, handleCloseModal, selectedProduct, editAction]
  );

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, [setIsOpenModal]);

  const handleDropdownOpen = useCallback((productId:string) => {
    setIsDropdownOpen(!isDropdownOpen);
    setShowDropdownProductId(productId)
  }, [isDropdownOpen]);

  const handleRowClick = useCallback(
    (productId: string) => {
      const foundProduct = products.find(
        (product: Product) => product.id === productId,
      );
      setSelectedProduct(foundProduct || null);
    },
    [products],
  );

  const columns: Columns[] = [
    {
      key: "name",
      header: "name",
      render: (row: Product) => (
        <Link className="link" to={`/detail/${row.id}`} onClick={() => handleRowClick(row.id)}>
          <div className="product-wrapper">
          <Image src={row.image} />
          <span className="product-name">{row.name}</span>
        </div>
        </Link>
      ),
    },
    {
      key: "status",
      header: "status",
      render: (row: Product) => <Status status={row.status} />,
    },
    {
      key: "type",
      header: "type",
    },
    {
      key: "quantity",
      header: "quantity",
    },
    {
      key: "brand",
      header: "brand",
    },
    {
      key: "price",
      header: "price",
    },
    {
      key: "action",
      header: "action",
      render: (product: Product) => (
        <div className="action">
          <Button className="action-btn" onClick={() => handleDropdownOpen(product.id)}>
            <img src={Action} alt="" />
          </Button>

          {isDropdownOpen &&  showDropdownProductId == product.id && (
            <div className="action-buttons">
              <Button className="edit-btn" onClick={() => handleEdit(product)} kind="primary" size="medium">Edit</Button>
              <Button
              className="delete-btn"
                onClick={() => {
                  setIsOpenModalConfirm(true);
                  setSelectedProduct(product);
                  setIsDropdownOpen(false);
                }}
                kind="error"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <h1>Products Manage</h1>
      <div className="contain-modal">
        <Button
          className="button-add"
          size="large"
          onClick={handleOpenModal}
          kind="outline"
        >
          Add New Product
        </Button>
        {isOpenModal && (
          <AddProductForm
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
            initialData={selectedProduct}
          />
        )}
        {isOpenModalConfirm && (
          <ModalConfirm
            onClose={() => {
              setIsOpenModalConfirm(false);
            }}
            onConfirm={() => {
              handleDelete();
              setIsOpenModalConfirm(false);
            }}
          />
        )}
      </div>
      <Table columns={columns} data={products} hover stripped></Table>
    </div>
  );
}

export default Home;
