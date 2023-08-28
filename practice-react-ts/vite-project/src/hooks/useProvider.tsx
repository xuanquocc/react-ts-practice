import { useContext, createContext, useCallback } from "react";
import { Product } from "../types/product";
import api from "../api/api";


interface ProductContextType {
    children: React.ReactNode
}

type ProviderType = {
    product: Product[];
    addAction: (newProduct: Product) => void;
    editAction: (editProduct: Product) => void;
    deleteAction: (idProduct: Product) => void;
}
 const ProviderContext = createContext<ProviderType | null>(null)

export const useProviderContext = () => {
    const context = useContext(ProviderContext)
    return context
}
const ProductContext = ({children}: ProductContextType) => {

    const addAction = useCallback(async(newPoduct: Product) => {
        try{

        }catch(e) {
            console.error(e);
        }
    },[])
    return (
       <ProviderContext.Provider value={}>
        {children}
       </ProviderContext.Provider>
    )
}

export default ProductContext