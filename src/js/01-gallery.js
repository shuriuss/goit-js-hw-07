import { galleryItems } from "./gallery-items.js";

// Change code below this line
const galleryEl = document.querySelector(".gallery");
const cardEl = createImg(galleryItems);

galleryEl.addEventListener("click", handler);
galleryEl.insertAdjacentHTML("beforeend", cardEl);

function createImg(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
     </a>
    </div>
        `;
    })
    .join("");
}

function handler(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const modalEL = basicLightbox.create(
    `
    <div class="modal">
    <img src="${evt.target.dataset.source}" width="800" height="600" >
    </div>
`,
    {
      onShow: () => {
        window.addEventListener("keydown", closeEsp);
      },
      onClose: () => {
        window.removeEventListener("keydown", closeEsp);
      },
    }
  );

  modalEL.show();

  window.addEventListener("keydown", closeEsp);

  function closeEsp(e) {
    if (e.code === "Escape") {
      modalEL.close();
    }
  }
}

console.log(galleryItems);
