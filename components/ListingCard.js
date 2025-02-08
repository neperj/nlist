class ListingCard {
  constructor(event) {
    this.listing = EventParser.parseListingData(event);
  }

  render() {
    const element = document.createElement('div');
    element.className = 'item-card';
    element.innerHTML = `
      <h2>${this.listing.title}</h2>
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
        <p class="price">Price: ${this.listing.price} ${this.listing.currency}</p>
        <p class="location">Location: ${this.listing.location}</p>
        <p class="shipping">Shipping: ${this.listing.shipping}</p>
        <p class="status">Status: ${this.listing.status}</p>
        <p class="published">Published: ${this.listing.publishedAt.toLocaleDateString()}</p>
      </div>
    `;

    element.addEventListener('click', () => {
      window.location.hash = `#details/${this.listing.id}`;
  });

    return element;
  }
}