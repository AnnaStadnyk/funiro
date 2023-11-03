import { listCart, checkCart } from "./checkCart.js";
import { getProducts } from "./products.js";
checkCart();

export async function addCart(ID, n) {

    // let ID = Number(this.closest('.product__item').getAttribute('data-pid'));
    let products = await getProducts();
    let product = products.find(p => p.id === ID);
    let cardProduct = listCart.find(p => p.id === ID);
    if (!cardProduct) {
        listCart.push(product);
        if (n < product.inStore) {
            listCart[listCart.length - 1].quaintity = n;
        } else {
            listCart[listCart.length - 1].quaintity = product.inStore;
        }
    }
    else {
        if (cardProduct.quaintity + n < cardProduct.inStore) {
            cardProduct.quaintity += n;
        } else {
            cardProduct.quaintity = cardProduct.inStore;
        }
    }
    addProductToCartHtml();
    updateCartSum();

    let timeSave = 'expires=Fri, 31 Dec 2023 23:59:59 GMT';
    document.cookie = 'FuniroListCart=' + JSON.stringify(listCart) + '; ' + timeSave + '; ' + 'path=/'
}

export function updateCart() {
    let id = Number(this.closest('.cart__item').getAttribute('data-pid'));
    let product = listCart.find(p => p.id === id);

    if (this.classList.contains('cart-dec') === true) {
        product.quaintity--;
        if (product.quaintity < 1) {
            listCart.splice(listCart.indexOf(product), 1);
        }
    }
    else {
        if (product.quaintity < product.inStore) {
            product.quaintity++;
        }
    }
    addProductToCartHtml();
    updateCartSum();

    let timeSave = 'expires=Fri, 31 Dec 2023 23:59:59 GMT';
    document.cookie = 'FuniroListCart=' + JSON.stringify(listCart) + '; ' + timeSave + '; ' + 'path=/'
}

export function addProductToCartHtml() {
    let cartItems = document.querySelector('.cart__items');
    let cartButtons = document.querySelector('.cart__buttons');
    if (listCart.length === 0) {
        cartItems.classList.remove('active');

        if (cartButtons.classList.contains('active')) {
            cartButtons.classList.remove('active');
        }
    }
    else {
        cartItems.classList.add('active');
        cartButtons.classList.add('active');
        let cart = document.querySelector('.cart__items');
        cart.innerHTML = '';
        listCart.forEach(item => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('cart__item');
            newProduct.setAttribute('data-pid', item.id);
            let productHtml =
                `<a href="/detail.html?id=${item.id}" class="cart__item__img"><img src="img/products/${item.img}" alt="${item.title}"></a>
                    <div class="cart__item__info">
                        <a href="/detail.html?id=${item.id}" class="cart__item__title">${item.title}</a>
                        <div class="cart__info__price">
                            <span>${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(item.priceSum)}</span> x 1
                        </div>
                    </div>
                    <div class="cart__item__count">
                        <button class="cart-dec btn">-</button>
                        <span>${item.quaintity}</span>
                        <button class="cart-inc btn">+</button>
                    </div>`;
            newProduct.innerHTML = productHtml;
            cart.appendChild(newProduct);
            // onclick="deleteCart(${product.id}, 0)"
            newProduct.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', updateCart);
            })
        })
    }
}

export function updateCartSum() {
    let cartCount = document.querySelector('.cart__count');
    let cartSubtotal = document.querySelector('.cart__subtotal');
    let totalCount = 0;
    let subtotalPrice = 0;
    listCart.forEach(item => {
        totalCount += item.quaintity;
        subtotalPrice += (item.quaintity * item.priceSum);
    })
    if (totalCount > 0) {
        cartCount.classList.add('active');
        cartCount.innerHTML = totalCount;
        cartSubtotal.innerHTML = `<div>Subtotal</div> <div><span>${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(subtotalPrice)}</span></div>`;
    } else {
        cartCount.classList.remove('active');
        cartCount.innerHTML = '';
        cartSubtotal.innerHTML = 'No product in cart.';
    }
}
