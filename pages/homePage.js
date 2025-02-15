async function homePageHandler() {
  try {
    let mainContent = document.querySelector("#main");
    let categoryHTML = "";

    config.categories.forEach((category) => {
      categoryHTML += `
        <div class="category-column">
          <h3>~ ${category.title} ~</h3>
          ${category.items
            .map(
              (item) => `
              <button class="tag-button" data-target="${item.name}">${item.displayName}</button>
            `
            )
            .join("")}
        </div>
      `;
    });

    mainContent.innerHTML = `
      <div class="home-container">
        <section id="intro-section">
          <p id="app-description">${config.app_description}</p>
        </section>
        <div class="cl-categories">${categoryHTML}</div>
      </div>
    `;

    let tagButtons = document.querySelectorAll(".tag-button");

    tagButtons.forEach((button) => {
      button.addEventListener("click", handleTagButtonClick);
    });

    function handleTagButtonClick(event) {
      let target = event.target.getAttribute("data-target");

      let url = `#listing/${target}`;

      window.location.href = url;
    }
  } catch (error) {
    console.error("Error rendering posting page:", error);
  }
}
