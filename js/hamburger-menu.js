const hamburgeMenuDiv = document.querySelector(".navigation-menu-mobile");

const handleHamburgerMenuButton = () => {
  if (hamburgeMenuDiv.classList.contains("notShow")) {
    hamburgeMenuDiv.classList.remove("notShow");
    hamburgeMenuDiv.classList.add("show");
  } else {
    hamburgeMenuDiv.classList.remove("show");
    hamburgeMenuDiv.classList.add("notShow");
  }
};

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    hamburgeMenuDiv.classList.add("notShow");
    hamburgeMenuDiv.classList.remove("show");
  }
});

hamburgeMenuDiv.addEventListener("click", handleHamburgerMenuButton);
