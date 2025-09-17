let iconCart = document.querySelector('.iconCart'); 
let carttab = document.querySelector('.carttab');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', ()=>{
    if(carttab.style.right == '-100%'){
        carttab.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }
    else{
        carttab.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})

close.addEventListener('click', ()=>{
    carttab.style.right = '-100%';
        container.style.transform = 'translateX(0)';
})

let product= null;
// get data from json file
fetch('product.json')
.then(response => response.json())
.then(data => {
    product = data;
    addDataToHTML();
})

// show data in list html 
function addDataToHTML(){
    let listProductHTML = document.querySelector('.listproduct')
    listProductHTML.innerHTML = '';

// add new data 
    if(product != null){
        product.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('items');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt=""  width="300px" height="350px">
            <h2>${product.name}</h2>
            <div class="price">${product.price}</div>
            <button onclick="addcart(${product.id})" class="addcart">
                Add To Cart
            </button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}

let listcart=[];
function addcart($idproduct){
    
}