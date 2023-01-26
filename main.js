// router code ########################################
const allPages = document.getElementById("allPages");
const { products, cart, login, detail } = allPages.children;

const pages = {
    products,
    cart,
    login,
    detail
};

const selectPage = (event, showPage) => {
    event.preventDefault();
    for (const page in pages) {
        pages[page].style.display = "none";
    }
    pages[showPage].style.display = "block";
};

// ########################################################
const productContainer = document.querySelector(".product-container");
const cartIcon = document.querySelector(".fa-cart-shopping");
const cartProductContainer = document.querySelector(".cart__product-container");
const cartTotal = document.getElementById("cart__total");
const cartPayBtn = document.querySelector(".cart__pay-btn");

let shoppingCart = [];
const productsData = [
    { id: 1, title: "cool car1", price: 12000 },
    { id: 2, title: "cool car2", price: 11000 },
    { id: 3, title: "cool car3", price: 10000 },
    { id: 4, title: "cool car4", price: 9000 },
    { id: 5, title: "cool car5", price: 8000 },
    { id: 6, title: "cool car6", price: 7000 }
];

const updateCart = () => {
    cartProductContainer.innerHTML = cartPopulate();
    cartIcon.innerHTML = `${shoppingCart.length}`;
    cartTotal.innerHTML = `Total: $${cartTotalCalc(shoppingCart)}`;
    cartPayBtn.disabled = !shoppingCart.length;
};

const cartTotalCalc = (allProducts) => {
    return allProducts.reduce((accumulator, product) => {
        return accumulator + product.price * product.count;
    }, 0);
};
const addProductToCart = (productId) => {
    let product = productsData.find((product) => product.id === productId);
    let is_productInCart = shoppingCart.find(
        (product) => product.id === productId
    );
    if (!is_productInCart) {
        shoppingCart.unshift({ ...product, count: 1 });
    }

    updateCart();
};

const removeProductFromCart = (productId) => {
    shoppingCart = shoppingCart.filter((product) => product.id !== productId);
    updateCart();
};

const changeProductInCart = (event, productId) => {
    let is_productInCart = shoppingCart.find(
        (product) => product.id === productId
    );
    is_productInCart.count = event.target.value;
    cartTotal.innerHTML = `Total: $${cartTotalCalc(shoppingCart)}`;
    cartPayBtn.disabled = !shoppingCart.length;
};
const productsPopulate = productsData
    .map((product) => {
        return `<div class="product-card">
                <img src="img/car2.webp" alt="product image" />
                <div class="product-card-info">
                    <h3>${product.title}</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Ducimus, ullam?
                    </p>
                    <p>$${product.price}</p>
                    <button onclick="addProductToCart(${product.id})" class="btn btn-aqua product__add-btn">
                        Add to cart
                    </button>
                </div>
            </div>`;
    })
    .join("");

const cartPopulate = () => {
    return shoppingCart
        .map((item) => {
            let is_productAvailabel = productsData.find(
                (product) => product.id === item.id
            );
            if (is_productAvailabel) {
                return `
            <div class="product-card">
                <img src="img/car2.webp" alt="product image" />
                <div class="product-card-info">
                    <h3>${item.title}</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Ducimus, ullam?
                    </p>
                    <div class="product-card-price">
                    <p>Price: $${item.price}</p>
                    <p>X</p>
                    <input type="number" onchange="changeProductInCart(event, ${item.id})" name="number" id="number" min="1" value="1">
                    </div>
                </div>
                <button onclick="removeProductFromCart(${item.id})" class="btn">remove</button>
            </div>
            `;
            } else {
                return `
                <div class="product-card">
                    <img src="img/car2.webp" alt="product image" />
                    <div class="product-card-info">
                        <h3>Product Not Availabel</h3>
                    </div>
                    <button class="btn">remove</button>
                </div>
            `;
            }
        })
        .join("");
};

productContainer.innerHTML = productsPopulate;
updateCart()
