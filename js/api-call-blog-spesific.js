const url = `https://olgacerovic.no/coffee-nomad/wp-json/wc/v3/products?per_page=20&consumer_key=ck_946c851fd99cd6bc49a12feed747722bb1ab2c69&consumer_secret=cs_ed72963b1ad013f799e0b23e53729cb1239429d3`;
data = [];
const getData = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    fillData(result);
    showPost(result);
  } catch (error) {
    console.log(error);
  }
};

getData(url);

function fillData(response) {
  data = response;

  let html = "";
  let showcase = document.querySelector(".subscribe-section");
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
}
modalImg = document.querySelector("#modal img");

const container = document.getElementById("container-photo");
const modal = document.getElementById("modal");
const close = document.querySelector(".close");

function showPost(result) {
  let urlP = window.location.href;

  let urlL = new URL(urlP);

  let search_param = urlL.searchParams;
  let id = search_param.get("id");

  let html = "";

  result.forEach((element, index) => {
    if (index == id) {
      html += `<div class="main-photo">
    <img
      src="${element.images[0].src}"
      alt="${element.images[0].alt}"
    />
  </div>
  <div class="middle-section">
    <img id="modalClick"
      src="${element.images[1].src}"
      alt="${element.images[1].alt}"
    />
    <div class="text-area">
      <h1>
      ${element.name}
      </h1>
      <p>
      ${element.description}
      </p>
    </div>
  </div>`;
      modalImg.src = element.images[1].src;
      modalImg.alt = element.images[1].alt;
    }
  });
  container.innerHTML = html;

  document.querySelector(".close").addEventListener("click", function () {
    modal.style.display = "none";
  });

  document.getElementById("modalClick").addEventListener("click", function () {
    modal.style.display = "block";
  });
}
