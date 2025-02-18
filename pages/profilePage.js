async function profilePageHandler() {
  try {
    let mainContent = document.querySelector("#main");
    let profile = window.location.hash.split("/")[1];

    if (!profile) {
      window.location.hash = "#";
      return;
    }

    let settingsSection = getSettingsSection(profile);
    let profileNpub = getProfileNpub(profile);

    mainContent.innerHTML = `
      <div class="profile-container">
        ${settingsSection}
      <div class="profile-card">
      <div class="nostr-picture-container">
      <nostr-picture></nostr-picture>
      </div>
        <nostr-name></nostr-name>
        <button class="seller-profile">Profile on Nostr 🚀</button>
      </div>
        
       <!--<h1>${profile}</h1>
        <h2>${profileNpub}</h2>-->
        <div class="profile-details">
          <div id="profile-event-container"></div>
        </div>
      </div>
    `;
    document.querySelector("nostr-name").setAttribute("pubkey", profile);
    document.querySelector("nostr-picture").setAttribute("pubkey", profile);
    let limit = 100;
    let nostr = new NostrService();
    let listings = await nostr.getNpubListings(limit, profile);

    let container = document.getElementById("profile-event-container");
    listings.forEach((event, index) => {
      let card = new ListingCard(event);
      card.index = index;
      container.appendChild(card.render());
    });

    let sellerProfileButton = document.querySelector(".seller-profile");
    sellerProfileButton.addEventListener("click", () => {
      let url = `https://njump.me/${profileNpub}`;
      window.open(url, "_blank");
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
