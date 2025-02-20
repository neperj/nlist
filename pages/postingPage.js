async function postingPageHandler() {
  try {
    let mainContent = document.querySelector("#main");
    mainContent.innerHTML = `
      <div class="posting-container">
        <h1>Post a Listing</h1>
        <div class="post-details">
          <form id="post-form">
            <div class="form-group">
              <label for="tags">Category</label>
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
              <label for="custom-category">Custom Category</label>
              <input type="text" id="custom-category" placeholder="Enter a custom category">
            </div>

            <div class="form-group">
              <label for="title">Title*</label>
              <input type="text" id="title" placeholder="Enter a title for your listing" required>
            </div>
            <div class="form-group">
              <label for="content">Description*</label>
              <textarea id="content" placeholder="Describe your item or service" required></textarea>
            </div>


            <div class="form-group">
              <label for="summary">Summary*</label>
              <textarea id="summary" placeholder="Summary of your item or service" required></textarea>
            </div>            
            <div class="form-group">
              <label for="price">Price</label>
              <div class="price-input">
                <input type="number" id="price" placeholder="Enter a price">
                <select id="currency">
                  <option value="">Select Currency</option>
                  <option value="SATS">SATS</option>
                  <option value="BTC">BTC</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <select id="frequency">
                  <option value="">Select Frequency</option>
                  <option value=" ">one-time</option>
                  <option value="hour">Hourly</option>
                  <option value="day">Daily</option>
                  <option value="month">Monthly</option>
                </select>
              </div>
            </div>
            <div class="form-group">
            <label for="location">Location</label>
            <input type="text" id="location" placeholder="Enter a location">
            </div>
            <div class="form-group">
              <label for="image-input">Images</label>
              <textarea id="image-input" placeholder="Enter image URLs separated by space"></textarea>
              <div class="image-input-helper">
                <p>Enter the URLs of the images you want to upload, separated by spaces.</p>
              </div>
            </div>
            <div id="field-container"></div>
            <button type="button" id="add-field">Add Field</button>
         
            <button type="submit">console.log</button>
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
        tagsSelect.style.opacity = "0.5";
        customCategoryGroup.style.display = "block";
      } else {
        tagsSelect.disabled = false;
        tagsSelect.style.opacity = "1";
        customCategoryGroup.style.display = "none";
      }
    });

    let contentTextarea = document.getElementById("content");
    contentTextarea.addEventListener("input", function () {
      this.rows = this.value.split("\n").length;
    });

    function validateImageInput() {
      const imageInput = document.getElementById("image-input");
      const imageUrls = imageInput.value.trim().split(/\s+/);

      // Check if the field is empty (optional)
      if (imageUrls.length === 1 && imageUrls[0] === "") {
        // The field is empty, so you can proceed with the form submission
        console.log("Image input field is empty, submitting form...");
        let imageTags = [];
        return { imageUrls, imageTags, isValid: true };
      }

      // Validate each image URL
      let validImageUrls = [];
      let imageTags = [];
      let isValid = true;
      for (const url of imageUrls) {
        if (isValidImageUrl(url)) {
          validImageUrls.push(url);
          imageTags.push(["image", url]);
        } else {
          alert(`Invalid image URL: ${url}`);
          isValid = false;
        }
      }

      // Return the valid image URLs, image tags, and a flag indicating if all URLs are valid
      return { imageTags, isValid };
    }

    function isValidImageUrl(url) {
      // Use a regular expression to check if the URL has a common image file extension
      const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
      return imageExtensions.test(url);
    }

    let fieldContainer = document.getElementById("field-container");
    let addFieldButton = document.getElementById("add-field");
    addFieldButton.addEventListener("click", addField);
    function addField() {
      let newField = document.createElement("div");
      newField.classList.add("form-group");
      newField.dataset.index = fieldContainer.children.length;

      newField.innerHTML = `
        <label for="custom-field-name-${newField.dataset.index}">Field Name</label>
        <input type="text" id="custom-field-name-${newField.dataset.index}" placeholder="Enter a custom field name">
        <label for="custom-field-value-${newField.dataset.index}">Value</label>
        <input type="text" id="custom-field-value-${newField.dataset.index}" placeholder="Enter a custom field value">
        <button type="button" class="remove-field">Remove</button>
      `;
      let removeButton = newField.querySelector(".remove-field");
      removeButton.addEventListener("click", () => removeField(newField));

      fieldContainer.appendChild(newField);
    }

    function removeField(field) {
      field.remove();
    }

    postForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      let kind = 30402;
      let createdAt = Math.floor(Date.now() / 1000);
      let content = document.getElementById("content").value;
      let summary = document.getElementById("summary").value;
      let title = document.getElementById("title").value;
      let price = document.getElementById("price").value || " ";
      let currency = document.getElementById("currency").value || " ";
      let frequency = document.getElementById("frequency").value || " ";
      let location = document.getElementById("location").value || "earth";

      let tTag = customCategoryCheckbox.checked
        ? document.getElementById("custom-category").value || "noTag"
        : document.getElementById("tags").value || "nil";

      //let pubkey = "...";
      //let sig = "...";

      // Validate image input
      let { imageTags, isValid } = validateImageInput();
      if (!isValid) {
        console.log("Please fix the invalid image URLs and try again.");
        return;
      }

      //console.log("Image URLs:", imageUrls);
      //console.log("Image tags:", imageTags);

      let customFields = Array.from(fieldContainer.children).map((field) => {
        let name = field
          .querySelector(`#custom-field-name-${field.dataset.index}`)
          .value.trim();
        let value = field
          .querySelector(`#custom-field-value-${field.dataset.index}`)
          .value.trim();
        return [name, value];
      });

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
          //[
          //  "e",
          //  "b3e392b11f5d4f28321cedd09303a748acfd0487aea5a7450b3481c60b6e4f87",
          //  "wss://relay.example.com",
          //],
          //[
          //  "a",
          //  "30023:a695f6b60119d9521934a691347d9f78e8770b56da16bb255ee286ddf9fda919:ipsum",
          //  "wss://relay.nostr.org",
          //],
          ...customFields,
        ],
        //  pubkey,
        //  sig,
      };
      let finalevent = eventExtenstionSign(eventTemplate);
      finalevent
        .then((event) => {
          console.log(event);

          setTimeout(() => {
            let isGood = window.NostrTools.verifyEvent(event);
            console.log(isGood);
          }, 300);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  } catch (error) {
    console.error("Error rendering posting page:", error);
  }
}

function eventExtenstionSign(eventTemplate) {
  if (typeof window.nostr !== "undefined" && app.myNpub !== null) {
    return window.nostr
      .signEvent(eventTemplate)
      .then((finalizedEvent) => {
        return finalizedEvent;
      })
      .catch((err) => {
        console.error("Error signing event:", err);
        throw err;
      });
  } else {
    console.error("are you logged in?");
    return Promise.reject("are you logged in?");
  }
}
