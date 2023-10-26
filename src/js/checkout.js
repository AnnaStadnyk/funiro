import { listCart, checkCart } from "./checkCart.js";

checkCart();
let checkout = document.querySelector('.checkout');
export function addProductToCheckoutHtml() {
    if (listCart.length !== 0) {
        let cart = checkout.querySelector('.cart__items');
        cart.innerHTML = '';
        listCart.forEach(item => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('cart__item');
            newProduct.setAttribute('data-pid', item.id);
            let productHtml =
                `<a href="${item.url}" class="cart__item__img"><img src="img/products/${item.img}" alt="${item.title}"></a>
                <div class="cart__item__info">
                    <a href="${item.url}" class="cart__item__title">${item.title}</a>
                    <div class="cart__info__price">
                        <span>${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(item.priceSum)}</span> x <span>${item.quaintity}</span>
                    </div>
                </div>
                <div class="cart__item__price">
                <span>${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(item.priceSum * item.quaintity)}</span> 
            </div>`;
            newProduct.innerHTML = productHtml;
            cart.appendChild(newProduct);
        })
    }
}

export function updateCheckoutSum() {
    let cartSubtotal = checkout.querySelector('.cart__subtotal');
    let cartShipping = checkout.querySelector('.cart__shipping');
    let cartTotal = checkout.querySelector('.cart__total');
    let totalCount = 0;
    let subtotalPrice = 0;
    let shipping = 200000;
    let totalPrice = 0;
    listCart.forEach(item => {
        totalCount += item.quaintity;
        subtotalPrice += (item.quaintity * item.priceSum);
    })
    if (totalCount > 0) {
        totalPrice = subtotalPrice + shipping;
        cartSubtotal.innerHTML = `<div>Subtotal</div> <div><span>${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(subtotalPrice)}</span></div>`;
        cartShipping.innerHTML = `<div>Shipping</div> <div><span>${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(shipping)}</span></div>`;
        cartTotal.innerHTML = `<div>Total</div> <div><span>${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(totalPrice)}</span></div>`;

    }
}