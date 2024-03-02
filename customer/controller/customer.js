const api = new Api();

function getEle(id) {
    return document.getElementById(id);
};

/**
 * get list product
 */
function getListProduct() {
   
    const promise = api.fetchData();
    getEle("loader").style.display = "block";
    promise
        .then(function (result) {
            const data = result.data;
            renderUI(data);
            getEle("loader").style.display = "none";
        })
        .catch(function (error) {
            console.log(error)
        })
}
getListProduct()


/**
 * Choose type
 */
function chooseType() {
    const type = getEle("inputType").value;
    let listProduct = [];
    let iphone = [];
    let samsung = [];
    
    const promise = api.fetchData();
    getEle("loader").style.display = "block";
    promise
        .then(function (result) {
            const data = result.data;
            getEle("loader").style.display = "none";

            listProduct = data;
            for (i = 0; i < listProduct.length; i++) {
                const product = listProduct[i]
                if (product.type == "iphone") {
                    iphone.push(product)
                } else if (product.type == "Samsung") {
                    samsung.push(product)
                }
            }

            switch (type) {
                case "iPhone":
                    renderUI(iphone);
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
                        <button class="btnAddToCart"><i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                </div>
    
            </div>
        </div>
    </div>
        `
    });

    getEle("showProduct").innerHTML = content;
}