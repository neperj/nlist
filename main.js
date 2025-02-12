const app = {
  isLoggedIn: false,
  myPk: null,
  myNpub: null,
};

const routes = {
  "#": homePageHandler,
  "#listing": listingsPageHandler,
  "#details": detailsPageHandler,
  "#profile": profilePageHandler,
  "#post": postingPageHandler,
  "*": () => {
    console.error("Invalid route");
    window.location.hash = "#";
  },
};

document.addEventListener("DOMContentLoaded", () => {
  handleRoute();
  window.addEventListener("hashchange", handleRoute);

  // Check for Nostr extension and attempt to log in on page load
  window.addEventListener("load", () => {
    setTimeout(handleNostrLogin, 1000);
  });
});

function handleRoute() {
  const hash = window.location.hash || "#";
  const baseHash = hash.split("/")[0]; // Handle cases like #details/123
  const handler = routes[baseHash] || routes["*"];
  handler();
  window.scrollTo(0, 0);
}

function updateApp(newState) {
  Object.assign(app, newState); // Merge new state with existing state
  renderNavLinks(); // Update UI based on the new state
}

function handleNostrLogin() {
  if (typeof window.nostr !== "undefined" && window.nostr !== null) {
    window.nostr
      .getPublicKey()
      .then((pk) => {
        const myNpub = window.NostrTools.nip19.npubEncode(pk);
        updateApp({
          isLoggedIn: true,
          myPk: pk,
          myNpub: myNpub,
        });
        console.log("Logged in as:", myNpub);
      })
      .catch((err) => {
        console.error("Error getting public key:", err);
      });
  } else {
    console.error(
      "Nostr extension not found. Please install a Nostr extension to use this application."
    );
  }
}

function renderNavLinks() {
  const profileLink = document.getElementById("profileLink");

  if (app.isLoggedIn) {
    profileLink.textContent = app.myNpub.slice(0, 9) + "...";
    profileLink.addEventListener("click", () => {
      window.location.hash = `#profile/${app.myPk}`;
    });
  } else {
    profileLink.textContent = "Log In";
    profileLink.removeEventListener("click", () => {}); // Remove any existing listeners
  }
}
