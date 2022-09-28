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
   <button class="formButton2">Subscribe</button>
   <div class="subscribeModal">
   Thank you for your subscription! We will keep you updated!
 </div>
  </div>`;

  showcase.innerHTML = html;
  const message = document.querySelector(".subscribeModal");
  const sub = document.querySelector(".formButton2");
  console.log(sub);
  sub.addEventListener("click", function () {
    message.style.display = "block";
    setTimeout(function () {
      message.style.display = "none";
    }, 3000);
  });

  let middle = document.querySelector(".middle-section");

  let middleImg = data[1].images[1].src;
  let image = document.createElement("img");

  image.src = middleImg;

  middle.insertBefore(image, middle.firstChild);
}
