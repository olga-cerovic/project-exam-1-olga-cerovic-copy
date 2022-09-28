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

  let middleUpper = document.querySelector(".upper");

  let middleImgUpper = data[1].images[3].src;
  let imageUpper = document.createElement("img");

  imageUpper.src = middleImgUpper;

  middleUpper.insertBefore(imageUpper, middleUpper.firstChild);

  let middleLower = document.querySelector(".lower");

  let middleImgLower = data[1].images[4].src;
  let imageLower = document.createElement("img");

  imageLower.src = middleImgLower;

  middleLower.insertBefore(imageLower, middleLower.firstChild);
}
