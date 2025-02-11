async function listingsPageHandler() {
    try {
        const mainContent = document.querySelector('#main');
        const tag = window.location.hash.split('/')[1];
        
        if (!tag) {
            window.location.hash = '#';
            return;
        }
    
        mainContent.innerHTML = `
            <div class="listings-container">
                <h1>${tag}</h1>
                <div id="event-container"></div>
            </div>
        `;
    
        let limit = 30;
        const nostr = new NostrService();
        let listings;
    
        if (tag === 'all') {
            limit = 100;
            listings = await nostr.getAllListings(limit);
        } else {
            listings = await nostr.getListings(limit, tag);
        }
    
        const container = document.getElementById('event-container');
        listings.forEach(event => {
            const card = new ListingCard(event);
            container.appendChild(card.render());
        });
    } catch (error) {
      console.error('Error rendering listings page:', error);
    }
  }
  