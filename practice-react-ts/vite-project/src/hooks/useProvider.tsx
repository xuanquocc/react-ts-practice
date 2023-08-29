import React, { createContext, useContext, useCallback, useState, useEffect } from "react";
import { Product } from "../types/product";
import { addProduct, updateProduct, deleteProduct, fetchProducts } from "../service/service";

interface ProductContextType {
    children: React.ReactNode;
}

type ProviderType = {
    products: Product[];
    addAction: (newProduct: Product) => void;
    editAction: (editProduct: Product) => void;
    deleteAction: (idProduct: string) => void;
};

const ProviderContext = createContext<ProviderType| undefined>(undefined);

export const useProviderContext = () => {
    const context = useContext(ProviderContext);
    if (!context) {
        throw new Error("useProviderContext must be used within a Provider");
    }
    return context;
};

export const ProductContext = ({ children }: ProductContextType) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProductData() {
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProductData();
    }, []);

    const addAction = useCallback(async (newProduct: Product) => {
        try {
            await addProduct(newProduct);
            setProducts((prevProducts) => [...prevProducts, newProduct]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }, []);

    const editAction = useCallback(async (editProduct: Product) => {
        try {
            await updateProduct(editProduct.id, editProduct);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === editProduct.id ? editProduct : product
                )
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }, []);

    const deleteAction = useCallback(async (idProduct: string) => {
        try {
            await deleteProduct(idProduct);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== idProduct));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }, []);

    const providerValue: ProviderType = {
        products,
        addAction,
        editAction,
        deleteAction,
    };

    return <ProviderContext.Provider value={providerValue}>{children}</ProviderContext.Provider>;
};

