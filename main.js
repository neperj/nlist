// Global variable to store the user's npub
let myNpub = null;
let myPk = null;
window.myPkey = null;

// Function to handle Nostr login
function handleNostrLogin() {
  if (typeof window.nostr !== 'undefined' && window.nostr !== null) {
    window.nostr.getPublicKey().then((pk) => {
      myPk = pk
      window.myPkey = myPk;
      myNpub = window.NostrTools.nip19.npubEncode(pk);
      console.log('Logged in as:', myNpub);
      updateNavLinks();
    }).catch((err) => {
      console.error('Error getting public key:', err);
    });
  } else {
    console.error('Nostr extension not found. Please install a Nostr extension to use this application.');
  }
}

// Function to update the navigation links
function updateNavLinks() {
  const myProfile = document.getElementById('profileLink');

  if (myNpub === null) {
    
    profileLink.textContent = 'Log In';
  } else {
   
    myProfile.textContent = myNpub.slice(0, 9) + "...";
    myProfile.addEventListener("click", () => {
      window.location.hash = `#profile/${myPk}`;
  });
  }
}

// Check for Nostr extension and attempt to log in on page load
window.addEventListener('load', () => {
  handleNostrLogin();
});



const routes = {
    '#': homePageHandler,
    '#listing': listingPageHandler,
    '#details': detailsPageHandler,
    '#profile': profilePageHandler,
    '#post': postingPageHandler,
};

function handleRoute() {
    const hash = window.location.hash || '#';
    const baseHash = hash.split('/')[0]; // Handle cases like #details/123
    const handler = routes[baseHash] || routes['#'];
    handler();
}



document.addEventListener('DOMContentLoaded', () => {
    // Initial route handling
    handleRoute();

    // Listen for hash changes
    window.addEventListener('hashchange', handleRoute);
});