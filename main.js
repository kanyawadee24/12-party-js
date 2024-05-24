//สร้างตัวแปรไว้สำหรับรอไว้รับค่าข้อมูลที่เราจะดำเนินการจัดการเพิ่ม
//ให้let idเป็น 0 เพราะตองการให้ค่าที่ใช้บวกขึ้นทีละ 1 จึงตั้งให้เริ่มจาก 0
let products = [];
let id = 0;

//Select Dom จากHtmlที่มีid = form และ เพิ่มfucntion ที่ทำงานเมื่อผู้ใช้submit form
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  //ทำการประกาศตัวแปรโดยรับค่ามากจาก element จาก html ที่มี ID (product_name,price,img_url)
  const product_name = document.getElementById("product_name").value;
  const price = document.getElementById("price").value;
  const img_url = document.getElementById("img_url").value;

  /*
ถ้าผู้ใช้ไม่ได้ใส่ img_url ที่ถูกต้องตามเงื่อนไขจะReturnค่าเป็นFalse 
ทำให้conditionของif กลายเป็นTrue และมีการขึ้นแจ้งเตือน "Please enter a valid image URL."
และคำสั่งreturnทำให้ฟังก์ชั่นจบการทำงาน
*/
  if (!imageUrl(img_url)) {
    alert("Please enter a valid image URL.");
    return;
  }

  /* ทำการประกาศตัวแปรที่ชื่อว่า newProduct เป็น object โดยมีkey = (id,img_url,product_name,price,check) 
 key id นำค่ามาจากตัวแปรที่ชื่อว่า id โดยกำหนดให้ค่าบวกขึ้นทีละ 1
 key img_url นำค่ามาจากตัวแปรที่ชื่อว่า img_url ค่านำมาจาก html ที่มีidชื่อว่า img_url
 key product_name นำค่ามาจากตัวแปรชื่อ product_name ค่านำมาจาก html ที่มีidชื่อว่า product_name
 key price นำค่ามาจากตัวแปรชื่อ price ค่านำมาจาก html ที่มีidชื่อว่า price
กำหนดให้ key check มีValueเป็น false
 */
  const newProduct = {
    id: ++id,
    img_url: img_url,
    product_name: product_name,
    price: price,
    check: false,
  };

  products.push(newProduct); //นำObject newproduct push ไปที่ arrays products
  displayProduct(newProduct); // เพิ่มtagใหม่ให้กับdashboardsection
  document.getElementById("form").reset(); // ทำให้form reset
});

//function ImageUrl รับค่าที่เป็นStirng(url) โดยจะตรวจสอบ และ หากลิ้งค์ลงท้ายด้วยนามสกุลjpg|jpeg|png|gif จะreturnเป็นค่า True เพราะถูกต้องตามเงื่อนไข
function imageUrl(img_url) {
  const input = new URL(img_url);
  return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
}

/*
fn name: displayProduct
parameter: product
return  : undefined
การทำงาน : เพิ่มtagใหม่ให้กับdashboardsection
 */

function displayProduct(product) {
  /*
  ตัวแปรชื่อ : dashboardsection
  ถูกกำหนดค่า : select html tag ที่มี id=dashboardsection
  */
  const dashboardsection = document.getElementById("dashboardsection");

  /*
  ตัวแปรชื่อ : card
  ถูกกำหนดค่าเป็น html tag ประเภทdiv
  */
  const card = document.createElement("div");

  //เพิ่มclassให้กับ Div ที่ถูกสร้าง
  card.className = "items-center bg-white p-4 rounded-lg shadow-lg";

  //เพิ่มchildren element ให้กับ card โดยเนื้อหาด้านในขึ้นอยู่กับ product ที่รับมาจาก parameter ของฟังก์ชั่น
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

  //เอาhtmlของ card ไปแนบเป็น children ของdashboardsection
  dashboardsection.appendChild(card);
}

/*
fn name:  toggleSelector
parameter: event object from browser
return  : undefined
การทำงานโดยสรุป : เปลี่ยนค่าcheck ใน object product ให้สลับ true , false
โดยfn นี้จะแนบไปกับtag html type checkbox
 */
function toggleSelector(event) {
  const checkbox = event.target;
  //ดึงdata-idจาก checkbox
  const checkboxId = parseInt(checkbox.getAttribute("data-id"));

  //เอาidไปหาของจากarrays product
  const product = products.find((product) => product.id === checkboxId);

  //ถ้าcheckbox = false จะเปลี่ยนเป็น true
  //ถ้าcheckbox = true จะเปลี่ยนเป็น false
  if (checkbox.checked) {
    product.check = true;
  } else {
    product.check = false;
  }
}

// แนบฟังก์ชันให้ปุ่มที่มี id เป็น addbtn
document.getElementById("addbtn").addEventListener("click", () => {
  //   เอาarrays productมาfilter เฉพาะตัวที่check = true
  cart = products.filter((product) => product.check);

  dp_cart(cart); // เอา cart ที่กรองมาจากarray productมาแสดงผลผ่านการเรียกใช้ฟังก์ชัน  dp_cart
});

/*
fn name:  dp_cart
parameter: cart
return  : undefined
การทำงานโดยสรุป :ใช้array cartสร้่าง html tag หลายๆค่าผ่านforEach
และเอาไปแนบเป็นchildren ของ dp_cart
 */
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
  totalDiv.innerHTML = `<h2 id="total" class="text-[24px] font-bold mt-3 pt-8">💰You have to pay </h2>`;
}

/*
fn name:  removeCard
parameter: productId
return  :  undefiend
การทำงานโดยสรุป : กรองตัวที่มี product.id == productId ทิ้ง
 */
function removeCard(productId) {
  cart = cart.filter((product) => product.id !== productId);
  dp_cart(cart); //เอา cart ที่กรองมาจากarray cart มาแสดงผลผ่านการเรียกใช้ฟังก์ชัน  dp_cart
}

/*
fn name:  calulateBtn
parameter: -
return  : undefiend 
การทำงานโดยสรุป : เรียกใช้งาน fn - calculateFinal, โดย fn นี้ถูกเอาไปแนบกับ html tag ที่มีid = btnCal
 */
function calulateBtn() {
  calculateFinal(cart);
}

/*
fn name:  calculateFinal
parameter: cart
return  : undefined
การทำงานโดยสรุป : เอา cart มาวนลูปเพื่อ sum ราคาและนำไปแสดงผลใน tag html element ที่มี id = total
 */
function calculateFinal(cart) {
  let sum = 0;
  cart.forEach((product) => {
    sum += parseFloat(product.price);
  });

  const totalPrice = document.getElementById("total");
  totalPrice.textContent = `💰Total Price : ${sum.toFixed(2)} $`;
}
