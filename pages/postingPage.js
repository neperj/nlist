async function postingPageHandler() {
  try {
    let mainContent = document.querySelector("#main");
    mainContent.innerHTML = `
      <div class="posting-container">
        <h1>Post a Listing</h1>
        <div class="post-details">
          <form id="post-form">
            <div class="form-group">
              <label for="tags">Choose a Category:</label>
              <div class="category-select">
                <select id="tags" required>
                  ${config.categories
                    .map(
                      (category) => `
                    <optgroup label="${category.title}">
                      ${category.items
                        .map(
                          (item) => `
                        <option value="${item.name}">${item.displayName}</option>
                      `
                        )
                        .join("")}
                    </optgroup>
                  `
                    )
                    .join("")}
                </select>
                <div class="custom-category-checkbox">
                  <input type="checkbox" id="custom-category-checkbox">
                  <label for="custom-category-checkbox">Custom Category</label>
                </div>
              </div>
            </div>
            <div class="form-group" id="custom-category-group" style="display: none;">
              <label for="custom-category">Custom Category:</label>
              <input type="text" id="custom-category" placeholder="Enter a custom category">
            </div>

            <div class="form-group">
              <label for="title">Title:</label>
              <input type="text" id="title" placeholder="Enter a title for your listing" required>
            </div>
            <div class="form-group">
              <label for="content">Description:</label>
              <textarea id="content" placeholder="Describe your item or service" required></textarea>
            </div>


            <div class="form-group">
              <label for="summary">Summary:</label>
              <textarea id="summary" placeholder="Describe your item or service" required></textarea>
            </div>            
            <div class="form-group">
              <label for="price">Price:</label>
              <div class="price-input">
                <input type="number" id="price" placeholder="Enter a price">
                <select id="currency">
                  <option value="">Select Currency</option>
                  <option value="SATS">SATS</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <select id="frequency">
                  <option value="">Select Frequency</option>
                  <option value="hour">Hourly</option>
                  <option value="day">Daily</option>
                  <option value="month">Monthly</option>
                </select>
              </div>
            </div>
            <div class="form-group">
            <label for="location">Location:</label>
            <input type="text" id="location" placeholder="Enter a location">
            </div>
            <div class="form-group">
              <label for="image-input">Images:</label>
              <textarea id="image-input" placeholder="Enter image URLs separated by space"></textarea>
              <div class="image-input-helper">
                <p>Enter the URLs of the images you want to upload, separated by spaces.</p>
              </div>
            </div>
         
            <button type="submit">Post (WIP)</button>
          </form>
        </div>
      </div>
    `;
    let postForm = document.getElementById("post-form");
    let tagsSelect = document.getElementById("tags");
    let customCategoryGroup = document.getElementById("custom-category-group");
    let customCategoryCheckbox = document.getElementById(
      "custom-category-checkbox"
    );

    customCategoryCheckbox.addEventListener("change", () => {
      if (customCategoryCheckbox.checked) {
        tagsSelect.disabled = true;
        customCategoryGroup.style.display = "block";
      } else {
        tagsSelect.disabled = false;
        customCategoryGroup.style.display = "none";
      }
    });

    let contentTextarea = document.getElementById("content");
    contentTextarea.addEventListener("input", function () {
      this.rows = this.value.split("\n").length;
    });

    let imageInput = document.getElementById("image-input");
    imageInput.addEventListener("input", function () {
      this.rows = this.value.split("\n").length;
    });

    postForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      let kind = 30402;
      let createdAt = Math.floor(Date.now() / 1000);
      let content = document.getElementById("content").value;
      let summary = document.getElementById("summary").value;
      let title = document.getElementById("title").value;
      let price = document.getElementById("price").value || " ";
      let currency = document.getElementById("currency").value || " ";
      let frequency = document.getElementById("frequency").value || "null";
      let location = document.getElementById("location").value || "earth";

      let tTag = customCategoryCheckbox.checked
        ? document.getElementById("custom-category").value
        : document.getElementById("tags").value;
      let pubkey = "...";
      let sig = "...";

      let imageUrls = document
        .getElementById("image-input")
        .value.trim()
        .split(/\s+/);
      let imageTags = imageUrls.map((url) => ["image", url]);

      let eventTemplate = {
        kind,
        created_at: createdAt,
        content,
        tags: [
          ["d", "lorem-ipsum"],
          ["title", title],
          ["published_at", createdAt.toString()],
          ["t", tTag],
          ...imageTags,
          ["summary", summary],
          ["location", location],
          ["price", price, currency, frequency],
          [
            "e",
            "b3e392b11f5d4f28321cedd09303a748acfd0487aea5a7450b3481c60b6e4f87",
            "wss://relay.example.com",
          ],
          [
            "a",
            "30023:a695f6b60119d9521934a691347d9f78e8770b56da16bb255ee286ddf9fda919:ipsum",
            "wss://relay.nostr.org",
          ],
        ],
        pubkey,
        sig,
      };

      console.log(eventTemplate);
    });
  } catch (error) {
    console.error("Error rendering posting page:", error);
  }
}
