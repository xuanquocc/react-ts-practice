import {useState} from 'react'
import { useProviderContext } from '../../hooks/useProvider';
  import { Columns } from '../../types/columnsTtype';
  import Table from '../../components/common/Table/Table';
  import Button from '../../components/common/Button/Button';
  import Status  from '../../components/common/Status/Status';
  import AddProductForm from '../../components/common/AddForm/AddForm';
  import { Product } from '../../types/product';
  import './index.css'



  function Home() {
    const columns: Columns[] = [
      {
        key: "name",
        header: "name",
      },
      {
        key: "status",
        header: "status",
        render: (row: Product) => (
          <Status status={row.status}/>
        ),
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
              <button type="button" >
                edit
              </button>
              <button
                type="button"
                
              > 
                delete
              </button>
            </div>
          ),
      },
    ];
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { products,addAction, editAction, deleteAction } = useProviderContext(); 

    const handleSubmit = (newProduct: Product) => {
      // Gửi dữ liệu sản phẩm lên server
      addAction(newProduct);
    };

    const handleOpenModal = () => {
      setIsOpenModal(true)
    }

    const handleCloseModal = () => {
      setIsOpenModal(false)
    }

    return (
      <div className="container">
        <h1>Products Manage</h1>
        <div className="contain-modal">
          <Button className='button-add' size='large' onClick={handleOpenModal} kind='outline'>
            Add New Product
          </Button>
          {isOpenModal && (<AddProductForm onClose={handleCloseModal} onSubmit={handleSubmit}/>)}
        </div>
        <Table columns={columns} data={products} hover stripped></Table>
      </div>
    );
  }

  export default Home;
