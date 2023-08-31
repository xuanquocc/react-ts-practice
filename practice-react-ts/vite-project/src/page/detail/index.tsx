import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// components
import DetailForm from './FormDetail/DetailForm';

// hooks
import { useProviderContext } from '../../hooks/useProvider';



const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { products } = useProviderContext();

  const selectedProduct = products.find(
    (product) => product.id === productId,
  );

 

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="product-detail-container">
      {selectedProduct ? (
        <DetailForm
          onBack={handleBack}
          product={selectedProduct}
        />
      ) : (
        <div className="loading">Loading or error message...</div>
      )}
    </div>
  );
};

export default ProductDetailPage;
