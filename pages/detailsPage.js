async function detailsPageHandler() {
  try {
    let mainContent = document.querySelector("#main");
    let id = window.location.hash.split("/")[1];

    if (!id) {
      window.location.hash = "#listing";
      return;
    }

    mainContent.innerHTML = "<div>Loading...</div>";

    let nostr = new NostrService();
    let event = await nostr.getListing(id);
    let listing = EventParser.parseListingData(event);

    mainContent.innerHTML = `
        <div class="details-container">
          <h1>${listing.title}</h1>
          <div class="price-section">
            <h2 class="price">Price: ${formatPrice(listing.price)} ${
      listing.currency
    } ${listing.frequency}</h2>
          </div>          
          ${
            listing.images.length > 0
              ? `
            <div class="image-gallery-large">
              ${listing.images
                .map(
                  (img) => `
                <div class="image-large">
                  <img src="${img}" alt="${listing.title}">
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }

          <div class="listing-details">
            <hr/>
            <p>Content:</p>
            <h3 class="item-content">${listing.content}</h3>
            <hr/>
            <p>Description:</p>
            <p class="description">${listing.summary}</p>
            <div class="details-section">
              <p class="location"><strong>Location:</strong> ${
                listing.location
              }</p>
              <p class="shipping"><strong>Shipping:</strong> ${
                listing.shipping
              }</p>
              <p class="status"><strong>Status:</strong> ${listing.status}</p>
              <div class="additional-tags">
                <button class="toggle-button">Additional Tags</button>
                <div class="collapsible-content">
                  <ul>
                    ${Object.entries(listing.tags)
                      .map(
                        ([key, value]) => `
                      <li><strong>${key}:</strong>
                        ${
                          Array.isArray(value)
                            ? value.map((item) => `(${item})`).join(" ")
                            : `(${value})`
                        }
                      </li>
                    `
                      )
                      .join("")}
                  </ul>
                </div>
              </div>
              <p class="published"><strong>Published:</strong> ${formatDate(
                listing.publishedAt
              )}</p>
              <p class="published"><strong>Last Edit:</strong> ${formatDate(
                listing.editedAt
              )}</p>
              
            </div>
            <button class="seller-profile">Seller's Profile on Nostr 🚀</button>
            <button class="seller-listings">All Seller's Listings</button>
            <button id="copyButton">Copy URL</button>
          </div>
        </div>
      `;

    setupEventListeners(listing);
  } catch (error) {
    console.error("Error rendering details page:", error);
  }
}

function formatPrice(price) {
  return parseFloat(price).toLocaleString();
}

function formatDate(timestamp) {
  let date = new Date(parseInt(timestamp * 1000));
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

function setupEventListeners(listing) {
  let npub = window.NostrTools.nip19.npubEncode(listing.pubkey);

  document
    .querySelector(".toggle-button")
    .addEventListener("click", function () {
      const content = this.nextElementSibling;
      content.classList.toggle("expanded");
    });

  let sellerProfileButton = document.querySelector(".seller-profile");
  let sellerListingsButton = document.querySelector(".seller-listings");
  let copyButton = document.getElementById("copyButton");

  sellerProfileButton.addEventListener("click", () => {
    let url = `https://njump.me/${npub}`;
    window.open(url, "_blank");
  });

  sellerListingsButton.addEventListener("click", () => {
    window.location.hash = `#profile/${listing.pubkey}`;
  });

  copyButton.addEventListener("click", () => {
    copyToClipboard(window.location.href);
  });
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showCopyAlert();
    })
    .catch((error) => {
      console.error("Failed to copy text:", error);
    });
}

function showCopyAlert() {
  let alert = document.createElement("div");
  alert.textContent = "Link copied to clipboard!";
  alert.style.position = "fixed";
  alert.style.top = "50%";
  alert.style.left = "50%";
  alert.style.transform = "translate(-50%, -50%)";
  alert.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  alert.style.color = "white";
  alert.style.padding = "10px 20px";
  alert.style.borderRadius = "5px";
  alert.style.zIndex = "9999";
  document.body.appendChild(alert);

  setTimeout(() => {
    document.body.removeChild(alert);
  }, 1000);
}
