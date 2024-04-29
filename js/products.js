import { PRODUCTS } from "./const.js";

export { PRODUCTS } from "./const.js";
const API_URL = "https://dummyjson.com";
const loginBtn = document.querySelector(".loginBtn");
const formCard = document.querySelector(".form__card");
const productsCards = document.querySelector(".products__cards");
const seeMoreBtn = document.querySelector(".seeMoreBtn");
const form = document.querySelector(".form");
const products = document.querySelector(".products");
const formBtndelete = document.querySelector(".formBtndelete");
const selectProducts = document.querySelector(".select__products");
const inputSelect = document.querySelector(".input__select");
const formDelete = document.querySelector(".form__delete");
const countShop = document.querySelector(".count");

const username = document.querySelector(".username");
const password = document.querySelector(".password");

let limitProducs = 8;
let count = 1;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let product = {
    username: username.value,
    password: password.value,
  };
  logIn(product);
});

async function logIn(product) {
  await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.message === "Invalid credentials") {
        return alert("Malumot xato kiritildi");
      }
      localStorage.setItem("x-auth-token", res.token);
      window.open("./pages/admin.html", "_self");
    })
    .catch((err) => console.log(err));
}

async function apiProduct(url) {
  let producData = await fetch(`${url}/products?limit=${limitProducs * count}`);
  producData
    .json()
    .then((res) => mapProductData(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
      seeMoreBtn.innerHTML = "See more";
      seeMoreBtn.removeAttribute("disabled", true);
    });
}
apiProduct(API_URL);

function mapProductData(product) {
  let productsCard = "";
  product.products.forEach((prod) => {
    productsCard += `
          <div class="products__card">
            <div class="products__card__img">
              <img class="card__img" data-id=${prod.id} src=${prod.images[0]} alt="">
              </div>
              <div class="products__card__info">
              <div class="products__imgs">
                <img class="heart__img" data-id=${prod.id} src="./images/heart 1.png" alt="" />
              </div>
              <h2 class="products__card__info__title">${prod.brand}</h2>
              <p class="products__card__info__desc">category: ${prod.category}</p>
              <p class="products__card__info__desc">price: ${prod.price}</p>
            </div>
          </div>
    `;
  });
  productsCards.innerHTML = productsCard;
}

const loading = document.querySelector(".loading");
function loadCard(count) {
  let loadingCards = "";
  for (let i = 0; i < count; i++) {
    loadingCards += `
          <div class="loading__card">
            <div class="loading__card__img bg__animation"></div>
            <div class="loading__card__info bg__animation">
              <h1 class="loading__card__desc bg__animation"></h1>
              <p class="loading__card__desc bg__animation"></p>
              <p class="loading__card__desc bg__animation"></p>
              <p class="loading__card__desc bg__animation"></p>
              <p class="loading__card__desc bg__animation"></p>
            </div>
          </div>
    `;
  }
  loading.innerHTML = loadingCards;
}

loadCard(limitProducs);

seeMoreBtn.addEventListener("click", () => {
  count++;
  apiProduct(API_URL);
  seeMoreBtn.innerHTML = "loading...";
  seeMoreBtn.setAttribute("disabled", true);
});

formDelete.addEventListener("click", () => {
  formCard.style.display = "none";
});

let shopcount = 0;

///Likes
const heartAdded = async (id) => {
  let data = await fetch(`${API_URL}/products/${id}`);
  data
    .json()
    .then((res) => {
      let heart = JSON.parse(localStorage.getItem(PRODUCTS)) || [];

      let index = heart.findIndex((el) => el.id === res.id);
      let heartUpdete = [];

      if (index < 0) {
        heartUpdete = [...heart, res];
        shopcount++;
        countShop.innerHTML = shopcount;
      } else {
        heartUpdete = heart.filter((el) => el.id !== res.id);
        shopcount--;
        countShop.innerHTML = shopcount;
      }

      localStorage.setItem(PRODUCTS, JSON.stringify(heartUpdete));
    })
    .catch((err) => console.log(err));
};

products.addEventListener("click", (e) => {
  if (e.target.className === "card__img") {
    let id = e.target.dataset.id;
    window.open(`./pages/products.html?id=${id}`, "_self");
  } else if (e.target.className === "heart__img") {
    let id = e.target.dataset.id;
    heartAdded(id);
  }
});

// //Category
// async function optionApi(url) {
//   let data = await fetch(`${url}/products/categories`);
//   data
//     .json()
//     .then((res) => mapSelectData(res))
//     .catch((err) => console.log(err));
// }
// optionApi(API_URL);

// function mapSelectData(option) {
//   let optionCard = ` <option class="" value="all">All</option>`;
//   option.forEach((categ) => {
//     optionCard += `
//      <option class="" value=${categ}>${categ}</option>
//     `;
//   });
//   selectProducts.innerHTML = optionCard;
// }

// async function fetchProducts(api, option, searchValue) {
//   let url = "";
//   if (option === "all") {
//     if (searchValue) {
//       url = `${api}/products/search/?q=${searchValue}`;
//     } else {
//       url = `${api}/products`;
//     }
//   } else {
//     url = `${api}/products/category/${option}`;
//   }
//   console.log(url);

//   const data = await fetch(url, {
//     method: "GET",
//   });

//   data
//     .json()
//     .then((res) => mapProductData(res))
//     .catch((err) => console.log(err));
// }

// fetchProducts(API_URL, "all");

// selectProducts.addEventListener("change", (e) => {
//   let optionValue = e.target.value;
//   console.log(optionValue);
//   fetchProducts(API_URL, optionValue);
// });

// inputSelect.addEventListener("input", (e) => {
//   let value = e.target.value.trim();
//   if (value) {
//     fetchProducts(API_URL, "all", value);
//     selectProducts.value = "all";
//   }
// });
