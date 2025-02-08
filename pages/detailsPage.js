async function detailsPageHandler() {
    const mainContent = document.querySelector('#main');
    const id = window.location.hash.split('/')[1];
    
    if (!id) {
        window.location.hash = '#listing';
        return;
    }

    // Show loading state
    mainContent.innerHTML = '<div>Loading...</div>';

    const nostr = new NostrService();
    const event = await nostr.getListing(id);
    const listing = EventParser.parseListingData(event);

    mainContent.innerHTML = `
        <div class="details-container">
            <h1>${listing.title}</h1>
            ${listing.images.length > 0 ? `
                <div class="image-gallery-large">
                    ${listing.images.map(img => `
                        <div class="image-large">
                            <img src="${img}" alt="${listing.title}">
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            <div class="listing-details">
                <p class="description">${listing.summary}</p>
                <div class="price-section">
                    <h2>Price: ${listing.price} ${listing.currency}</h2>
                </div>
                <div class="details-section">
                    <p><strong>Location:</strong> ${listing.location}</p>
                    <p><strong>Shipping:</strong> ${listing.shipping}</p>
                    <p><strong>Status:</strong> ${listing.status}</p>
                    <p><strong>Published:</strong> ${listing.publishedAt.toLocaleDateString()}</p>
                </div>
                <button class="contact-seller">Contact Seller</button>
            </div>
        </div>
    `;

      // Assuming 'listing.pubkey' is a variable containing the dynamic data


let npub = window.NostrTools.nip19.npubEncode(listing.pubkey)

// Get the button element
const contactSellerButton = document.querySelector(".contact-seller");

// Add a click event listener to the button
contactSellerButton.addEventListener("click", () => {
  // Construct the URL with the dynamic data
  const url = `https://njump.me/${npub}`;

  // Open the URL in a new browser window
  // window.location.href(url, "_blank");
  window.open(url, "_blank");
});

}