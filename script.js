const memeGrid = document.getElementById("memeGrid");
const loaderEl = document.getElementById("loader");
const errorBox = document.getElementById("errorBox");
const errorMsg = document.getElementById("errorMsg");

const searchInput = document.getElementById("searchInput");
const sortDropdown = document.getElementById("sortSelect");
const filterSelect = document.getElementById("filterSelect");
const themeToggle = document.getElementById("themeToggle");

let allMemes = [];
let likedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];


const showLoader = () => loaderEl.classList.remove("hidden");
const hideLoader = () => loaderEl.classList.add("hidden");

const showError = (msg) => {
  errorMsg.textContent = msg;
  errorBox.classList.remove("hidden");
};

const hideError = () => errorBox.classList.add("hidden");


function toggleLike(id) {
  if (likedMemes.includes(id)) {
    likedMemes = likedMemes.filter(mId => mId !== id);
  } else {
    likedMemes.push(id);
  }
  localStorage.setItem("likedMemes", JSON.stringify(likedMemes));
  updateGallery();
}

function renderMemes(memesArr) {
  memeGrid.innerHTML = memesArr.map(meme => {
    const isLiked = likedMemes.includes(meme.id);
    return `
      <div class="meme-card">
        <div class="meme-img-wrapper">
          <img src="${meme.url}" alt="${meme.name}" loading="lazy">
        </div>
        <div class="meme-info">
          <button class="like-btn ${isLiked ? 'liked' : ''}" data-id="${meme.id}">
            ${isLiked ? '❤️' : '🤍'}
          </button>
          <span class="meme-badge">Template</span>
          <p class="meme-name">${meme.name}</p>
          <p class="meme-meta">
            Text boxes: ${meme.box_count} | ${meme.width}x${meme.height}
          </p>
        </div>
      </div>
    `;
  }).join('');
}

function updateGallery() {
  let list = [...allMemes];
  const searchQuery = searchInput.value.toLowerCase().trim();


  if (searchQuery) {
    list = list.filter(m => m.name.toLowerCase().includes(searchQuery));
  }


  const filterType = filterSelect.value;
  if (filterType === "2") {
    list = list.filter(m => m.box_count === 2);
  } else if (filterType === "3plus") {
    list = list.filter(m => m.box_count >= 3);
  }


  const sortType = sortDropdown.value;
  if (sortType === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortType === "boxes_asc") {
    list.sort((a, b) => a.box_count - b.box_count);
  } else if (sortType === "boxes_desc") {
    list.sort((a, b) => b.box_count - a.box_count);
  }

  renderMemes(list);
}



memeGrid.addEventListener("click", (e) => {
  const btn = e.target.closest(".like-btn");
  if (!btn) return;
  e.stopPropagation();
  toggleLike(btn.dataset.id);
});

searchInput.addEventListener("input", updateGallery);
sortDropdown.addEventListener("change", updateGallery);
filterSelect.addEventListener("change", updateGallery);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "🌙 Mode" : "☀️ Mode";
});



async function fetchMemes() {
  showLoader();
  hideError();

  try {
    const res = await fetch("https://api.imgflip.com/get_memes");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const { success, data } = await res.json();
    if (!success) throw new Error("API Error");

    allMemes = data.memes;
    renderMemes(allMemes);
  } catch (err) {
    showError("Could not load memes. Try again later.");
    console.error(err);
  } finally {
    hideLoader();
  }
}

fetchMemes();