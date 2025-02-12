async function homePageHandler() {
  try {
    const mainContent = document.querySelector("#main");
    let categoryHTML = "";

    config.categories.forEach((category) => {
      categoryHTML += `
        <div class="category-column">
          <h3>${category.title}</h3>
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
          <p>Discover curated listings</p>
        </section>
        <div class="cl-categories">${categoryHTML}</div>
      </div>
    `;

    const tagButtons = document.querySelectorAll(".tag-button");

    tagButtons.forEach((button) => {
      button.addEventListener("click", handleTagButtonClick);
    });

    function handleTagButtonClick(event) {
      const target = event.target.getAttribute("data-target");

      const url = `#listing/${target}`;

      window.location.href = url;
    }
  } catch (error) {
    console.error("Error rendering posting page:", error);
  }
}
