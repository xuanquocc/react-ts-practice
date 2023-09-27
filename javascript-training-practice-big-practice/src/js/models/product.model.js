export default class ProductModel {
    constructor() {


        this.products = JSON.parse(localStorage.getItem('products')) || [
            {
                id: 1,
                img: "https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/i1-004ef3ed-1a1f-4969-a549-d069ca48be7c/dunk-low-orange-blaze-release-date.jpg",
                productName: "Dunk Low 'Orange Blaze'",
                quantity: 10,
                price: 100,
            },
            {
                id: 2,
                img: "https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/3a06a28e-3671-47f8-a816-632eb280eb7d/sb-dunk-low-strangelove-release-date.jpg",
                productName: "SB Dunk Low 'Strange Love'",
                quantity: 10,
                price: 200
            },
            {
                id: 3,
                img: "https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/2cdc9e01-82df-448c-8119-3769a7aa47cd/sb-dunk-low-pro-chicago-release-date.jpg",
                productName: "SB Dunk Low Pro 'Chicago'",
                quantity: 10,
                price: 300
            }
        ]

    }

    _commitProducts(products) {
        this.onProductListChanged(products)
        localStorage.setItem('products', JSON.stringify(products))
    }

    bindProductListChanged(callback) {
        this.onProductListChanged = callback
    }

    addProduct(product) {
        this.products.push({
            id: this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1,
            img: product.productImage,
            productName: product.productName,
            quantity: product.productQuantity,
            price: product.productPrice,
        })

        this._commitProducts(this.products)

    }

    updateProduct(product, id) {
        const item = this.products.find((obj => obj.id == id))
        item.img = product.productImage
        item.productName = product.productName
        item.quantity = product.productQuantity
        item.price = product.productPrice

        this._commitProducts(this.products)
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id)
        this._commitProducts(this.products)
    }
}
