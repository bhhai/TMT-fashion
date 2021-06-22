var slideIndex = 1;
showSlides(slideIndex);


// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}








// Modal

var popupViews = document.querySelectorAll('.product__modal');
var popupBtns = document.querySelectorAll('.icon__hover3');
var closeBtns = document.querySelectorAll('.modal__close');
var overlay = document.querySelector(".product__overlay");

//javascript for quick view button
var popup = function(popupClick) {
    popupViews[popupClick].classList.add('modal__active');
    overlay.classList.add("modal__active");
    document.getElementsByTagName("body")[0].style.overflow = "hidden";

    // Change img in popup
    var childrens = popupViews[popupClick].querySelector(".modal__change-img").children;
    var imgMain = popupViews[popupClick].querySelector(".pro__main-im");
    var imgDiv = popupViews[popupClick].querySelectorAll(".modal__ch");

    imgDiv.forEach((item) => {
        item.addEventListener("click", function(event) {
            imgMain.src = event.target.src;
        })
    })

}

popupBtns.forEach((popupBtn, i) => {
    popupBtn.addEventListener("click", () => {
        popup(i);
    });
});


// overlay button
overlay.addEventListener("click", () => {
    overlay.classList.remove("modal__active");
    popupViews.forEach((popupView) => {
        popupView.classList.remove('modal__active');
        overlay.classList.remove("modal__active");
        document.getElementsByTagName("body")[0].style.overflow = "auto";
    });
})

//javascript for close button
closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
        popupViews.forEach((popupView) => {
            popupView.classList.remove('modal__active');
            overlay.classList.remove("modal__active");
            document.getElementsByTagName("body")[0].style.overflow = "auto";
        });
    });
});


//scroll AOS

// function scrollApear() {
//     var introText = document.querySelector(".scale");
//     var introPosition = introText.getBoundingClientRect().top;
//     var screenPosition = window.innerHeight / 1.3;

//     if (introPosition < screenPosition) {
//         introText.classList.add("ani__scale")
//     }
// }

// window.addEventListener("scroll", scrollApear)

const shoppingIcon = document.querySelector('.navbar__cart');
const shoppingCart = document.querySelector('.shopping__cart');


// Shopping Cart
window.onload = function() {
    const addToCart = document.getElementsByClassName('icon__hover1');
    const modalBtnAdd = document.getElementsByClassName('modal__btn');
    let items = [];
    for (let i = 0; i < addToCart.length; i++) {
        addToCart[i].addEventListener("click", function(e) {
            if (typeof(Storage) !== 'undefined') {
                let item = {
                    id: i + 1,
                    imgSrc: e.target.parentElement.parentElement.parentElement.children[0].children[0].children[1].src,
                    name: e.target.parentElement.parentElement.parentElement.children[0].children[1].children[0].textContent,
                    price: e.target.parentElement.parentElement.parentElement.children[0].children[1].children[1].children[0].textContent,
                    no: 1
                };
                if (JSON.parse(localStorage.getItem('items')) === null) {
                    items.push(item);
                    localStorage.setItem("items", JSON.stringify(items));
                    window.location.reload();
                } else {
                    const localItems = JSON.parse(localStorage.getItem("items"));
                    localItems.map(data => {
                        if (item.id == data.id) {
                            item.no = data.no + 1;
                        } else {
                            items.push(data);
                        }
                    });
                    items.push(item);
                    localStorage.setItem('items', JSON.stringify(items));
                    window.location.reload();
                    alert('Thêm thành công sản phẩm vào giỏ hàng');
                }

            } else {
                alert('local storage is not working on your browser');
            }
        });
    }

    // Modal btn ADD
    for (let i = 0; i < modalBtnAdd.length; i++) {
        modalBtnAdd[i].addEventListener("click", function(e) {
            if (typeof(Storage) !== 'undefined') {
                let item = {
                    id: i + 1,
                    imgSrc: e.target.parentElement.parentElement.parentElement.children[1].children[0].children[0].src,
                    name: e.target.parentElement.parentElement.children[0].textContent,
                    price: e.target.parentElement.parentElement.children[1].children[0].textContent,
                    no: 1
                };
                if (JSON.parse(localStorage.getItem('items')) === null) {
                    items.push(item);
                    localStorage.setItem("items", JSON.stringify(items));
                    window.location.reload();
                } else {
                    const localItems = JSON.parse(localStorage.getItem("items"));
                    localItems.map(data => {
                        if (item.id == data.id) {
                            item.no = data.no + 1;
                        } else {
                            items.push(data);
                        }
                    });
                    items.push(item);
                    localStorage.setItem('items', JSON.stringify(items));
                    window.location.reload();
                    alert('Thêm thành công sản phẩm vào giỏ hàng');
                }

            } else {
                alert('local storage is not working on your browser');
            }
        });
    }

    // adding data to shopping cart 
    const iconShoppingP = document.querySelector('.navbar__cart p');
    let no = 0;
    JSON.parse(localStorage.getItem('items')).map(data => {
        no = no + data.no;
    });
    iconShoppingP.innerHTML = no;

    
}


var slider = document.getElementById('brand-slider');
var btnRight = document.getElementById('btn-right');
var btnLeft = document.getElementById('btn-left');

btnRight.addEventListener('click', function() {
    slider.scrollLeft += slider.scrollWidth / 8;
})

btnLeft.addEventListener('click', function() {
    slider.scrollLeft -= slider.scrollWidth / 8;
})