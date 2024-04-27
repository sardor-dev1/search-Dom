let loginBtn = document.querySelector(".login_btn");
let isLogin = localStorage.getItem("x-auth-token");

function checkProduct() {
  if (!isLogin) {
    // window.location.replace("../index.html");
  }
}
checkProduct();

loginBtn.addEventListener("click", () => {
  localStorage.clear();
  window.open("../index.html", "_self");
});
