const url = `https://olgacerovic.no/coffee-nomad/wp-json/wc/v3/products?per_page=20&consumer_key=ck_946c851fd99cd6bc49a12feed747722bb1ab2c69&consumer_secret=cs_ed72963b1ad013f799e0b23e53729cb1239429d3`;
data = [];
const getData = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    fillData(result);
  } catch (error) {
    console.log(error);
  }
};

getData(url);

function fillData(response) {
  data = response;

  let carousel = "";

  const carouselContent = document.querySelector(".carousel-content");

  data.forEach((elem, index) => {
    if (index >= 5 && index < 10) {
      let text = elem.name;
      carousel += `<div class="slide">
    <div>
    <a href="https://elastic-pasteur-9963a6.netlify.app/post-specific.html?id=${index}">
      <img src="${elem.images[0].src}" alt="" />
      <p>
        ${text}
      </p>
      </a>
    </div>
  </div>
 `;
    }
  });

  carouselContent.innerHTML = carousel;
  carouselMove();

  let html = "";
  const showcase = document.querySelector(".subscribe-section");
  html += `<img
   src="${data[1].images[0].src}"
   alt="Camping coffee equipment by lake"
  />
  <div id="sub2">
   <h2>Subscribe here</h2>
   <label> Email </label>
   <input id="inputField" type="text" />
   <button class="formButton">Subscribe</button>
   <div class="subscribeModal">
   Thank you for your subscription! We will keep you updated!
 </div>
  </div>`;

  showcase.innerHTML = html;
  const message = document.querySelector(".subscribeModal");
  const sub = document.querySelector(".formButton");
  console.log(sub);
  sub.addEventListener("click", function () {
    message.style.display = "block";
    setTimeout(function () {
      message.style.display = "none";
    }, 3000);
  });

  const middle = document.querySelector(".middle-section");

  let middleImg = data[1].images[30].src;
  let image = document.createElement("img");

  image.src = middleImg;

  middle.insertBefore(image, middle.firstChild);
}

function carouselMove() {
  const carousel = document.querySelector(".carousel");
  const carouselContent = document.querySelector(".carousel-content");
  const slides = document.querySelectorAll(".slide");
  const arrayOfSlides = Array.prototype.slice.call(slides);
  let carouselDisplaying;
  let screenSize;
  setScreenSize();
  var lengthOfSlide;

  function addClone() {
    const lastSlide = carouselContent.lastElementChild.cloneNode(true);
    lastSlide.style.left = -lengthOfSlide + "px";
    carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
  }

  function removeClone() {
    const firstSlide = carouselContent.firstElementChild;
    firstSlide.parentNode.removeChild(firstSlide);
  }

  function moveSlidesRight() {
    const slides = document.querySelectorAll(".slide");
    const slidesArray = Array.prototype.slice.call(slides);
    let width = 0;

    slidesArray.forEach(function (el, i) {
      el.style.left = width + "px";
      width += lengthOfSlide;
    });
    addClone();
  }
  moveSlidesRight();

  function moveSlidesLeft() {
    const slides = document.querySelectorAll(".slide");
    let slidesArray = Array.prototype.slice.call(slides);
    slidesArray = slidesArray.reverse();
    let maxWidth = (slidesArray.length - 1) * lengthOfSlide;

    slidesArray.forEach(function (el, i) {
      maxWidth -= lengthOfSlide;
      el.style.left = maxWidth + "px";
    });
  }

  window.addEventListener("resize", setScreenSize);

  function setScreenSize() {
    if (window.innerWidth >= 1000) {
      carouselDisplaying = 3;
    } else if (window.innerWidth >= 600) {
      carouselDisplaying = 2;
    } else {
      carouselDisplaying = 1;
    }
    getScreenSize();
  }

  function getScreenSize() {
    const slides = document.querySelectorAll(".slide");
    const slidesArray = Array.prototype.slice.call(slides);
    lengthOfSlide = carousel.offsetWidth / carouselDisplaying;
    let initialWidth = -lengthOfSlide;
    slidesArray.forEach(function (el) {
      el.style.width = lengthOfSlide + "px";
      el.style.left = initialWidth + "px";
      initialWidth += lengthOfSlide;
    });
  }

  const rightNav = document.querySelector(".nav-right");
  rightNav.addEventListener("click", moveLeft);

  let moving = true;
  function moveRight() {
    if (moving) {
      moving = false;
      const lastSlide = carouselContent.lastElementChild;
      lastSlide.parentNode.removeChild(lastSlide);
      carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
      removeClone();
      const firstSlide = carouselContent.firstElementChild;
      firstSlide.addEventListener("transitionend", activateAgain);
      moveSlidesRight();
    }
  }

  function activateAgain() {
    const firstSlide = carouselContent.firstElementChild;
    moving = true;
    firstSlide.removeEventListener("transitionend", activateAgain);
  }

  const leftNav = document.querySelector(".nav-left");
  leftNav.addEventListener("click", moveRight);

  function moveLeft() {
    if (moving) {
      moving = false;
      removeClone();
      const firstSlide = carouselContent.firstElementChild;
      firstSlide.addEventListener("transitionend", replaceToEnd);
      moveSlidesLeft();
    }
  }

  function replaceToEnd() {
    const firstSlide = carouselContent.firstElementChild;
    firstSlide.parentNode.removeChild(firstSlide);
    carouselContent.appendChild(firstSlide);
    firstSlide.style.left = (arrayOfSlides.length - 1) * lengthOfSlide + "px";
    addClone();
    moving = true;
    firstSlide.removeEventListener("transitionend", replaceToEnd);
  }

  carouselContent.addEventListener("mousedown", seeMovement);

  let initialX;
  let initialPosition;
  function seeMovement(e) {
    initialX = e.clientX;
    getInitialPosition();
    carouselContent.addEventListener("mousemove", slightMove);
    document.addEventListener("mouseup", moveBasedOnMouse);
  }

  function slightMove(e) {
    if (moving) {
      let movingX = e.clientX;
      let difference = initialX - movingX;
      if (Math.abs(difference) < lengthOfSlide / 4) {
        slightMoveSlides(difference);
      }
    }
  }

  function getInitialPosition() {
    const slides = document.querySelectorAll(".slide");
    const slidesArray = Array.prototype.slice.call(slides);
    initialPosition = [];
    slidesArray.forEach(function (el) {
      const left = Math.floor(parseInt(el.style.left.slice(0, -2)));
      initialPosition.push(left);
    });
  }

  function slightMoveSlides(newX) {
    const slides = document.querySelectorAll(".slide");
    const slidesArray = Array.prototype.slice.call(slides);
    slidesArray.forEach(function (el, i) {
      const oldLeft = initialPosition[i];
      el.style.left = oldLeft + newX + "px";
    });
  }

  function moveBasedOnMouse(e) {
    let finalX = e.clientX;
    if (initialX - finalX > 0) {
      moveRight();
    } else if (initialX - finalX < 0) {
      moveLeft();
    }
    document.removeEventListener("mouseup", moveBasedOnMouse);
    carouselContent.removeEventListener("mousemove", slightMove);
  }
}
