async function profilePageHandler() {
  try {
    const mainContent = document.querySelector("#main");
    const profile = window.location.hash.split("/")[1];

    if (!profile) {
      window.location.hash = "#";
      return;
    }

    const settingsSection = getSettingsSection(profile);
    const profileNpub = getProfileNpub(profile);

    mainContent.innerHTML = `
      <div class="profile-container">
        ${settingsSection}
      <div class="profile-card">
      <nostr-picture></nostr-picture>
        <nostr-name></nostr-name>
        
      </div>
        <div class="profile-details">
          <div id="profile-event-container"></div>
        </div>
      </div>
    `;

    document.querySelector('nostr-name').setAttribute('pubkey', profile);
    document.querySelector('nostr-picture').setAttribute('pubkey', profile);
    const limit = 100;
    const nostr = new NostrService();
    const listings = await nostr.getNpubListings(limit, profile);

    const container = document.getElementById("profile-event-container");
    listings.forEach((event) => {
      const card = new ListingCard(event);
      container.appendChild(card.render());
    });
  } catch (error) {
    console.error("Error rendering profile page:", error);
  }
}

function getSettingsSection(profile) {
  if (app.myPk === profile) {
    return `
      <div class="settings-section">
        <h2>Settings <== visible if my npub</h2>
        <!-- Add profile settings here -->
      </div>
    `;
  }
  return "";
}

function getProfileNpub(profile) {
  return window.NostrTools.nip19.npubEncode(profile);
}
