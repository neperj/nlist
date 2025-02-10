async function profilePageHandler() {
    const mainContent = document.querySelector('#main');
    const profile = window.location.hash.split('/')[1];

    if (!profile) {
        window.location.hash = '#';
        return;
    }

    profileNpub = window.NostrTools.nip19.npubEncode(profile)
    let settingsSection = '';
    if (window.myPkey === profile) {
        settingsSection = `
            <div class="settings-section">
                <h2>Settings</h2>
                <!-- Add profile settings here -->
            </div>
        `;
    }
    mainContent.innerHTML = `
        <div class="profile-container">
            ${settingsSection}
            <h1>${profile}</h1>
            <h2>${profileNpub}</h2>
            <div class="profile-details">
                
                <div id="profile-event-container"></div>
                
                

            </div>
        </div>
    `;
    let limit = 100;
    const nostr = new NostrService();
    const listings = await nostr.getNpubListings(limit, profile);
    
    const container = document.getElementById('profile-event-container');
    listings.forEach(event => {
        const card = new ListingCard(event);
        container.appendChild(card.render());
    });
}