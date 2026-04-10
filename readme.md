# 😂 The Meme Factory

## 📌 Project Overview

**The Meme Factory** is a high-fidelity, interactive meme browser built with Vanilla JavaScript and modern CSS. It allows users to explore trending meme templates from the Imgflip API, search by keyword, filter by complexity, and save their favorites.

---

## ✨ Features Implemented

### 🛠️ Core Interactive Features (Milestone 3)
1.  **🔍 Real-time Searching**: Filter memes instantly as you type using high-performance array `filter()`.
2.  **🗂️ Dynamic Filtering**: Filter templates based on the number of text boxes (2 boxes or 3+ boxes) to find the perfect template for your joke.
3.  **🔃 Intelligent Sorting**: Sort memes alphabetically (A-Z) or by complexity (Least to Most boxes or vice-versa) using the ES6 `sort()` function.
4.  **❤️ Button Interactions**: "Like" your favorite meme templates. Your preferences are persisted using **LocalStorage**, so they remain even after you refresh the page.
5.  **🌓 Dark/Light Mode Toggle**: A premium theme switcher that adapts the entire UI for day or night use.

### 🧠 Technical Highlights
*   **Pure Functional Logic**: All data transformations (searching, filtering, sorting) are implemented using **Array Higher-Order Functions** (`map`, `filter`, `sort`, `forEach`).
*   **Zero Dependencies**: Built with 100% Vanilla JS, HTML, and CSS.
*   **Responsive Design**: A custom CSS Grid layout that adapts seamlessly from mobile devices to desktop monitors.
*   **Performance Optimized**: Uses lazy-loading for images and efficient DOM manipulation.

---

## 🛠️ Technologies Used

*   **HTML5 & Semantic Elements**
*   **CSS3 (Custom Variables, Grid, Flexbox)**
*   **JavaScript (ES6+, Fetch API, LocalStorage)**
*   **Public API**: Imgflip API

---

## ⚙️ How to Run the Project

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/avkashs0521/the-meme-factory.git
    ```
2.  **Navigate to the folder**:
    ```bash
    cd the-meme-factory
    ```
3.  **Run with a local server**:
    Since the project uses absolute/relative paths and may fetch external resources, it is recommended to use a local server:
    *   **Using Python**: `python3 -m http.server 3000`
    *   **Using VS Code**: Right-click `index.html` and select "Open with Live Server".
    *   **Using Node**: `npx serve`

4.  **View in Browser**: Open `http://localhost:3000` (or the port provided by your server).

---

## 🚀 Deployment

This project is ready to be deployed on platforms like **Vercel** or **Netlify**. Simply connect your GitHub repository and it will deploy as a static site automatically.

---

## 👤 Author

**Avkash Singh**

---

## ⭐ Acknowledgment

Thanks to **Imgflip API** for providing the meme data that powers this factory.
