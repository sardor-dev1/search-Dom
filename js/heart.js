import { PRODUCTS } from "./const.js";

const productsCards = document.querySelector(".products__cards");

let heart = JSON.parse(localStorage.getItem(PRODUCTS));

let emptyimg =
  "https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png";

function mapProductData(product) {
  let productsCard = "";
  if (!product || product.length === 0) {
    productsCard = `<img class="empty__img" src=${emptyimg} alt="">`;
  } else {
    product.forEach((prod) => {
      productsCard += `
          <div class="products__card">
            <div class="products__card__img">
              <img class="card__img" data-id=${prod.id} src=${prod.images[0]} alt="">
              <div class="products__imgs">
                <img src="../images/shopping 1.png" alt="" />
                <img class="heart__img" data-id=${prod.id} src="../images/heart 1.png" alt="" />
                <img src="../images/Frame.png" alt="" />
              </div>
            </div>
            <div class="products__card__info">
              <h1 class="products__card__info__title">brand: ${prod.brand}</h1>
              <p class="products__card__info__desc">category: ${prod.category}</p>
              <p class="products__card__info__desc">price: ${prod.price}</p>
            </div>
          </div>
    `;
    });
  }
  productsCards.innerHTML = productsCard;
}
mapProductData(heart);

const heartAdded = (id) => {
  let heart = JSON.parse(localStorage.getItem(PRODUCTS));
  let heartUpdete = heart.filter((el) => el.id !== +id);
  localStorage.setItem(PRODUCTS, JSON.stringify(heartUpdete));
  mapProductData(heartUpdete);
};

productsCards.addEventListener("click", (e) => {
  if (e.target.className === "card__img") {
    let id = e.target.dataset.id;
    window.open(`./pages/products.html?id=${id}`, "_self");
  } else if (e.target.className === "heart__img") {
    let id = e.target.dataset.id;
    heartAdded(id);
  }
});
