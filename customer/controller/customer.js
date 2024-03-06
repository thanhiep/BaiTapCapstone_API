const api = new Api();

function getEle(id) {
    return document.getElementById(id);
};

/**
 * get list product
 */

function getListProduct() {
    const type = getEle("inputType").value;
    let apple = [];
    let samsung = [];

    getEle("loader").style.display = "block";

    const promise = api.fetchData();
    promise
        .then(function (result) {
            const data = result.data;
            getEle("loader").style.display = "none";
            setLocalStorage(data);
            for (i = 0; i < data.length; i++) {
                const product = data[i]
                if (product.type == "iphone") {
                    apple.push(product)
                } else if (product.type == "Samsung") {
                    samsung.push(product)
                }
            }

            switch (type) {
                case "Apple":
                    renderUI(apple);
                    break;

                case "Samsung":
                    renderUI(samsung);
                    break;

                default:
                    renderUI(data);
                    break;
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}

getListProduct()


function setLocalStorage(arr) {
    const arrString = JSON.stringify(arr);
    localStorage.setItem("DSSP", arrString);
  }

  function getLocalStorage(name,arr) {
    if (!localStorage.getItem(name)) return;
   
    const arrString = localStorage.getItem(name);
   
    const arrJSON = JSON.parse(arrString);
    
    arr = arrJSON;
  }


/**
 * render UI
 */
function renderUI(data) {
    let content = "";

    data.forEach(function (product) {
        content += `
        <div class="col-12 col-lg-6">
        <div class="card cardPhone">
            <img src="${product.img}" class="card-img-top"
                alt="...">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h3 class="cardPhone__title">${product.name}</h3>
                        <p class="cardPhone__text">
                            Screen: ${product.screen}
                            <br>
                            Back Camera: ${product.backCamera}
                            <br>
                            Front Camera: ${product.frontCamera}
                            <br>
                            ${product.desc}
                        </p>
                    </div>
                    <div>
                        <h3 class="cardPhone__title">$${product.price}</h3>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="cardPhone__rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <div>
                        <button onclick="addCartItem(${product.id})" class="btnAddToCart"><i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                </div>
    
            </div>
        </div>
    </div>
        `
    });

    getEle("showProduct").innerHTML = content;
}


/**
 * add item to cart
 */
let cart = [];
function addCartItem(id){
    const promise = api.getProductById(id);
    promise
        .then(function(result){
            const data = (result.data);
            const cartItem = new CartItem(data.id,data.name,data.img,data.price)
            cart.push(cartItem)
            renderCartUI(cart);
        })
        .catch(function(error){
            console.log(error)
        })
}

/**
 * render UI cart
 */
function renderCartUI(cart){
    let content = "";
    cart.forEach(function(item,index){
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td> <img src="${item.img} "alt="..." width="30"></td>
                <td>$${item.price}</td>
                <td>
                    <button class="btnCartItem" type="button">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <span></span>
                    <button class="btnCartItem" type="button">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </td>
            </tr>
        `
    })
    getEle("tblCartBody").innerHTML = content;
}