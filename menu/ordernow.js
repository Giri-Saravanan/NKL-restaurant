const toggle = document.getElementById('menu-toggle');
const nav = document.querySelector('header nav');

toggle.addEventListener('click', ()=> {
    nav.classList.toggle('active');
});

// let iconCart = document.querySelector('.iconCart'); 
// let carttab = document.querySelector('.carttab');
// let container = document.querySelector('.container');
// let close = document.querySelector('.close');

// iconCart.addEventListener('click', ()=>{
//     if(carttab.style.right == '-100%'){
//         carttab.style.right = '0';
//         container.style.transform = 'translateX(-400px)';
//     }
//     else{
//         carttab.style.right = '-100%';
//         container.style.transform = 'translateX(0)';
//     }
// })

// close.addEventListener('click', ()=>{
//     carttab.style.right = '-100%';
//         container.style.transform = 'translateX(0)';
// })

// let product= null;
// // get data from json file
// fetch('product.json')
// .then(response => response.json())
// .then(data => {
//     product = data;
//     addDataToHTML();
// })

// // show data in list html 
// function addDataToHTML(){
//     let listProductHTML = document.querySelector('.listproduct')
//     listProductHTML.innerHTML = '';

// // add new data 
//     if(product != null){
//         product.forEach(product => {
//             let newProduct = document.createElement('div');
//             newProduct.classList.add('item');
//             newProduct.innerHTML = 
//             `<img src="${product.image}" alt=""  width=200px" height="230px">
//             <h2>${product.name}</h2>
//             <div class="price">${product.price}</div>
//             <button onclick="addcart(${product.id})" class="addcart">
//                 Add To Cart
//             </button>`;
//             listProductHTML.appendChild(newProduct);
//         });
//     }
// }

// let listcart=[];
// function checkCart(){
//     var cookieValue = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('listCart'));

//     if(cookieValue) {
//         listcart = JSON.parse(cookieValue.split('=')[1]);
//     }
// }
// checkCart();

// function addcart($idproduct){
//     let productCopy = JSON.parse(JSON.stringify(product));

//     if (!listcart[$idproduct]) {
//         let dataProduct = productCopy.filter(
//             product => product.id == $idproduct
//         )[0]        

//         listcart[$idproduct] = dataProduct;
//         listcart[$idproduct].quantity = 1;
//     }
//     else{
//         listcart[$idproduct].quantity++;
//     }

//     let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
//     document.cookie = "listCart"+JSON.stringify(listcart)+"; "+timeSave+"; path=/;"
// }

let iconCart = document.querySelector('.iconCart'); 
let carttab = document.querySelector('.carttab');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', () => {
    if(carttab.style.right == '-100%'){
        carttab.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    } else {
        carttab.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
});

close.addEventListener('click', () => {
    carttab.style.right = '-100%';
    container.style.transform = 'translateX(0)';
});

let product = null;
let listcart = [];

// get data from JSON file
fetch('product.json')
.then(response => response.json())
.then(data => {
    product = data;
    addDataToHTML();
    checkCart();
    renderCart();
})

// show product list
function addDataToHTML(){
    let listProductHTML = document.querySelector('.listproduct');
    listProductHTML.innerHTML = '';

    if(product != null){
        product.forEach(p => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${p.image}" width="200" height="230">
                <h2>${p.name}</h2>
                <div class="price">Rs.${p.price}</div>
                <button onclick="addcart(${p.id})" class="addcart">
                    Add To Cart
                </button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}

function updateCartIcon(){
    let cartCount = listcart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.iconCart span').innerText = cartCount;
}


// check cart from cookies
function checkCart(){
    let cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));

    if(cookieValue){
        listcart = JSON.parse(cookieValue.split('=')[1]);
    }
    updateCartIcon();
}

// add product to cart
function addcart(id){
    let item = product.find(p => p.id == id);

    let existing = listcart.find(p => p.id == id);
    if(existing){
        existing.quantity++;
    } else {
        let newItem = {...item,price: Number(item.price), quantity: 1};
        listcart.push(newItem);
    }

    saveCart();
    renderCart();
    updateCartIcon();
}

// render cart items (match your HTML)
function renderCart(){
    let cartList = document.querySelector('.listcart');
    cartList.innerHTML = '';

    listcart.forEach(item => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('cartitem');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="">
            <div class="content">
                <div class="name">${item.name}</div>
                <div class="cartprice">Rs.${item.price * item.quantity}</div>
            </div>
            <div class="quantity">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span class="value">${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        `;

        cartList.appendChild(cartItem);
    });
}

// change quantity (+/-)
function changeQuantity(id, change){
    let item = listcart.find(p => p.id == id);

    if(item){
        item.quantity += change;

        if(item.quantity <= 0){
            listcart = listcart.filter(p => p.id != id);
        }
    }

    saveCart();
    renderCart();
    updateCartIcon();
}

// save cart to cookies
function saveCart(){
    let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
    document.cookie = "listCart=" + JSON.stringify(listcart) + "; " + timeSave + "; path=/;";
}
