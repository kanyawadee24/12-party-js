let products = [];
let id = 0;

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const product_name = document.getElementById("product_name").value;
  const price = document.getElementById("price").value;
  const img_url = document.getElementById("img_url").value;

  if (!imageUrl(img_url)) {
    alert("Please enter a valid image URL.");
    return;
  }
  const newProduct = {
    id: ++id,
    img_url: img_url,
    product_name: product_name,
    price: price,
    check: false,
  };
  products.push(newProduct);
  displayProduct(newProduct);
  document.getElementById("form").reset();
});

//Checked URL by RegEx
function imageUrl(img_url) {
  const input = new URL(img_url);
  return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
}

//Display Product
function displayProduct(product) {
  const dashboardsection = document.getElementById("dashboardsection");
  const card = document.createElement("div");
  card.className = "items-center bg-white p-4 rounded-lg shadow-lg";

  card.innerHTML = `
     <img src="${product.img_url}" alt="${product.product_name} class="w-full aspect-[4/3] rounded-md mb-4 object-cover">
     <div class="flex items-center justify-between">
     
     <div class="mt-3 ">
     <span class="block ml-2 text-gray-700 font-semibold text-3xl">${product.product_name}</span>
     <span class="block ml-2 text-gray-700 font-semibold text-2xl">${product.price}$</span>
     </div>
     <input type="checkbox" class="w-5 h-5 text-2xl accent-rose-600" data-id="${product.id}" onchange="toggleSelector(event)">
     </div>
     `;

  dashboardsection.appendChild(card);
}

function toggleSelector(event) {
  const checkbox = event.target;
  const checkboxId = parseInt(checkbox.getAttribute("data-id"));
  const product = products.find((product) => product.id === checkboxId);

  if (checkbox.checked) {
    product.checked = true;
  } else {
    product.checked = false;
  }
}

document.getElementById("addbtn").addEventListener("click", () => {
  cart = products.filter((product) => product.checked);
  dp_cart(cart);
});

function dp_cart(cart) {
  const displayDiv = document.getElementById("dp_cart");
  displayDiv.innerHTML = "";

  cart.forEach((product) => {
    const div = document.createElement("div");
    div.className = "items-center bg-white p-4 rounded-lg shadow-lg";
    div.innerHTML = `
     <input type="checkbox" class="sr-only w-5 h-5 text-2xl accent-rose-600" data-id="${product.id}" onchange="calculateSelector(event)">
     <img src="${product.img_url}" alt="${product.product_name} class="w-full aspect-[4/3] rounded-md mb-4 object-cover">
     
     <div class="flex items-center justify-between">
 
     <div class="mt-3 ">
     <span class="block ml-2 text-gray-700 font-semibold text-3xl">${product.product_name}</span>
     <span class="block ml-2 text-gray-700 font-semibold text-2xl">${product.price}$</span>
     </div>
     <button
     type="submit"
     id="${product.id}"
     onclick="removeCard(${product.id})"
     class="bg-[#FF0000] px-4 text-white rounded-md hover:bg-[#ce4141] hover:ring hover:ring-[#000000] py-4 mt-2"
   >Remove
   </button>
     </div>
     `;
    displayDiv.appendChild(div);
  });

  const btnDiv = document.getElementById("btnCal");
  btnDiv.innerHTML = `<button id="cfp" onclick="calulateBtn()" class="bg-[#454545] px-10 py-3 text-white rounded-md hover:bg-[#B3B3B3] hover:ring hover:ring-[#A9A9A9]">Calculate Final Price</button>`;

  const totalDiv = document.getElementById("total");
  totalDiv.innerHTML = `<h2 id="total" class="text-[24px] font-bold mt-3 pt-8">💰You have to pay :</h2>`;
}

function removeCard(productId) {
  cart = cart.filter((product) => product.id !== productId);
  dp_cart(cart);
}

function calulateBtn() {
  calculateFinal(cart);
}

function calculateFinal(cart) {
  let sum = 0;
  cart.forEach((product) => {
    sum += parseFloat(product.price);
  });

  const totalPrice = document.getElementById("total");
  totalPrice.textContent = `💰You have to pay : ${sum.toFixed(2)} $`;
}
