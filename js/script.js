const menuBtn = document.querySelector(".btn-menu");
const siteNav = document.querySelector(".nav .menu ul");
const closeMenu = document.querySelector(".btn-menu .close");
const openMenu = document.querySelector(".btn-menu .open");
const minusBtn = document.querySelector(".btn-minus");
const plusBtn = document.querySelector(".btn-plus");
const amountOfPrduct = document.querySelector(".amount-of-product input");
const nextBtn = document.querySelector(".btn-next");
const prevBtn = document.querySelector(".btn-prev");
const nextModalBtn = document.querySelector(".preview-modal .btn-next");
const prevModalBtn = document.querySelector(".preview-modal .btn-prev");
const productImgs = document.querySelectorAll(".products-page li ");
const modalProductImgs = document.querySelectorAll(
  ".preview-modal .products-modal li "
);
const previewModal = document.querySelector(".preview-modal");
const thumbnails = document.querySelectorAll(
  ".img-product .thumbnails-page li"
);
const thumbnailModals = document.querySelectorAll(
  ".preview-modal .thumbnails li"
);
const modalBtn = document.querySelector(".preview-modal .btn-modal");
const form = document.querySelector(".form");
const input = document.querySelector(".form input");
const cartBtn = document.querySelector(".status .btn-cart");
const cartBox = document.querySelector(".status .cart-box");
const item = document.querySelector(".status .cart-box .item-in-cart");
const empty = document.querySelector(".cart-box .empty");
const amountOfItem = document.querySelector(
  ".cart-box .item-detail .price-and-amount span"
);
const total = document.querySelector(".cart-box .item-detail .total");
const deleteBtn = document.querySelector(".cart-box .btn-delete");
const addToCartBtn = document.querySelector(".form .btn-add-to-cart");
const noti = document.querySelector(".nav .status .btn-cart .noti");

//toggle navigation
menuBtn.addEventListener("click", () => {
  siteNav.classList.toggle("active");
  closeMenu.classList.toggle("active");
  openMenu.classList.toggle("active");
});

//increment and decrement amount of products
minusBtn.addEventListener("click", () => {
  if (input.value > 0) {
    input.value--;
    if (input.value === 0) {
      console.log("zero");
    }
  }
});

plusBtn.addEventListener("click", () => {
  input.value++;
  if (input.value > 0) {
    addToCartBtn.disabled = false;
  } else {
    addToCartBtn.disabled = true;
  }
});

//preview products on mobile
let index = 0;
nextBtn.addEventListener("click", () => {
  const lastIndex = productImgs.length - 1;
  if (index !== lastIndex) {
    productImgs[index].style.display = "none";
    index++;
    productImgs[index].style.display = "block";
  }
});

prevBtn.addEventListener("click", () => {
  if (index !== 0) {
    productImgs[index].style.display = "none";
    index--;
    productImgs[index].style.display = "flex";
  }
});

//modal on larger screen
const moveActiveState = (newIndex) => {
  thumbnailModals.forEach((thumbnailModal, indexThumbnailModal) => {
    if (indexThumbnailModal === newIndex) {
      thumbnailModal.classList.add("open");
    } else {
      thumbnailModal.classList.remove("open");
    }
  });
};

//slide img
const slider = (indexModalImg) => {
  let newIndex = indexModalImg;
  prevModalBtn.addEventListener("click", () => {
    if (newIndex > 0) {
      modalProductImgs[newIndex].style.display = "none";
      newIndex--;
      modalProductImgs[newIndex].style.display = "flex";

      moveActiveState(newIndex);
    }
  });

  nextModalBtn.addEventListener("click", () => {
    const lastIndex = modalProductImgs.length - 1;
    if (newIndex < lastIndex && newIndex >= 0) {
      modalProductImgs[newIndex].style.display = "none";
      newIndex++;
      modalProductImgs[newIndex].style.display = "flex";

      moveActiveState(newIndex);
    }
  });
};

//open modal by clicking thumbnail and display the same pic
thumbnails.forEach((thumbnail, indexThumbnail) => {
  thumbnail.addEventListener("click", () => {
    previewModal.style.display = "flex";
    nextModalBtn.style.display = "block";
    prevModalBtn.style.display = "block";

    //active state on thumbnail
    if (indexThumbnail !== 0) {
      thumbnail.classList.add("open");
      thumbnails[0].classList.remove("open");
    }

    thumbnailModals.forEach((thumbnailModal, indexThumbnailModal) => {
      if (indexThumbnail === indexThumbnailModal) {
        thumbnailModal.classList.add("open");
      } else {
        thumbnailModal.classList.remove("open");
      }
    });

    //display the same pic
    modalProductImgs.forEach((modalImg, indexModalImg) => {
      if (indexModalImg === indexThumbnail) {
        modalProductImgs[0].style.display = "none";
        modalImg.style.display = "flex";
        slider(indexModalImg);
        console.log(modalImg);
      }
    });
  });
});

//close modal
const clear = () => {
  modalProductImgs.forEach((modalImg) => {
    if (modalImg.className !== "img-1") {
      modalImg.style.display = "none";
    } else {
      modalImg.style.display = "flex";
    }
  });
};

const clearThumbnail = () => {
  thumbnails.forEach((thumbnail, indexThumbnail) => {
    if (indexThumbnail !== 0) {
      thumbnail.classList.remove("open");
      thumbnails[0].classList.add("open");
    }
  });
};

modalBtn.addEventListener("click", () => {
  previewModal.style.display = "none";
  clear();
  clearThumbnail();
});

//open cart box

cartBtn.addEventListener("click", () => {
  cartBox.classList.toggle("show");
});

//handle form
const addItemToCart = () => {
  item.style.display = "flex";
  empty.style.display = "none";
  amountOfItem.innerHTML = input.value;
  noti.innerHTML = input.value;
  noti.style.display = "block";
};

const totalPricing = () => {
  let pricing = 125 * input.value;
  total.innerHTML = `$${pricing}`;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addItemToCart();
  totalPricing();
  input.value = 0;
});

//delete item from cart

deleteBtn.addEventListener("click", () => {
  item.style.display = "none";
  empty.style.display = "block";
  noti.style.display = "none";
  noti.innerHTML = "";
});
