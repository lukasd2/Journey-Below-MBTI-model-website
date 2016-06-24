var menuButton = document.querySelector(".nav-button");
menuButton.addEventListener("click", function () {
  document.querySelector(".page-header").classList.toggle("nav-opened");
}, false);
