let faq_item = document.querySelectorAll(".faq_item");
let languageBtn = document.querySelector(".languageBtn");
let languageList = document.querySelector(".languageList");
let locationItems = document.querySelectorAll(".languageList ul li");
let locationName = document.querySelector("#locationName");
let locationArrow = document.querySelector(".locationArrow");
let burgerMenu = document.querySelector("#burgerMenu");
let burgerMenuBlock = document.querySelector(".burgerMenuBlock");
let burgerClose = document.querySelector(".burgerClose");
let body = document.querySelector("body");
let closeBtn = document.querySelector(".closeBtn");
let orderBtns = document.querySelectorAll(".orderBtn");
let product = document.querySelector(".price");
let multiplier = 1;
let quantity = document.querySelector(".field2");
let scrollUp = document.querySelector(".scrollUp");
let phone = document.querySelector(".phone_order");
let phoneInputs = document.querySelectorAll(".phoneInput");
let product1 = document.querySelector(".price1");
let product3 = document.querySelector(".price3");
let productPrice = product && product.dataset.price;
let modal_order = document.querySelector(".modal_order");
let modalClose = document.querySelector(".modal_close");
let main = document.querySelector("main");
let email_error = document.querySelector(".email_error");
let order_forms = document.querySelectorAll("form");
let emailInputs = document.querySelectorAll(".email");

modal_order.addEventListener("click", (e) => {
  if (e.target.offsetParent == null) {
    body.classList.remove("overfloy");
    modal_order.classList.remove("active");
    overlay.classList.remove("active");
  }
});
modalClose.addEventListener("click", () => {
  body.classList.remove("overfloy");
  modal_order.classList.remove("active");
  overlay.classList.remove("active");
});
for (let item of faq_item) {
  item.addEventListener("click", function () {
    item.children[0].children[1].classList.toggle("active");
    item.children[1].classList.toggle("active");
  });
}
languageBtn.addEventListener("click", () => {
  languageList.classList.toggle("active");
  locationArrow.classList.toggle("active");
});
locationItems.forEach(function (item) {
  item.addEventListener("click", function () {
    locationItems.forEach(function (li) {
      li.classList.remove("active");
    });
    this.classList.add("active");
    locationName.innerHTML = this.innerHTML;
  });
});
phone.addEventListener("click", () => {
  modal_order.classList.add("active");
  body.classList.add("overfloy");
  overlay.classList.add("active");
});
window.addEventListener("scroll", function (e) {
  if (window.scrollY > 100) {
    scrollUp.classList.add("visiable");
  } else {
    scrollUp.classList.remove("visiable");
  }
});
scrollUp.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
document.addEventListener("click", function (e) {
  if (
    e.target.offsetParent !== languageList &&
    e.target.offsetParent !== languageBtn &&
    e.target !== languageBtn
  ) {
    languageList.classList.remove("active");
    locationArrow.classList.remove("active");
  }
});
burgerMenu.addEventListener("click", function () {
  burgerMenuBlock.classList.toggle("active");
  burgerMenu.classList.add("active");
  overlay.classList.add("active");
  burgerClose.classList.add("active");
  body.classList.add("overfloy");
});
burgerClose.addEventListener("click", function () {
  burgerMenuBlock.classList.toggle("active");
  overlay.classList.remove("active");
  burgerClose.classList.remove("active");
  burgerMenu.classList.remove("active");
  body.classList.remove("overfloy");
});
orderBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    burgerMenuBlock.classList.toggle("active");
    overlay.classList.remove("active");
    burgerClose.classList.remove("active");
    burgerMenu.classList.remove("active");
    body.classList.remove("overfloy");
  });
});

