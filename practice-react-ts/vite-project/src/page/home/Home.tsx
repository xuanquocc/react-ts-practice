import { useState, useCallback } from "react";
import { useProviderContext } from "../../hooks/useProvider";
import { Columns } from "../../types/columnsTtype";
import Table from "../../components/common/Table/Table";
import Button from "../../components/common/Button/Button";
import Status from "../../components/common/Status/Status";
import AddProductForm from "../../components/common/AddForm/AddForm";
import ModalConfirm from "../../components/common/ModalConfirm/ModalCorfirm";
import { Product } from "../../types/product";
import "./index.css";

function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product|null>(null)
  const { products, addAction, editAction, deleteAction } =
    useProviderContext();

  const handleEdit = useCallback((editedProduct: Product) => {
    setIsOpenModal(true);
    setSelectedProduct(editedProduct);
  },[setIsOpenModal,setSelectedProduct]);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
    setSelectedProduct(null);
  },[setIsOpenModal,setSelectedProduct]);

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
    [addAction, handleCloseModal, selectedProduct, editAction],
  );

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  },[setIsOpenModal]);

  
  const columns: Columns[] = [
    {
      key: "name",
      header: "name",
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
        <div className="action-buttons">
          <Button onClick={() => handleEdit(product)}>Edit</Button>
          <Button onClick={() => {
            setIsOpenModalConfirm(true)
            setSelectedProduct(product)
          }}>Delete</Button>
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
          <AddProductForm onClose={handleCloseModal} onSubmit={handleSubmit} initialData={selectedProduct}/>
        )}
        {
          isOpenModalConfirm && (
            <ModalConfirm onClose={() => {setIsOpenModalConfirm(false)}} onConfirm={() => {
              handleDelete();
              setIsOpenModalConfirm(false)
            }}/>
          )
        }
      </div>
      <Table columns={columns} data={products} hover stripped></Table>
    </div>
  );
}

export default Home;
