const API_URL = "https://dummyjson.com"; 

const productInfo = document.querySelector(".products__cards");

async function fetchData(url){
    let param = new URLSearchParams(window.location.search)
    let id = param.get("id")

    const data = await fetch(`${url}/products/${id}`)
    data
    .json()
    .then((res) => mapData(res))
    .catch((err) => console.log(err))
}
fetchData(API_URL)

function mapData(proData){
    productInfo.innerHTML = `
    <div class="product__info">
      <div>
        <img src=${proData.images[0]} alt="">
      </div>
      <div>
        <h1>${proData.title}</h1>
        <p>${proData.description}</p>
        <p>${proData.price}$</p>
        <p>${proData.discountPercentage}% discount percentage</p>
        <p>${proData.rating} rating</p>
        <p>${proData.stock}% stock</p>
        <p>brand: ${proData.brand}</p>
        <p>${proData.category}</p>
        <p>thumbnail: ${proData.thumbnail}</p>
      </div>
    `;
}