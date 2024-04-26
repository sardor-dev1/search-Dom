const loginBtn = document.querySelector(".loginBtn");
let isLogin = localStorage.getItem("x-auth-token");

function checkProducts() {
  if (!isLogin) {
    window.location.replace("../index.html");
  }
}
checkroducts();

loginBtn.addEventListener("click", () => {
  localStorage.clear();
  window.open("../index.html", "_self");
});
