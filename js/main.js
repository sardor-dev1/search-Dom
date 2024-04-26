let menu = document.querySelector(".header__hamburger");
const navBar = document.querySelector(".header__list");

const logIn = document.querySelector(".Log__in");
let isLogin = localStorage.getItem("xx-auth")

menu.addEventListener("click",function () {
  navBar.classList.toggle("header__show-list")
})


