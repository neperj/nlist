async function detailsPageHandler() {
    try {
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
          <div class="price-section">
            <h2 class="price">Price: ${formatPrice(listing.price)} ${listing.currency} ${listing.frequency}</h2>
          </div>
          <div class="listing-details">
            <hr/>
            <p>Content:</p>
            <h3 class="item-content">${listing.content}</h3>
            <hr/>
            <p>Description:</p>
            <p class="description">${listing.summary}</p>
            <div class="details-section">
              <p class="location"><strong>Location:</strong> ${listing.location}</p>
              <p class="shipping"><strong>Shipping:</strong> ${listing.shipping}</p>
              <p class="status"><strong>Status:</strong> ${listing.status}</p>
              <p class="published"><strong>Published:</strong> ${formatDate(listing.publishedAt)}</p>
              <p class="published"><strong>Last Edit:</strong> ${formatDate(listing.editedAt)}</p>
              
            </div>
            <button class="seller-profile">Seller's Profile on Nostr</button>
            <button class="seller-listings">All Seller's Listings</button>
            <button id="copyButton">Copy URL</button>
          </div>
        </div>
      `;
  
      setupEventListeners(listing);
    } catch (error) {
      console.error('Error rendering details page:', error);
      // Handle the error, e.g., display an error message to the user
    }
  }
  
  function formatPrice(price) {
    return parseFloat(price).toLocaleString();
  }
  
  function formatDate(timestamp) {
    const date = new Date(parseInt(timestamp * 1000));
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }
  
  function setupEventListeners(listing) {
    const npub = window.NostrTools.nip19.npubEncode(listing.pubkey);
  
    const sellerProfileButton = document.querySelector('.seller-profile');
    const sellerListingsButton = document.querySelector('.seller-listings');
    const copyButton = document.getElementById('copyButton');
  
    // Add a click event listener to the seller profile button
    sellerProfileButton.addEventListener('click', () => {
      const url = `https://njump.me/${npub}`;
      window.open(url, '_blank');
    });
  
    // Add a click event listener to the seller listings button
    sellerListingsButton.addEventListener('click', () => {
      window.location.hash = `#profile/${listing.pubkey}`;
    });
  
    // Add a click event listener to the copy button
    copyButton.addEventListener('click', () => {
      copyToClipboard(window.location.href);
    });
  }
  
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        showCopyAlert();
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  }
  
  function showCopyAlert() {
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
  }
  