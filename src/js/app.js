import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, Parallax, EffectCreative, Thumbs, FreeMode } from 'swiper/modules';
Swiper.use([Navigation, Pagination, Autoplay, Parallax, EffectCreative, Thumbs, FreeMode]);

import fslightbox from "fslightbox";

const devices = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini', "i");

const isMobile = {
    Android: function () {
        return navigator.userAgent.match('/Android/i')
    },
    BlackBerry: function () {
        return navigator.userAgent.match('/BlackBerry/i')
    },
    iOS: function () {
        return navigator.userAgent.match('/iPhone|iPad|iPod/i')
    },
    Opera: function () {
        return navigator.userAgent.match('/Opera Mini/i')
    },
    Windows: function () {
        return navigator.userAgent.match('/IEMobile/i')
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}
let routes = {};
let templates = {};

function route(path, template) {
    if (typeof template === 'function') {
        return routes[path] = template;
    }
    else if (typeof template === 'string') {
        return routes[path] = templates[template];
    } else {
        return;
    };
};

function template(name, templateFunction) {
    return templates[name] = templateFunction;
};

template('index', function () {
    index();
});

template('checkout', function () {
    checkout();
});


template('detail', function () {
    detail();
});

// route('/dist/index.html', 'index');
// route('/dist/checkout.html', 'checkout');
route('/', 'index');
route('/checkout.html', 'checkout');
route('/detail.html', 'detail');

function resolveRoute(route) {
    try {
        return routes[route];
    } catch (e) {
        throw new Error(`Route ${route} not found`);
    };
};

function router(evt) {
    // let url = window.location.hash.slice(1) || '/';
    let url = window.location.pathname;
    let route = resolveRoute(url);

    route();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

import { addCart, addProductToCartHtml, updateCartSum } from "./cart.js";

function openMenu() {
    document.querySelector('body').classList.toggle('lock');
    document.querySelector('.icon-menu').classList.toggle('active');
    document.querySelector('.main-menu').classList.toggle('active');
    var disabled = document.querySelector('.search-btn').disabled;
    document.querySelector('.search-btn').disabled = !disabled;
}
// function closeForm() {
//     document.querySelector('.signin__form').remove('active');
//     document.querySelector('.signup__form').remove('active');
//     document.querySelector('.login__form__wrapper').remove('active');
//     document.querySelector('body').classList.remove('lock');
// }

function logIn(){
    
    let formContainer = document.querySelector('.login__form__wrapper');
    let passwordField = document.querySelectorAll('input[type=password]');
    formContainer.addEventListener('click', (e) => {
        passwordField.forEach(item => {
            let icon = item.nextElementSibling;
            if (item !== e.target) {
                icon.classList.remove('active');
                icon.classList.replace('_icon-eye', '_icon-eye-blocked');
                item.type = "password";
                item.classList.remove('focus');
            }
        })
    })
    passwordField.forEach(item => {
        item.addEventListener('click', () => {
            let icon = item.nextElementSibling;
            if (item === document.activeElement) {
                icon.classList.add('active');
                item.classList.add('focus');
            }
        })
    })
    let icon = document.querySelectorAll('.login__form ._icon');
    icon.forEach(item => {
        let passwordField = item.previousElementSibling;
        item.addEventListener('click', (e) => {
            if (passwordField.type === 'password') {
                passwordField.type = "text";
                item.classList.replace('_icon-eye-blocked', '_icon-eye');
            }
            else {
                passwordField.type = "password";
                item.classList.replace('_icon-eye', '_icon-eye-blocked');
            }
            e.stopPropagation();
        })
    })

    let signinForm = document.querySelector('.signin__form');
    let signupForm = document.querySelector('.signup__form');
    let accountEnterBtn = document.querySelector('.account__enter');

    accountEnterBtn.addEventListener('click', (e) => {
        document.querySelector('body').classList.add('lock');
        signinForm.classList.add('active');
        formContainer.classList.add('active');
        e.preventDefault();
    })

    document.querySelectorAll('.login__form__link').forEach(item => {
        item.addEventListener('click', (e) => {
            signinForm.classList.toggle('active');
            signupForm.classList.toggle('active');
            e.preventDefault();
        })
    })

    document.querySelectorAll('.login__form__close').forEach(item => {
        item.addEventListener('click', () => {
            signinForm.classList.remove('active');
            signupForm.classList.remove('active');
            formContainer.classList.remove('active');
            document.querySelector('body').classList.remove('lock');
        })
        // item.addEventListener('click', closeForm);
    })
}


window.addEventListener('DOMContentLoaded', () => {

    let formSearch = document.querySelector('.search-form');
    let inputSearch = document.querySelector('#search');
    let iconSearch = document.querySelector('.search-btn');
    //let iconCross = document.querySelectorAll('.search-icon')[1];
    let accountCartWrapper = document.querySelector('.account__cart__wrapper');

    iconSearch.addEventListener('click', () => {
        formSearch.classList.toggle('active');
    })
    inputSearch.addEventListener('blur', () => {
        inputSearch.value = '';
    })
    document.addEventListener("mouseup", function (event) {
        if (!formSearch.contains(event.target)) {
            formSearch.classList.remove('active');
            inputSearch.blur();
        }
        if (window.innerWidth > 768) {
            let itemHover = document.querySelector('.main-menu__item._hover');
            if (itemHover !== null) itemHover.classList.remove('_hover');
        }
        if (!accountCartWrapper.contains(event.target) && !event.target.classList.contains('_icon-cart')) {
            accountCartWrapper.classList.remove('active');
        }
        if (document.body.classList.contains('_touch')) {
            accountCartWrapper.querySelectorAll('a').forEach(item => {
                if (item.contains(event.target)) {
                    accountCartWrapper.classList.remove('active');
                }
            })
        }
    });

    document.querySelector('.icon-menu').addEventListener('click', () => {
        openMenu();
    })
    document.querySelectorAll('.main-menu__link').forEach(item => {
        item.onclick = () => {
            if (document.querySelector('body').classList.contains('lock')) openMenu();
        }
    })
    document.querySelectorAll('.sub-menu__link').forEach(item => {
        item.onclick = () => {
            if (document.querySelector('body').classList.contains('lock')) openMenu();
        }
    })
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.querySelector('body').classList.contains('lock')) {
            openMenu();
            // closeForm();
        }
    });

    if (devices.test(navigator.userAgent)) {
        document.querySelector('.account__cart a').addEventListener('click', (e) => {
            e.preventDefault();
            accountCartWrapper.classList.toggle('active');
        })
    }

    if (devices.test(navigator.userAgent)) {
        document.body.classList.add('_touch');
        document.querySelectorAll('.main-menu__item ._icon-arrow-down').forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth > 768) {
                    let itemHover = document.querySelector('.main-menu__item._hover');
                    if (itemHover !== null /*&& itemHover !== item.parentElement*/) itemHover.classList.remove('_hover');
                }
                item.parentElement.classList.toggle('_hover');
            })
        })
    }
    else {
        document.body.classList.add('_mouse');
    }

    document.querySelectorAll('.footer ._icon-arrow-down').forEach(item => {
        item.addEventListener('click', () => {
            item.parentElement.classList.toggle('_hover');
        })
    })

    // Change header height

    let callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                document.querySelector('.header__container').classList.remove('_scroll');
            }
            else {
                document.querySelector('.header__container').classList.add('_scroll');
            }
        });
    };
    let options = {
        // root: null,
        // rootMargin: "40px",
        threshold: 0,
        // threshold: [0, 1],
    };
    let observer = new IntersectionObserver(callback, options);
    let page = document.querySelector(".header");
    observer.observe(page);


    const header = document.querySelector('.header');
    header.querySelector('.account__cart').classList.add('has-dropdown');
    addProductToCartHtml();
    updateCartSum();

    logIn();

})




