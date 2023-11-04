import { addCart } from "./cart.js";
let products;
// let cardLimit;
const cardIncrease = 4;
// const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;

let pageCount;

export function getCurrentPage() {
    return currentPage;
}

export function setCurrentPage() {
    currentPage++;
}

export function getPageCount() {
    return pageCount;
}


export async function getProducts() {
    const response = await fetch('files/product.json');
    if (response.ok == true)
        return await response.json();
    throw new Error(`getProducts: ${response.statusText}`);
}

export const loadProducts = async () => {
    products = await getProducts();
    const cardLimit = products.length;
    pageCount = Math.ceil(cardLimit / cardIncrease);
    const startRange = (currentPage - 1) * cardIncrease;
    const endRange = currentPage == pageCount ? cardLimit : currentPage * cardIncrease;
    addProductsToHtml(products.slice(startRange, endRange));
}

function addProductsToHtml(products) {

    let productItems = document.querySelector('.product__items');
    if (products != null) {
        products.forEach(item => {
            let newProduct = document.createElement('article');
            newProduct.classList.add('product__item');
            newProduct.setAttribute('data-pid', item.id);
            let productHtml = '';

            productHtml += `<a href="detail.html?id=${item.id}" class="product__img">
                <img src="img/products/${item.img}" alt=${item.title}>
                </a>`;

            if (item.labels) {
                productHtml += `<div class="product__labels">`;
                item.labels.forEach(label => {
                    productHtml += `<div class="product__label product__label-${label.type === 1 ? "sale" : "new"}">${label.type === 1 ? label.value + "%" : "New"}</div>`;
                })
                productHtml += `</div>`;
            }

            productHtml += `<div class="product__info">
                <a href="detail.html?id=${item.id}" class="card-title">${item.title}</a>
                <p class="subtitle">${item.description}</p>
                <div class="product__info__price">
                    <div class="product__info__price-sum">${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(item.priceSum)}</div>
                </div>`;

            if (item.priceOldSum) {
                productHtml += `<div class="product__info__price-old">
                    <div class="product__info__price-old-sum">${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(item.priceOldSum)}</div>
                </div>`;
            }

            productHtml += `</div>`;

            productHtml += `<div class="product__buy">
                <button class="product__buy__btn btn-white">Add to cart</button>
                <div class="product__buy__links">
                    <a href=""><span class="_icon-share"></span><span>Share</span></a>
                    <a href=""><span class="_icon-favourite"></span><span>Like</span></a>
                </div>
            </div>`;

            newProduct.innerHTML = productHtml;
            productItems.appendChild(newProduct);
            // newProduct.querySelector('.product__buy__btn').addEventListener('click', addCart);
            newProduct.querySelector('.product__buy__btn').addEventListener('click', () => { addCart(item.id, 1) });
        })
    }
}

export const getInStore = async (ID) => {
    products = await getProducts();
    let product = products.find(p => p.id === ID);
    if (product !== undefined){
        return product.inStore;
    }
}
