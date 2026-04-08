const memeGrid = document.getElementById("memeGrid");
const loaderEl = document.getElementById("loader");
const errorBox = document.getElementById("errorBox");
const errorMsg = document.getElementById("errorMsg");

const searchInput = document.getElementById("searchInput");
const sortDropdown  = document.getElementById("sortSelect");
const filterSelect = document.getElementById("filterSelect");

let allMemes = [];


function showLoader() {
  loaderEl.classList.remove("hidden"); 
}
 
function hideLoader() {
  loaderEl.classList.add("hidden");  
}

function showError(msg) {
  errorMsg.textContent = msg;       
  errorBox.classList.remove("hidden");   
}
 
function hideError() {
  errorBox.classList.add("hidden");
}


function renderMemes(memesArr) {
  memeGrid.innerHTML = "";

  memesArr.forEach(function(memeObj) {
    const name = memeObj.name;
    const url = memeObj.url;
    const width = memeObj.width;
    const height = memeObj.height;
    const boxCount = memeObj.box_count;

    const card = document.createElement("div");
    card.classList.add("meme-card");

    card.innerHTML = `
      <div class="meme-img-wrapper">
        <img src="${url}" alt="${name}" loading="lazy">
      </div>
      <div class="meme-info">
        <span class="meme-badge">Template</span>
        <p class="meme-name">${name}</p>
        <p class="meme-meta">
          Text boxes: ${boxCount} | ${width}x${height}
        </p>
      </div>
    `;

    memeGrid.appendChild(card);
  });
}


function updateGallery() {
  let list = [...allMemes];

  const searchVal = searchInput.value.toLowerCase();

  if (searchVal && searchVal.trim() !== "") {
    list = list.filter(function(item) {
      return item.name.toLowerCase().includes(searchVal);
    });
  }

  const selectedFilter = filterSelect.value;

  if (selectedFilter === "2") {
    list = list.filter(m => m.box_count === 2);
  } else if (selectedFilter === "3plus") {
    list = list.filter(m => m.box_count >= 3);
  }

  const sortType = sortDropdown.value;

  if (sortType === "name") {
    list.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  } 
  else if (sortType === "boxes_asc") {
    list.sort((a, b) => {
      return a.box_count - b.box_count;
    });
  } 
  else if (sortType === "boxes_desc") {
    list.sort((a, b) => b.box_count - a.box_count);
  }

  renderMemes(list);
}


searchInput.addEventListener("input", updateGallery);
sortDropdown.addEventListener("change", updateGallery);
filterSelect.addEventListener("change", updateGallery);


async function fetchMemes() {
  showLoader(); 
  hideError();    

  const API_URL = "https://api.imgflip.com/get_memes";

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("HTTP error " + res.status);
    }

    const json = await res.json();

    if (!json.success) {
      throw new Error("API returned failure");
    }

    allMemes = json.data.memes;

    if (!allMemes || allMemes.length === 0) {
      throw new Error("No memes found");
    }

    renderMemes(allMemes);

  } catch (err) {
    showError("Failed to load memes: " + err.message);
  }

  hideLoader();
}


fetchMemes();