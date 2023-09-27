import Validate from "../helper/validation";
import { resetValidate, serializeForm } from '../helper/UtilForm';

export default class ProductView {
    constructor() {
        this.table = document.querySelector(".table");
        this.tableHead = document.querySelector(".table thead");
        this.productTable = document.querySelector(".table tbody");
        this.btnAddProduct = document.querySelector(".btn-add");
        this.formAddProductInput = document.querySelectorAll(".form-add input");
        this.formEditProduct = document.querySelectorAll(".form-edit input");
        this.btnAddNewProduct = document.querySelector("#btnAddNewProduct");

        //delete product
        this.deleteModal = document.querySelector("#deleteProduct");
        this.deleteBtn = document.querySelector(".delete-btn");

        this.editForm = document.querySelector(".form-edit");

        this.addForm = document.querySelector(".form-add");

        this.isAuth = "";
        this.products = [];

        this.productModal = document.querySelector("#productModal");
        this.modalTitle = this.productModal.querySelector(".modal-title");
        this.productForm = this.productModal.querySelector(".product-form");
        this.productFormField = this.productForm.querySelectorAll("input");
        this.formFields = document.forms["product-form"].querySelectorAll("input");
    }

    //render product in table
    renderProducts(products) {
        this.products = products;
        let temp = "";
        if (products.length === 0) {
            this.productTable.innerHTML = `<p class="text-center">No Data</p>`;
            this.tableHead.classList.add("hide");
        } else {
            this.tableHead.classList.remove("hide");
            products.map((item, index) => {
                temp += `<tr key= ${item.id}>
               <td><img id="image" src="${item.img}"
                       alt="${item.productName}"></td>
               <td>${item.productName}</td>
               <td>${item.quantity}</td>
               <td>${item.price}$</td>
               <td class="table-action">
                   <button data-id=${item.id} type="button" class="btn btn-warning btn-edit">Edit</button>
                   <button data-id=${item.id} type="button" class="btn btn-danger btn-delete">Delete</button>
               </td>
           </tr>`;
            });
            this.productTable.innerHTML = temp;
        }
    }

    //reset input
    _resetInput(input) {
        for (let i = 0; i < input.length; i++) {
            input[i].value = "";
        }
    }

    submitForm = (form, handler, id) => {
        const formData = serializeForm(form);
        $("#productModal").modal("hide");
        id ? handler(formData, id) : handler(formData);
    };



    //Add Product
    bindAddProduct(handler) {
        this.btnAddNewProduct.addEventListener("click", (e) => {
            e.preventDefault();

            const isAuth = localStorage.getItem("isAuth")
            isAuth === 'true' ? $("#productModal").modal("show") : ""
            this.modalTitle.textContent = "Add New Product";

            this.productForm.removeAttribute("id");
            this.productForm.reset();

            resetValidate(this.productForm)

            const validator = new Validate({
                form: '.product-form',
                errorSelector: 'small',
                rules: [
                    'productImage:isRequired',
                    'productName:isRequired',
                    'productQuantity:isRequired',
                    'productPrice:isRequired',
                    'productImage:isUrl',
                    'productName:maxLength',
                    'productQuantity:isNumber',
                    'productPrice:isNumber',

                ],
                onSubmit: () => {
                    if (!this.productForm.getAttribute("id")) {
                        this.submitForm(this.productForm, handler);
                    }
                }
            })

            // Validate.validator({
            //     form: ".product-form",
            //     errorSelector: "small",
            //     rules: [
            //         Validate.isRequired("productImage"),
            //         Validate.isRequired("productName"),
            //         Validate.isRequired("productQuantity"),
            //         Validate.isRequired("productPrice"),
            //         Validate.isUrl("productImage"),
            //         Validate.maxLength("productName", 50),
            //         Validate.isNumber("productQuantity"),
            //         Validate.isNumber("productPrice"),
            //     ],
            //     onSubmit: () => {
            //         if (!this.productForm.getAttribute("id")) {
            //             this.submitForm(this.productForm, handler);
            //         }
            //     },
            // });
        });
    }

    //EditProduct
    bindUpdateProduct(handler) {
        let getIdRow;
        let dataProduct;
        this.productTable.addEventListener("click", (e) => {
            e.preventDefault();

            const isAuth = localStorage.getItem("isAuth")

            if (e.target.classList.contains("btn-edit")) {
                isAuth === 'true' ? $("#productModal").modal("show") : ""
                this.modalTitle.textContent = "Edit Product";
                this.productForm.setAttribute("id", "edit");

                const currentRow = e.target.parentElement.closest("tr");

                getIdRow = parseInt(currentRow.getAttribute("key"));
                const product = this.products.find((item) => item.id === getIdRow);

                dataProduct = {
                    productImage: product.img,
                    productName: product.productName,
                    productPrice: product.price,
                    productQuantity: product.quantity,
                };

                let productForm = new FormData(this.productForm);

                for (let [key, value] of productForm.entries()) {
                    const input = document.querySelector(`input[name='${key}']`);
                    switch (input.type) {
                        default:
                            input.value = dataProduct[key];
                            break;
                    }
                }
            }

            const validator = new Validate({
                form: '.product-form',
                errorSelector: 'small',
                rules: [
                    'productImage:isRequired',
                    'productName:isRequired',
                    'productQuantity:isRequired',
                    'productPrice:isRequired',
                    'productImage:isUrl',
                    'productName:maxLength',
                    'productQuantity:isNumber',
                    'productPrice:isNumber',

                ],
                onSubmit: () => {
                    if (this.productForm.getAttribute("id")) {
                        this.submitForm(this.productForm, handler, getIdRow);
                    }
                }
            })

            // Validate.validator({
            //     form: ".product-form",
            //     errorSelector: "small",
            //     rules: [
            //         Validate.isRequired("productImage"),
            //         Validate.isRequired("productName"),
            //         Validate.isRequired("productQuantity"),
            //         Validate.isRequired("productPrice"),
            //         Validate.isUrl("productImage"),
            //         Validate.maxLength("productName", 50),
            //         Validate.isNumber("productQuantity"),
            //         Validate.isNumber("productPrice"),
            //     ],
            //     onSubmit: () => {
            //         if (this.productForm.getAttribute("id")) {
            //             this.submitForm(this.productForm, handler, getIdRow);
            //         }
            //     },
            // });
        });
    }

    //Delete Product
    bindDeleteProduct(handler) {
        let id = "";

        this.productTable.addEventListener("click", (e) => {
            id = parseInt(e.target.getAttribute("data-id"));
            const element = e.target;
            const isAuth = localStorage.getItem("isAuth")

            if (element.classList.contains("btn-delete")) {
                isAuth === 'true' ? $("#deleteProduct").modal("show") : ""
            }
        });
        this.deleteBtn.addEventListener("click", (e) => {
            handler(id);
            $("#deleteProduct").modal("hide");
        });
    }
}
