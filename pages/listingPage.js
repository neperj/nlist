async function listingPageHandler() {
    const mainContent = document.querySelector('#main');
    mainContent.innerHTML = `
        <div class="listings-container">
            <h1>Listings</h1>
            <div id="event-container"></div>
        </div>
    `;

    const nostr = new NostrService();
    const listings = await nostr.getListings();
    
    const container = document.getElementById('event-container');
    listings.forEach(event => {
        const card = new ListingCard(event);
        container.appendChild(card.render());
    });
}