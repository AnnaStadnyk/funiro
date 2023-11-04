import { getProducts } from "./products.js";


export async function addDetail() {

    // let ID = Number(this.closest('.product__item').getAttribute('data-pid'));

    let ID = Number(new URLSearchParams(window.location.search).get('id'));

    let products = await getProducts();
    let product = products.find(p => p.id === ID);

    addProductToDetailHtml(product);

}
function addProductToDetailHtml(product) {
    if (product !== null) {
        let detail = document.querySelector('.detail');
        detail.setAttribute('data-pid', product.id);

        if (product.images) {
            let element = document.querySelector('.detail__swiper .swiper-wrapper');
            product.images.forEach((item, i) => {
                let child = document.createElement('div');
                child.classList.add('detail__swiper__item', 'swiper-slide');
                let img = document.createElement('img');
                img.src = `img/products/${item.img}`;
                img.alt = `${product.title}-${i}`;
                child.appendChild(img);
                element.appendChild(child);
            })

            element = document.querySelector('.detail__swiper__thumbs .swiper-wrapper');
            product.images.forEach((item, i) => {
                let div = document.createElement('div');
                div.classList.add('swiper-slide');
                element.appendChild(div);
                let child = document.createElement('div');
                child.classList.add('detail__swiper__thumbs__item');
                let img = document.createElement('img');
                img.src = `img/products/${item.img}`;
                img.alt = `${product.title}-${i}`;
                child.appendChild(img);
                div.appendChild(child);
            })
        }
        else {
            let element = document.querySelector('.detail__swiper .swiper-wrapper');
            let child = document.createElement('div');
            child.classList.add('detail__swiper__item', 'swiper-slide');
            let img = document.createElement('img');
            img.src = `img/products/${product.img}`;
            img.alt = `${product.title}`;
            child.appendChild(img);
            element.appendChild(child);
        }

        document.querySelector('.detail__info > h3').textContent = product.title;
        document.querySelector('.detail__info > p').textContent = product.description;
        document.querySelector('.detail__remain > span').textContent = `${product.inStore}${product.inStore <= 10 ? '' : '+'}`;

        if (product.labels) {
            let element = document.querySelector('.product__labels');

            product.labels.forEach(label => {
                let div = document.createElement('div');
                div.classList.add('product__label', `product__label-${label.type === 1 ? "sale" : "new"}`);
                div.textContent = `${label.type === 1 ? label.value + "%" : "New"}`;
                element.appendChild(div);
            })
        }

        document.querySelector('.product__info__price').textContent = `${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(product.priceSum)}`;
        if (product.priceOldSum) {
            let element = document.querySelector('.detail__price');
            let div = document.createElement('div');
            div.classList.add('product__info__price-old');
            div.textContent = `${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(product.priceOldSum)}`;
            element.appendChild(div);
        }

        document.querySelector('.detail__description').textContent = product.info;

        if (product.characteristics) {
            let element = document.querySelector('.detail__characteristics');
            let table = document.createElement('table');
            product.characteristics.forEach(item => {
                let tr = table.insertRow(0);
                let cell = tr.insertCell(0);
                cell.textContent = item.title;
                cell = tr.insertCell(1);
                cell.textContent = item.description;
            });
            element.appendChild(table);
        }

        if (product.review) {
            document.querySelector('.detail__review__all').classList.add('active');
            document.querySelector('.detail__review__avg > span:first-child').textContent = `${Number(product.rating).toFixed(1)}`;
            document.querySelector('.detail__review__avg > span:last-child').textContent = 5;
            let element = document.querySelector('.detail__review__star');
            for (let s = 0; s < 5; s++) {
                let span = document.createElement('span');
                span.classList.add('_icon-star-full');
                if (s < product.rating) span.classList.add('active');
                element.appendChild(span);
            }
            document.querySelector('.detail__review__count > span').textContent = product.review;
        }

        if (product.reviews) {
            let element = document.querySelector('.detail__review__items');
            product.reviews.forEach(item => {
                let div = document.createElement('div');
                div.classList.add('detail__review__item');
                let child = document.createElement('div');
                child.classList.add('detail__review__item_user');
                div.appendChild(child);
                let d = document.createElement('div');
                d.classList.add('detail__review__item_name');
                child.appendChild(d);
                d.textContent = item.user;
                let s = document.createElement('span');
                s.classList.add('_icon-user');
                d.insertAdjacentElement('afterbegin', s);
                if (item.purchase) {
                    d = document.createElement('div');
                    d.classList.add('detail__review__item_purchase');
                    child.appendChild(d);
                    s = document.createElement('span');
                    s.classList.add('_icon-shopping-bag');
                    d.appendChild(s);
                    let p = document.createElement('p');
                    p.textContent = 'Сonfirmed purchase';
                    d.appendChild(p);
                }

                child = document.createElement('div');
                child.classList.add('detail__review__item_content');
                div.appendChild(child);
                d = document.createElement('div');
                d.classList.add('detail__review_item_star');
                child.appendChild(d);
                for (let s = 0; s < 5; s++) {
                    let span = document.createElement('span');
                    span.classList.add('_icon-star-full');
                    if (s < item.rating) span.classList.add('active');
                    d.appendChild(span);
                }
                d = document.createElement('div');
                d.classList.add('detail__review__item_text');
                d.textContent = item.text;
                child.appendChild(d);

                let a = document.createElement('a');
                a.classList.add('underline');
                a.href = "";
                a.text = "Leave a comment";
                child.appendChild(a);

                let t = document.createElement('time');
                t.dateTime = item.datetime;
                t.textContent = new Date(item.datetime).toLocaleDateString();
                child.appendChild(t);


                element.appendChild(div);
            })
            element = document.querySelector('.detail__review');
            let div = document.createElement('div');
            div.classList.add('detail__review__pagination', 'pagination');
            let ul = document.createElement('ul');
            ul.classList.add('pagination__items');
            div.appendChild(ul);
            for (let i = 0; i < 6; i++) {
                let li = document.createElement('li');
                li.classList.add('pagination__item');
                let s = document.createElement('span');
                if (i === 0 || i === 5) {
                    s.classList.add('_icon-arrow-down');
                }
                else if (i === 3) {
                    s.textContent = '...';
                }
                else {
                    s.textContent = i;
                }
                li.appendChild(s);
                ul.appendChild(li);
            }
            element.appendChild(div);
        }


        // let productHtml = `<div class="detail__swiper__container">`;
        // if (product.images) {
        //     productHtml += `<div class="detail__swiper__main">
        //     <div class="detail__swiper swiper">
        //         <div class="swiper-wrapper">`;
        //     product.images.forEach((item, i) => {
        //         productHtml += `<div class="swiper-slide">
        //         <div class="detail__swiper__item swiper-slide">
        //             <a href="img/products/${item.img}" data-fslightbox="gallery"><img
        //                     src="img/products/${item.img}" alt="${product.title}-${i}"></a>
        //         </div>
        //     </div>`
        //     });
        //     productHtml += `</div>
        //         </div>
        //         <div class="swiper__arrows">
        //             <button class="arrows-left _icon-arrow-down arrows-white"></button>
        //             <button class="arrows-right _icon-arrow-down arrows-white"></button>
        //         </div>
        //     </div>`;
        //     productHtml += `<div class="detail__swiper__thumbs swiper">
        //         <div class="swiper-wrapper">`;
        //     product.images.forEach((item, i) => {
        //         productHtml += `<div class="swiper-slide">
        //         <div class="detail__swiper__thumbs__item ">
        //             <img src="img/products//${item.img}" alt="${product.title}-${i}">
        //         </div>
        //     </div>`
        //     });
        //     productHtml += `</div>
        //     </div>`;
        // }
        // productHtml += `</div>`;

        // // detail__content
        // productHtml += `<div class="detail__content">
        // <div class="detail__info">
        //     <h3 class="card-title">${product.title}</h3>
        //     <p class="subtitle">${product.description}</p>`;

        // if (product.labels) {
        //     productHtml += `<div class="product__labels">`;
        //     product.labels.forEach(label => {
        //         productHtml += `<div class="product__label product__label-${label.type === 1 ? "sale" : "new"}">${label.type === 1 ? label.value + "%" : "New"}</div>`;
        //     })
        //     productHtml += `</div>`;
        // }

        // productHtml += `<div class="detail__price">
        //     <div class="product__info__price">${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(product.priceSum)}</div>`;
        // if (product.priceOldSum) {
        //     productHtml += `<div class="product__info__price-old">${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(product.priceOldSum)}</div>`;
        // }
        // productHtml += `</div>`;

        // productHtml += `<div class="detail__remain">
        // Remaining stock: <span>${product.inStore}${product.inStore <= 10 ? '' : '+'}</span>
        // </div>`

        // productHtml += `<div class="detail__links">
        //     <a href="#"><span class="_icon-share"></span><span>Share</span></a>
        //     <a href="#"><span class="_icon-favourite"></span><span>Like</span></a>
        // </div>`;

        // productHtml += `</div>`;

        // productHtml += `<div class="detail__buy">
        //         <div class="cart__item__count">
        //             <button class="cart-dec btn">-</button>
        //             <span>1</span>
        //             <button class="cart-inc btn">+</button>
        //         </div>
        //         <button class="detail__buy__btn btn-white">Add to cart</button>
        //         <a href="checkout.html" class="detail__buy__btn btn-white">Checkout</a>
        //     </div>`;

        // // detail__description__tabs
        // productHtml += `
        //     <div class="detail__description__tabs">
        //         <button class="detail__description__tab active" data-detail="description">Description</button>
        //         <button class="detail__description__tab" data-detail="characteristics">Сharacteristics</button>
        //         <button class="detail__description__tab" data-detail="review">Testimonials</button>
        //     </div>`;
        //     productHtml += `<div class="detail__description__info">`;
        //     productHtml += `<div class="detail__description__info__tab detail__description ">`;
        //     if (product.info){
        //         productHtml += `${product.info}`;
        //     }
        //     productHtml += `</div>`;
        //     productHtml += `<div class="detail__description__info__tab detail__characteristics ">`;
        //     if (product.characteristics){
        //         productHtml += `<table>`;    
        //         product.characteristics.forEach(item => {
        //             productHtml += `<tr>
        //             <td>
        //                 ${item.title}
        //             </td>
        //             <td>
        //                 ${item.description}
        //             </td>
        //         </tr>`;
        //         })
        //         productHtml += `</table>`;
        //     }
        //     productHtml += `</div>`;
        //     productHtml += `<div class="detail__description__info__tab detail__review active">`;
        //     productHtml += `<div class="detail__review__info">`;
        //     if (product.review){
        //         productHtml += `<div class="detail__review__all">
        //             <div class="detail__review__avg">
        //                 <span>${Number(product.rating).toFixed(1)}</span><span>/</span><span>5</span>
        //             </div>
        //             <div class="detail__review__star">`;
        //             for (let s = 0; s < 5; s++) {
        //                 productHtml += `<span class="_icon-star-full ${s < product.rating ? 'active' : ''}"></span>`;
        //             }
        //         productHtml += `</div>
        //             <div class="detail__review__count"><span>100</span>Reviews</div>
        //         </div>`;
        //     }
        //     productHtml += `<div class="detail__review__write">
        //         <button class="detail__review__write btn-white">Write a rewiev</button>
        //     </div>`;
        //     productHtml += `</div>`;
        //     if (product.reviews){
        //         productHtml += ` <div class="detail__review__items">`;
        //         product.reviews.forEach(item => {
        //             productHtml += `<div class="detail__review__item" data-rid="${item.id}">
        //             <div class="detail__review__item_user">
        //                 <div class="detail__review__item_name"><span class="_icon-user"></span>
        //                     ${item.user}
        //                 </div>`;
        //                 if (item.purchase) {
        //                     productHtml += `<div class="detail__review__item_purchase">
        //                     <span class="_icon-shopping-bag"></span>
        //                     <p class="subtitle">Сonfirmed purchase</p>
        //                 </div>`;
        //                 }
        //             productHtml += `</div>
        //             <div class="detail__review__item_content">
        //                 <div class="detail__review_item_star">`;
        //                 for (let s = 0; s < 5; s++) {
        //                     productHtml += `<span class="_icon-star-full ${s < item.rating ? 'active' : ''}"></span>`;
        //                 }
        //                 productHtml += `</div>`;
        //                 productHtml += `<div class="detail__review__item_text">${item.text}</div>
        //                         <a href="" class="underline">Leave a comment</a>
        //                         <time datetime="2023-10-29">23 oct 2023</time>`;
        //             productHtml += `</div>`;
        //             productHtml += `</div>`;
        //         })
        //         productHtml += `</div>`;
        //     }
        //     productHtml += `<div class="detail__review__pagination pagination">
        //     <ul class="pagination__items">
        //         <li class="pagination__item"><span class="_icon-arrow-down"></span></li>
        //         <li class="pagination__item"><span>1</span></li>
        //         <li class="pagination__item"><span>2</span></li>
        //         <li class="pagination__item dots"><span>...</span></li>
        //         <li class="pagination__item"><span>10</span></li>
        //         <li class="pagination__item"><span class="_icon-arrow-down"></span></li>
        //     </ul>
        // </div>`;


        //     productHtml += `</div>`;
        //     productHtml += `</div>`;
        //     detail.innerHTML = productHtml;

    }
}