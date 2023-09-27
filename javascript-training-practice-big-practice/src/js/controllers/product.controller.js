export default class ProductController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.bindProductListChanged(this.onProductListChanged);
        this.onProductListChanged(this.model.products);

        this.view.bindAddProduct(this.handleAddProduct);
        this.view.bindDeleteProduct(this.handleDeleteProduct);
        this.view.bindUpdateProduct(this.handleUpdateProduct);
    }

    /**
     * When list product change => view render again
     */
    onProductListChanged = (products) => {
        this.view.renderProducts(products);
    };

    /**
     * Handle add product
     * Transfer product data to model add product
     */
    handleAddProduct = (product) => {
        this.model.addProduct(product);
    };

    /**
     * Handle edit product
     * Transfer product data to model edit product
     */
    handleUpdateProduct = (product, id) => {
        this.model.updateProduct(product, id);
    };

    /**
     * Handle delete product
     * Transfer product data to model delete product
     */
    handleDeleteProduct = (id) => {
        this.model.deleteProduct(id);
    };
}