import { getCurrentPage, setCurrentPage, getPageCount, loadProducts, getInStore } from "./products.js";


function index() {


    const swiperHome = new Swiper('.home__swiper', {
        spaceBetween: 32,
        slidesPerView: 1,
        loop: true,
        loopedSlides: 2,
        centeredSlides: true,
        parallax: true,
        speed: 800,
        autoplay: {
            delay: 3000,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: ".home__pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".home .arrows-right",
            prevEl: ".home .arrows-left",
        },

    });

    const swiperTips = new Swiper('.tips__swiper', {
        spaceBetween: 32,
        slidesPerView: 3,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 24
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 32
            },
        },
        pagination: {
            el: ".tips__pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".tips .arrows-right",
            prevEl: ".tips .arrows-left",
        },

    });

    const swiperInspiration = new Swiper('.inspiration__swiper', {
        spaceBetween: 24,
        slidesPerView: 2.6,
        loop: true,

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16
            },
            480: {
                slidesPerView: 1.4,
                spaceBetween: 16
            },
            640: {
                slidesPerView: 2.2,
                spaceBetween: 16
            },
            769: {
                slidesPerView: 1.6,
                spaceBetween: 16
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 24
            },
            1200: {
                slidesPerView: 2.2,
                spaceBetween: 24
            },
            1440: {
                slidesPerView: 2.6,
                spaceBetween: 24
            },
        },
        parallax: true,
        speed: 800,
        pagination: {
            el: ".inspiration__pagination",
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 1,
        },
        navigation: {
            nextEl: ".inspiration .arrows-right",
            prevEl: ".inspiration .arrows-left",
        },
    });

    // Change element place in DOM
    function expirienceChangeView() {
        // let homeBody = document.querySelector('.home__body');
        // let homeHeader = document.querySelector('.home__header');
        // let homeButton = document.querySelector('.home__header .home__button');
        if (window.matchMedia("(max-width: 992px)").matches) {
            document.querySelector('.home__body').insertAdjacentElement('afterend', document.querySelector('.home__button'));
        }
        else {
            document.querySelector('.home__header').insertAdjacentElement('beforeend', document.querySelector('.home__button'));
        }

        if (window.matchMedia("(max-width: 768px)").matches) {
            document.querySelector('.inspiration__content').insertAdjacentElement('afterend', document.querySelector('.inspiration__button'));
        }
        else {
            document.querySelector('.inspiration__text').insertAdjacentElement('beforeend', document.querySelector('.inspiration__button'));
        }
    }

    expirienceChangeView();
    window.addEventListener('resize', expirienceChangeView);

    // Gallary horizontal scroll on mouse move

    // if (!isMobile.any()) {
    if (!devices.test(navigator.userAgent)) {
        const scrollContainer = document.querySelector('.furniture__container');
        const gallary = document.querySelector('.furniture__gallary');
        scrollContainer.addEventListener('mousemove', (e) => {
            const percent = e.clientX / window.innerWidth;
            gallary.animate({
                transform: `translateX(${percent * (gallary.offsetWidth - window.innerWidth) * -1}px)`,
            }, {
                fill: 'forwards',
                duration: 5000,
            })
        })
    }

    const handleButtonStatus = () => {
        if (getPageCount() === getCurrentPage()) {
            document.querySelector('.product__more__btn').setAttribute("disabled", true);
        }
    };

    loadProducts();
    handleButtonStatus();

    // Load addition products
    document.querySelector('.product__more__btn').addEventListener('click', () => {
        setCurrentPage();
        loadProducts();
        handleButtonStatus();
    })


    // Login Form

    // let formContainer = document.querySelector('.login__form__wrapper');
    // let passwordField = document.querySelectorAll('input[type=password]');
    // formContainer.addEventListener('click', (e) => {
    //     passwordField.forEach(item => {
    //         let icon = item.nextElementSibling;
    //         if (item !== e.target) {
    //             icon.classList.remove('active');
    //             icon.classList.replace('_icon-eye', '_icon-eye-blocked');
    //             item.type = "password";
    //             item.classList.remove('focus');
    //         }
    //     })
    // })
    // passwordField.forEach(item => {
    //     item.addEventListener('click', () => {
    //         let icon = item.nextElementSibling;
    //         if (item === document.activeElement) {
    //             icon.classList.add('active');
    //             item.classList.add('focus');
    //         }
    //     })
    // })
    // let icon = document.querySelectorAll('.login__form ._icon');
    // icon.forEach(item => {
    //     let passwordField = item.previousElementSibling;
    //     item.addEventListener('click', (e) => {
    //         if (passwordField.type === 'password') {
    //             passwordField.type = "text";
    //             item.classList.replace('_icon-eye-blocked', '_icon-eye');
    //         }
    //         else {
    //             passwordField.type = "password";
    //             item.classList.replace('_icon-eye', '_icon-eye-blocked');
    //         }
    //         e.stopPropagation();
    //     })
    // })

    // let signinForm = document.querySelector('.signin__form');
    // let signupForm = document.querySelector('.signup__form');
    // let accountEnterBtn = document.querySelector('.account__enter');

    // accountEnterBtn.addEventListener('click', (e) => {
    //     document.querySelector('body').classList.add('lock');
    //     signinForm.classList.add('active');
    //     formContainer.classList.add('active');
    //     e.preventDefault();
    // })

    // document.querySelectorAll('.login__form__link').forEach(item => {
    //     item.addEventListener('click', (e) => {
    //         signinForm.classList.toggle('active');
    //         signupForm.classList.toggle('active');
    //         e.preventDefault();
    //     })
    // })

    // document.querySelectorAll('.login__form__close').forEach(item => {
    //     item.addEventListener('click', () => {
    //         signinForm.classList.remove('active');
    //         signupForm.classList.remove('active');
    //         formContainer.classList.remove('active');
    //         document.querySelector('body').classList.remove('lock');
    //     })
    //     // item.addEventListener('click', closeForm);
    // })
}

