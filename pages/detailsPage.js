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
    let formattedPrice = parseFloat(listing.price).toLocaleString();

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
                    <h2 class="price">Price: ${formattedPrice} ${listing.currency}</h2>
                </div>
                <div class="details-section">
                    <p class="location"><strong>Location:</strong> ${listing.location}</p>
                    <p class="shipping"><strong>Shipping:</strong> ${listing.shipping}</p>
                    <p class="status"><strong>Status:</strong> ${listing.status}</p>
                    <p class="published"><strong>Published:</strong> ${listing.publishedAt.toLocaleDateString()}</p>
                </div>
                <button class="seller-profile">Seller's Profile on Nostr</button>
                <button class="seller-listings">All Seller's Listings</button>
                <button id="copyButton">Copy URL</button>
            </div>
        </div>
    `;



let npub = window.NostrTools.nip19.npubEncode(listing.pubkey)
console.log(npub)
// Get the button element
const sellerProfileButton = document.querySelector(".seller-profile");
const sellerListingsButton = document.querySelector(".seller-listings");

// Add a click event listener to the button
sellerProfileButton.addEventListener("click", () => {
    const url = `https://njump.me/${npub}`;
  
    // Open the URL in a new browser window
    // window.location.href(url, "_blank");
    window.open(url, "_blank");
});

sellerListingsButton.addEventListener("click", () => {
    window.location.hash = `#profile/${listing.pubkey}`;
});



const copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', () => {
    // Get the current page's URL
    const currentUrl = window.location.href;
  
    // Copy the URL to the clipboard
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        // Show the alert for 1 second
        const alert = document.createElement('div');
        alert.textContent = 'Link copied to clipboard!';
        alert.style.position = 'fixed';
        alert.style.top = '50%';
        alert.style.left = '50%';
        alert.style.transform = 'translate(-50%, -50%)';
        alert.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        alert.style.color = 'white';
        alert.style.padding = '10px 20px';
        alert.style.borderRadius = '5px';
        alert.style.zIndex = '9999';
        document.body.appendChild(alert);
  
        setTimeout(() => {
          document.body.removeChild(alert);
        }, 1000);
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  });

}