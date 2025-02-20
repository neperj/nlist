class ListingCard {
  constructor(event) {
    this.listing = EventParser.parseListingData(event);
  }

  render() {
    let element = document.createElement("div");
    element.className = "item-card";
    element.innerHTML = `
      <div class="status-price">
        <p class="status">Status: ${this.listing.status}</p> 
        <div class="price"><h3>${formatPrice(this.listing.price)} ${
      this.listing.currency
    } ${this.listing.frequency}</h3>
      </div></div>
      <h2 class="title">${this.listing.title}</h2>
      <hr class="solid">

      ${
        this.listing.images.length > 0
          ? `
        <div class="image-gallery">
          ${this.listing.images
            .map(
              (img) => `
            <div class="image-thumbnail">
              <img src="${img}" alt="${this.listing.title}">
            </div>
          `
            )
            .join("")}
        </div>
      `
          : ""
      }
      <p class="summary">${this.listing.summary}</p>
      <div class="item-details">
       
        <div class="location-shipping">
          <p class="location">📍 ${this.listing.location}</p>
          <p class="separator-locship">~</p>
          <p class="shipping">🚢 ${this.listing.shipping}</p>

        </div>
        <p class="published">Published: ${formatTimestamp(
          this.listing.publishedAt
        )}</p>
      </div>
    `;

    element.addEventListener("click", () => {
      window.location.hash = `#details/${this.listing.id}`;
    });
    setTimeout(() => {
      element.classList.add("visible");
    }, 200 * this.index);

    return element;
  }
}

function formatPrice(price) {
  return parseFloat(price).toLocaleString();
}

function formatTimestamp(timestamp) {
  let now = new Date().getTime();
  let diff = now - timestamp * 1000; // Convert Unix timestamp to milliseconds

  let seconds = Math.floor(diff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}
