class ListingCard {
  constructor(event) {
    this.listing = EventParser.parseListingData(event);
  }

  render() {
    const element = document.createElement('div');
    element.className = 'item-card';
    element.innerHTML = `
      <div class="title-price">
        <h2 class="title">${this.listing.title}</h2>
        <h3 class="price">Price: ${formatPrice(this.listing.price)} ${this.listing.currency} ${this.listing.frequency}</h3>
      </div>
      ${this.listing.images.length > 0 ? `
        <div class="image-gallery">
          ${this.listing.images.map(img => `
            <div class="image-thumbnail">
              <img src="${img}" alt="${this.listing.title}">
            </div>
          `).join('')}
        </div>
      ` : ''}
      <p class="summary">${this.listing.summary}</p>
      <div class="item-details">
        <div class="published-status">
          <p class="status">Status: ${this.listing.status}</p>
          <p class="published">Published: ${formatTimestamp(this.listing.publishedAt)}</p>
        </div>
        <div class="location-shipping">
          <p class="location">Location: ${this.listing.location}</p>
          <p class="shipping">Shipping: ${this.listing.shipping}</p>
        </div>
      </div>
    `;

    element.addEventListener('click', () => {
      window.location.hash = `#details/${this.listing.id}`;
    });

    return element;
  }
}

function formatPrice(price) {
  return parseFloat(price).toLocaleString();
}

function formatTimestamp(timestamp) {
  const now = new Date().getTime();
  const diff = now - timestamp * 1000; // Convert Unix timestamp to milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

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
