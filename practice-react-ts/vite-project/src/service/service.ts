import { Product } from "../types/product";
import api from "../api/api";


export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

export const addProduct = async (newProduct: Product): Promise<Product[]> => {
    try {
        const response = await api.post('/products', newProduct);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateProduct = async (productId: string, updatedProduct: Product): Promise<Product[]> => {
    try {
        const response = await api.put(`/products/${productId}`, updatedProduct);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteProduct = async (productId: string): Promise<void> => {
    try {
        await api.delete(`/products/${productId}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
