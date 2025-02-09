async function listingPageHandler() {

    const tag = window.location.hash.split('/')[1];
    
    if (!tag) {
        window.location.hash = '#';
        return;
    }

    const mainContent = document.querySelector('#main');
    mainContent.innerHTML = `
        <div class="listings-container">
            <h1>${tag}</h1>
            <div id="event-container"></div>
        </div>
    `;
    let limit = 30;
    const nostr = new NostrService();
    const listings = await nostr.getListings(limit, tag);
    
    const container = document.getElementById('event-container');
    listings.forEach(event => {
        const card = new ListingCard(event);
        container.appendChild(card.render());
    });
}