import { addProductToCheckoutHtml, updateCheckoutSum } from "./checkout.js";
import { customSelect } from "./select.js";


function checkout() {
    const header = document.querySelector('.header');
    header.querySelector('.account__cart').classList.remove('has-dropdown');
    addProductToCheckoutHtml();
    updateCheckoutSum();
    updateCartSum();
    document.querySelector('.cart__discount p').addEventListener('click', () => {
        let form = document.querySelector('.cart__discount__form');
        form.classList.toggle('open');
        if (!form.classList.contains('open')) {
            form.querySelector('#cart__discount').value = '';
        }
    })
    customSelect();
}

function detail() {

    let tabs = document.querySelectorAll('.detail__description__tab');
    tabs.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.detail__description__tab.active').classList.remove('active');
            document.querySelector('.detail__description__info__tab.active').classList.remove('active');
            item.classList.add('active');
            const info = item.dataset['detail'];
            document.querySelector(`.detail__description__info__tab.detail__${info}`).classList.add('active');
        })
    })
    const swiperDetailThumbs = new Swiper(".detail__swiper__thumbs", {
        spaceBetween: 10,
        slidesPerView: "auto",
        freeMode: true,
        watchSlidesProgress: true,
        watchOverflow: true,
        breakpoints: {
            662: {
                direction: "vertical",
            },
            992: {
                // slidesPerView: 3,
                direction: "horizontal",
            },
        },
    });
    const swiperDetail = new Swiper('.detail__swiper', {
        spaceBetween: 32,
        slidesPerView: 1,
        breakpoints: {
            320: {
                spaceBetween: 16
            },
            480: {
                spaceBetween: 20
            },
            640: {
                spaceBetween: 24
            },
            992: {
                spaceBetween: 32
            },
        },
        // pagination: {
        //     el: ".detail__pagination",
        //     clickable: true,
        // },
        navigation: {
            nextEl: ".detail .arrows-right",
            prevEl: ".detail .arrows-left",
        },
        thumbs: {
            swiper: swiperDetailThumbs,
        },
    });

    // Change element place in DOM
    function expirienceChangeView() {
        if (window.matchMedia("(max-width: 992px)").matches) {
            document.querySelector('.detail__info').insertAdjacentElement('afterend', document.querySelector('.detail__swiper__container'));
        }
        else {
            document.querySelector('.detail').insertAdjacentElement('afterbegin', document.querySelector('.detail__swiper__container'));
        }
        // if (window.matchMedia("(min-width: 663px)").matches && window.matchMedia("(max-width: 992px)").matches) {
        //     document.querySelector('.detail__swiper').insertAdjacentElement('beforeend', document.querySelector('.detail__swiper__container .swiper__arrows'));
        // }
        // else {
        //     document.querySelector('.detail__swiper').insertAdjacentElement('afterend', document.querySelector('.detail__swiper__container'));
        // }
    }

    expirienceChangeView();
    window.addEventListener('resize', expirienceChangeView);

    document.querySelector('.detail__buy__btn').addEventListener('click', () => {
        addCart(Number(document.querySelector('.detail').getAttribute("data-pid")), 
                Number(document.querySelector('.detail .cart__item__count span').innerHTML));
    });

    document.querySelectorAll('.cart__item__count button').forEach(btn => {
        btn.addEventListener('click', async () => {
            let ID = Number(document.querySelector('.detail').getAttribute("data-pid"));
            let countSpan = btn.closest('.cart__item__count').querySelector('span');
            let quaintity = Number(countSpan.innerHTML);
            let inStore = await getInStore(ID);

            if (btn.classList.contains('cart-dec')) {
                if (quaintity > 1) {
                    countSpan.innerHTML = --quaintity;
                }
            } else {
                if (quaintity < inStore) {
                    countSpan.innerHTML = ++quaintity;
                }
            }
        });
    })
}

