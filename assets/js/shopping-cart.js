// Shopping Cart
window.onload = function() {
    const addToCart = document.getElementsByClassName('modal__btn');
    let items = [];

    for (let i = 0; i < addToCart.length; i++) {
        addToCart[i].addEventListener("click", function(e) {
            if (typeof(Storage) !== 'undefined') {
                let item = {
                    id: i + 1,
                    imgSrc: e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[0].src,
                    name: e.target.parentElement.parentElement.parentElement.parentElement.children[0].textContent,
                    price: e.target.parentElement.parentElement.parentElement.parentElement.children[1].children[0].textContent,
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
                    alert('Thêm thành công sản phẩm vào giỏ hàng');
                    window.location.reload();
                }

            } else {
                alert('local storage is not working on your browser');
            }
        });
    }

    
    // adding quantity to shopping cart icon
    const iconShoppingP = document.querySelector('.navbar__cart p');
    let no = 0;
    JSON.parse(localStorage.getItem('items')).map(data => {
        no = no + data.no;
    });
    iconShoppingP.innerHTML = no;

    //adding cartbox data in table
    const cardBoxTable = document.querySelector('.cart__tableBox');
    const cartTotal = document.querySelector('.cart__payment-sum');
    let tableData = '';
    let totalPrice = 0;
    tableData += 
    `<tr class="shoppingCart__item">
        <th class="th__product">Sản phẩm</th>
        <th class="quantity">Số lượng</th>
        <th class="linePrice">Tổng tiền</th>
        <th class="remove">Xóa</th>
    </tr>`;
    if (JSON.parse(localStorage.getItem('items'))[0] === undefined) {
        tableData += '<tr><td>Giỏ hàng trống!</td></tr>'
    } else {
        JSON.parse(localStorage.getItem('items')).map(data => {
            const itemPrice = data.price.split('.').join('');
            const totalPriceRow = itemPrice * data.no;
            const priceDot = totalPriceRow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            totalPrice += totalPriceRow;
            tableData +=
                `<tr class="shoppingCart__item cart__product">
                    <td class="cart__itemChild">
                        <div class="cart__itemChild-img">
                            <img src="${data.imgSrc}" alt="">
                        </div>
                        <div class="cart__itemChild-content">
                            <span class="cart__itemChild-name">${data.name}</span>
                            <span>${data.price}</span>
                            <span class="cart__idItem">${data.id}</span>
                        </div>
                    </td>
                    <td class="cart__row">
                        <div class="modal__quan-container">
                            <button class="modal__btn-quan modal__btn-prev">-</button>
                            <input type="text" class="modal__btn-quan" id="quantity" value="${data.no}" disabled>
                            <button class="modal__btn-quan modal__btn-next">+</button>
                        </div>
                    </td>
                    <td class="cart__row">
                        ${priceDot}<span>₫</span>
                    </td>
                    <td class="cart__row">
                        <i class="far fa-trash-alt" onclick="Delete(this)"></i>
                    </td>
                </tr>`;
            });
            // update table
            
    }
    cardBoxTable.innerHTML = tableData;
    cartTotal.innerText = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + "₫";
}

function Delete(e) {
    let items = [];
    JSON.parse(localStorage.getItem('items')).map(data => {
        if (data.id != e.parentElement.parentElement.children[0].children[1].children[2].textContent) {

            items.push(data);

        }
    });
    localStorage.setItem('items', JSON.stringify(items));
    window.location.reload();
    alert('Xóa thành công sản phẩm');
};