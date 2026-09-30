# 🎓 Campus Club Explorer (CampusConnect)

> A modern, clean, and responsive student club discovery portal designed for universities and colleges. Built with pure **HTML5**, **Vanilla CSS3**, and **beginner-friendly JavaScript (DOM Manipulation)**.

---

## 📌 Project Overview

**Campus Club Explorer** (branded as **CampusConnect**) solves a common problem on college campuses: helping freshmen and undergraduate students discover extracurricular clubs, student chapters, and technical societies. 

Students can explore active campus organizations across different domains (Technology, Sports, Arts, Photography, Entrepreneurship, Social Service), search dynamically, view comprehensive club schedules and activities, and submit membership registration applications.

This project was built specifically to showcase clean frontend fundamentals for academic evaluation and portfolio presentation.

---

## ✨ Features

- **🎨 Modern & Premium UI/UX:**
  - Curated color palette with clean slate backgrounds and vibrant blue/purple accents.
  - Modern typography using Google's *Plus Jakarta Sans*.
  - Rounded cards with multi-layered shadows and smooth CSS hover animations.
  - Fully responsive across desktop, tablet, and mobile screens.

- **🔍 Live Search & Multi-Filter:**
  - Real-time search bar that filters clubs by name or category as you type.
  - 7 domain category filters: *All Clubs, Technology, Sports, Arts & Culture, Photography, Entrepreneurship, and Social Service*.
  - Search and category filters work concurrently using basic loops and conditionals.
  - User-friendly empty state with a "Reset All Filters" action when no matches are found.

- **📋 Dynamic Club Cards:**
  - 8 distinct sample clubs rendered dynamically from JavaScript objects:
    1. **ACM Student Chapter** (Technology)
    2. **Google Developer Student Club** (Technology)
    3. **Robotics Club** (Technology)
    4. **Sports Club** (Sports)
    5. **Music & Dance Club** (Arts & Culture)
    6. **Photography Club** (Photography)
    7. **Entrepreneurship Cell** (Entrepreneurship)
    8. **NSS Club** (Social Service)
  - Each card shows category tags, member statistics, descriptions, and action triggers.

- **🪟 Interactive Modals:**
  - **Club Details Modal:** Displays full description, meeting times, campus locations, member counts, and a list of key annual activities.
  - **Registration Form Modal:** Allows students to apply to any club with input validation (name, college email check with `@`, registration number, and club choice).
  - Can be dismissed via close buttons, backdrop click, or pressing the `Escape` key.

- **📱 Mobile Friendly Navigation:**
  - Sticky navigation bar with mobile hamburger menu toggle.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure, accessible modal dialogs, and forms |
| **CSS3** | Vanilla styling, Flexbox, CSS Grid, custom properties (variables), media queries, and animations |
| **JavaScript (ES6 Basics)** | DOM selection, event listeners, dynamic card generation, filtering, and form validation |

> **Note for Evaluators:** This project strictly uses only core fundamentals:
> - **NO** external UI frameworks (No Tailwind, No Bootstrap)
> - **NO** heavy JavaScript libraries or frameworks (No React, Vue, or Angular)
> - **NO** complex asynchronous patterns or advanced array iterators (No `filter()`, `map()`, `reduce()`, or `async/await`)
> - **Pure standard DOM manipulation** utilizing `for` loops, `if-else` branches, and `.innerHTML`

---

## 📂 Project Structure

```text
Campus Club Explorer/
├── index.html     # Semantic HTML5 markup, navigation, hero, modals & footer
├── style.css      # Custom styling, color system, card layouts & media queries
├── script.js      # Club data array, filtering logic, modal & form handlers
└── README.md      # Project documentation
```

---

## 🚀 Getting Started

No installation, build tools, or local server setups are required!

### Method 1: Direct Browser Launch
1. Clone or download this repository:
   ```bash
   git clone https://github.com/084divyanshuraj/Campus-Club-Explorer-UI-only-.git
   ```
2. Navigate to the project directory.
3. Double-click **`index.html`** or right-click and select **Open with > Google Chrome** (or your browser of choice).

### Method 2: VS Code Live Server (Optional)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension.
3. Right-click on `index.html` and click **"Open with Live Server"**.

---

## 💡 JavaScript Concepts Implemented

This project is tailored for academic presentation. Here are the core concepts applied:

1. **Arrays & Objects:** Storing structured club information in an array of simple key-value objects.
2. **Standard `for` Loops:** Iterating over the array to generate dynamic HTML markup and parse DOM node lists.
3. **`if-else` Logic:** Performing category filtering, search keyword comparisons, and form validation.
4. **DOM Selection:** Retrieving page elements with `document.getElementById()` and `document.querySelector()`.
5. **DOM Manipulation:** Updating content with `.innerHTML` and `.textContent`, and controlling visibility via `classList.add()`, `classList.remove()`, and `classList.toggle()`.
6. **String Manipulation:** Using `.toLowerCase()` and `.includes()` for case-insensitive search queries.
7. **Form Validation:** Validating user input and ensuring email integrity before showing success alerts.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request if you'd like to expand club categories or add features.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---