document.querySelectorAll(".dropdown").forEach(function (dropdownWrapper) {
  const dropdownBtn = dropdownWrapper.querySelector(".dropdown__button");
  const dropdownList = dropdownWrapper.querySelector(".dropdown__list");
  const dropdownItems = dropdownList.querySelectorAll(".dropdown__list-item");
  const dropdownInput = dropdownWrapper.querySelector(
    ".dropdown__input_hidden"
  );
  const dropdownArrow = dropdownWrapper.querySelector(".dropdown__arrow");

  dropdownWrapper.addEventListener("click", function (e) {
    dropdownList.classList.toggle("dropdown__list_visible");
    this.classList.toggle("dropdown__button_active");
    dropdownArrow.classList.toggle("active");
  });

  dropdownItems.forEach(function (listItem) {
    listItem.addEventListener("click", function (e) {
      dropdownItems.forEach(function (el) {
        el.classList.remove("dropdown__list-item_active");
      });
      e.target.classList.add("dropdown__list-item_active");
      dropdownBtn.innerText = this.innerText;
      dropdownInput.value = this.dataset.value;
      dropdownList.classList.remove("dropdown__list_visible");
      multiplier = this.dataset.value;
      quantity.value = 1;
      UpdatePrice(productPrice, product);
    });
  });

  dropdownWrapper.addEventListener("mouseleave", function (e) {
    dropdownList.classList.remove("dropdown__list_visible");
    dropdownBtn.classList.remove("dropdown__button_active");
    dropdownArrow.classList.remove("active");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab" || e.key === "Escape") {
      dropdownBtn.classList.remove("dropdown__button_active");
      dropdownList.classList.remove("dropdown__list_visible");
      languageList.classList.toggle("active");
      locationArrow.classList.toggle("active");
      dropdownArrow.classList.toggle("active");
    }
  });
});

let btnMinus = document.querySelector(".minus2");
let btnPlus = document.querySelector(".plus2");
let btnMinus3 = document.querySelector(".minus3");
let btnPlus3 = document.querySelector(".plus3");
let btnMinus1 = document.querySelector(".minus1");
let btnPlus1 = document.querySelector(".plus1");
btnMinus3 &&
  btnMinus3.addEventListener("click", (e) => decrementValue(e, product3));
btnPlus3 &&
  btnPlus3.addEventListener("click", (e) => incrementValue(e, product3));
btnMinus1 &&
  btnMinus1.addEventListener("click", (e) => decrementValue(e, product1));
btnPlus1 &&
  btnPlus1.addEventListener("click", (e) => incrementValue(e, product1));
btnMinus &&
  btnMinus.addEventListener("click", (e) => decrementValue(e, product));
btnPlus && btnPlus.addEventListener("click", (e) => incrementValue(e, product));
function incrementValue(e, node) {
  e.preventDefault();
  let fieldName = $(e.target).data("field");
  let parent = $(e.target).closest("div");
  let currentVal = parseInt(
    parent.find("input[name=" + fieldName + "]").val(),
    10
  );

  if (!isNaN(currentVal)) {
    parent.find("input[name=" + fieldName + "]").val(currentVal + 1);
  } else {
    parent.find("input[name=" + fieldName + "]").val(0);
  }
  UpdatePrice((currentVal + 1) * productPrice, node);
}

function decrementValue(e, node) {
  e.preventDefault();

  let fieldName = $(e.target).data("field");
  let parent = $(e.target).closest("div");
  let currentVal = parseInt(
    parent.find("input[name=" + fieldName + "]").val(),
    10
  );

  if (!isNaN(currentVal) && currentVal > 1) {
    parent.find("input[name=" + fieldName + "]").val(currentVal - 1);
  } else {
    parent.find("input[name=" + fieldName + "]").val(1);
  }

  if (currentVal >= 2) {
    UpdatePrice((currentVal - 1) * productPrice, node);
  }
}

function UpdatePrice(price, node) {
  node.innerText = price * multiplier;
}
function phoneMask() {
  var num = $(this).val().replace(/\D/g, "");
  $(this).val(
    num.substring(0, 1) +
      "(" +
      num.substring(1, 4) +
      ")" +
      num.substring(4, 7) +
      "-" +
      num.substring(7, 11)
  );
}
for (let item of phoneInputs) {
  item.addEventListener("keyup", phoneMask);
}
function validateEmail(email) {
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}
order_forms.forEach(function (form) {
  let form_btn = form.querySelector("button");
  let email_input = form.querySelector("input[type=email]");

  email_input.addEventListener("keyup", function (e) {
    if (validateEmail(e.target.value)) {
      email_error.innerHTML = "";
      form_btn.disabled = false;
    } else {
      email_error.innerHTML = "email введен неверно.";
      form_btn.disabled = true;
    }
  });
});
