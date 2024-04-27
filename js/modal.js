const API_URL = "https://dummyjson.com";

let loginBtn = document.querySelector(".open-modal");
let formModal = document.querySelector(".form__card");
let formInp = document.querySelector(".formInp");
let productCards = document.querySelector(".product__cards");
let seeMoreBtn = document.querySelector(".seeMoreCard");

const username = document.querySelector(".username");
const password = document.querySelector(".password");

let limitProduct = 8;
let count = 1;

formInp.addEventListener("submit", (el) => {
  el.preventDefault();
  let product = {
    username: username.value,
    password: password.value,
  };
  Registration(product);
});

async function Registration(product) {
  await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.message === "Invalid credentials") {
        return alert("The reference was entered incorrectly");
      }
      localStorage.setItem("x-auth-token", res.token);
      window.open("./pages/admin.html", "_self");
    })
    .catch((err) => console.log(err));
}

async function apiProduct(URL) {
  let prodData = await fetch(`${URL}/products?limit=${limitProduct * count}`);
  prodData
    .json()
    .then((res) => mapProData(res))
    .catch((err) => console.log(err))
    .finally(() => {
      seeMoreBtn.innerHTML = "See More";
      seeMoreBtn.removeAttribute("disabled", true);
    });
}
apiProduct(API_URL);

function mapProData(product) {
  let productCard = "";

  product.products.forEach((pro) => {
    productCard += `
    <div class="product__card" >
        <div class="product__card__img">
          <img src=${pro.images[0]} alt="">
        </div>
        <div class="product__card__info">
          <h3 class="product__card__info__title">${pro.title}</h3>
          <p class="product__card__info__text">${pro.category}</p>
          <p class="product__card__info__text">${pro.price}</p>
          <button class="more__button main__btn" data-id=${pro.id}>
            More
          </button>
        </div>
      </div>
    `;
  });
  productCards.innerHTML = productCard;
}

seeMoreBtn.addEventListener("click", () => {
  count++;
  apiProduct(API_URL);
  seeMoreBtn.innerHTML = "Loading...";
  seeMoreBtn.setAttribute("disabled", true);
});

const logOutBtn = document.querySelector(".login__btn");

loginBtn.addEventListener("click", () => {
  formModal.style.display = "block";
});

loginBtn.addEventListener("click", () => {
  formModal.style.display = "block";
});

productCards.addEventListener("click", (e) => {
  if (e.target.classList.contains("more__button")) {
    console.log(e.target.dataset.id);
    let id = e.target.dataset.id;
    window.open(`./pages/products.html?id=${id}`, "_self");
  }
});