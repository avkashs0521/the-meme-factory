const memeGrid = document.getElementById("memeGrid");
const loader   = document.getElementById("loader");
const errorBox = document.getElementById("errorBox");
const errorMsg = document.getElementById("errorMsg");
console.log({ memeGrid, loader, errorBox, errorMsg });
function showLoader() {
  loader.classList.remove("hidden"); 
}
 
function hideLoader() {
  loader.classList.add("hidden");  
}

function showError(message) {
  errorMsg.textContent = message;       
  errorBox.classList.remove("hidden");   
}
 
function hideError() {
  errorBox.classList.add("hidden");
}
 
function renderMemes(memesArray) {
  hideLoader();
  memeGrid.innerHTML = "";
  memesArray.forEach(function(meme) {
    const { name, url, width, height, box_count } = meme;
    const card = document.createElement("div");
    card.classList.add("meme-card");
    card.innerHTML = `
      <div class="meme-img-wrapper">
        <img src="${url}" alt="${name}" loading="lazy" />
      </div>
      <div class="meme-info">
        <span class="meme-badge">Template</span>
        <p class="meme-name">${name}</p>
        <p class="meme-meta">Text boxes: ${box_count} &nbsp;|&nbsp; ${width}×${height}</p>
      </div>
    `;
    memeGrid.appendChild(card);
  });
}
 
async function fetchMemes() {
  showLoader(); 
  hideError();    
  const API_URL = "https://api.imgflip.com/get_memes";
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error("API returned failure");
    }
    const memesArray = data.data.memes;
    if (!memesArray || memesArray.length === 0) {
      throw new Error("No memes found");
    }
    renderMemes(memesArray);
  } catch (error) {
    showError("Failed to load memes: " + error.message);
  } 
  hideLoader();
  
}
fetchMemes();
 