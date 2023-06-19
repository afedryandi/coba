import { gallery } from "./gallery.js";

const cardContainer = document.querySelector(".grid");
const form = document.querySelector(".form");
const modalContainer = document.querySelector(".modal");

function renderGallery(image) {
  const card = document.createElement("article");
  const cardValue = `
          <img
            src=${image.url}
          />
          <div class="konten">
            <h2>${image.nama}</h2>
            <p>
              ${image.desc}
            </p>
          </div>
          `;
  card.innerHTML = cardValue;

  cardContainer.appendChild(card);

  card.addEventListener("click", () => {
    modalContainer.classList.add("show");
    modalContainer.innerHTML = `<img
    class="modal-image"
    src=${image.url}
    alt=""
  />
  <button class="modal-close">X</button>`;
    const closeModalBtn = document.querySelector(".modal-close");

    closeModalBtn.addEventListener("click", () => {
      modalContainer.classList.remove("show");
    });
  });
}

// Memuat gambar saat pertama kali mulai
gallery.forEach((image) => {
  renderGallery(image);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const searchParam = form.search.value.toLowerCase();
  const categoryParam = form.category.value;

  let newGallery = "";

  if (categoryParam != "All") {
    newGallery = gallery.filter((image) => {
      return (
        image.nama.toLowerCase().startsWith(searchParam) &&
        image.kategori == categoryParam
      );
    });
  } else {
    newGallery = gallery.filter((image) => {
      return image.nama.toLowerCase().startsWith(searchParam);
    });
  }
  if (newGallery.length > 0) {
    cardContainer.innerHTML = "";

    newGallery.forEach((image) => {
      renderGallery(image);
    });
  } else {
    cardContainer.innerHTML =
      '<h1 class="kosong">Pencarian tidak tersedia</h1>';
  }
});
