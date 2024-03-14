const api = new Api();

function getEle(id) {
    return document.getElementById(id);
};

/**
 * get list product
 */
function getListProduct() {
    const promise = api.fetchData();
    promise
        .then(function (result) {
            renderUI(result.data);
            setLocalStorage(result.data, "AdminSP")
        })
        .catch(function (error) {
            console.log(error);
        })
}
getListProduct();

/**
 * set local storage
 */
function setLocalStorage(arr, name) {
    const arrString = JSON.stringify(arr);
    localStorage.setItem(name, arrString);
}

/**
 * get local storage
 */
function getLocalStorage(name) {
    if (!localStorage.getItem(name)) return;

    const arrString = localStorage.getItem(name);

    return JSON.parse(arrString);
}

/**
 * add product
 */
getEle("btnThemSP").onclick = function () {
    getEle("tenSP").value = "";
    getEle("selectType").selected = 0;
    getEle("giaSP").value = "";
    getEle("screen").value = "";
    getEle("frontCam").value = "";
    getEle("backCam").value = "";
    getEle("hinhSP").value = "";
    getEle("moTa").value = "";

    getEle("modalHeader").innerHTML = "Thêm Sản Phẩm"
    getEle("modalFooter").innerHTML = `
        <button class="btn btn-success" onclick="addProduct()">Thêm</button>
    `
}

function addProduct() {
    const name = getEle("tenSP").value;
    const type = getEle("selectType").value;
    const price = getEle("giaSP").value;
    const screen = getEle("screen").value;
    const frontCamera = getEle("frontCam").value;
    const backCamera = getEle("backCam").value;
    const img = getEle("hinhSP").value;
    const desc = getEle("moTa").value;

    const product = new Product("", name, price, screen, frontCamera, backCamera, img, desc, type);

    const promise = api.addProduct(product)
    promise
        .then(function (result) {
            getListProduct();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error)
        })
}

/**
 * delete product
 */
function deleteProduct(id) {
    const promise = api.deleteProduct(id);
    promise
        .then(function (result) {
            getListProduct();
        })
        .catch(function (error) {
            console.log(error)
        })
}

/**
 * edit product
 */
function editProduct(id) {
    getEle("modalHeader").innerHTML = "Sửa Sản Phẩm"
    getEle("modalFooter").innerHTML = `
        <button class="btn btn-success" onclick="updateProduct(${id})">Cập Nhật</button>
    `
    const promise = api.getProductById(id)
    promise
        .then(function (result) {
            const product = result.data;
            getEle("tenSP").value = product.name;
            getEle("selectType").value = product.type;
            getEle("giaSP").value = product.price;
            getEle("screen").value = product.screen;
            getEle("frontCam").value = product.frontCamera;
            getEle("backCam").value = product.backCamera;
            getEle("hinhSP").value = product.img;
            getEle("moTa").value = product.desc;
        })
        .catch(function (error) {
            console.log(error)
        })
}

function updateProduct(id) {
    const name = getEle("tenSP").value;
    const type = getEle("selectType").value;
    const price = getEle("giaSP").value;
    const screen = getEle("screen").value;
    const frontCamera = getEle("frontCam").value;
    const backCamera = getEle("backCam").value;
    const img = getEle("hinhSP").value;
    const desc = getEle("moTa").value;

    const product = new Product(id, name, price, screen, frontCamera, backCamera, img, desc, type);

    const promise = api.updateProduct(product)
    promise
        .then(function (result) {
            getListProduct()
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (result) {
            console.log(error)
        })
}




/**
 * render UI
 */
function renderUI(data) {
    let content = "";
    data.forEach(function (product, index) {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.type}</td>
                <td>$${product.price}</td>
                <td><img src="${product.img}" width="50"></td>
                <td>
                Screen: ${product.screen}
                <br>
                Front Camera: ${product.frontCamera}
                <br>
                Back Camera: ${product.backCamera}
                <br>
                ${product.desc}
                </td>
                <td>
                    <button class="btn btn-info" onclick="editProduct(${product.id})" data-toggle="modal" data-target="#myModal">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `
    })
    getEle("tblDanhSachSP").innerHTML = content;
}


/**
 * search product
 */
let listProduct = getLocalStorage("AdminSP")
getEle("txtSearch").addEventListener("keyup", function () {
    // Lấy từ khóa tìm kiếm
    const keyword = getEle("txtSearch").value;
    let searchArr = [];
    listProduct.forEach(function (product) {
        const keywordLowerCase = keyword.toLowerCase();
        const productLowerCase = product.name.toLowerCase();
        if (productLowerCase.indexOf(keywordLowerCase) !== -1) {
            searchArr.push(product);
        }
    })
    renderUI(searchArr);
});