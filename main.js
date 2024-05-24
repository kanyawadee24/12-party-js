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

///

