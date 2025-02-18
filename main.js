let app = {
  isLoggedIn: false,
  myPk: null,
  myNpub: null,
  currentPage: null,
  theme: localStorage.getItem("theme") || "dark",
};

let appTitleElements = document.querySelectorAll("#app-title");
appTitleElements.forEach((element) => {
  element.textContent = config.app_title;
});

let routes = {
  "#": homePageHandler,
  "#listing": listingsPageHandler,
  "#details": detailsPageHandler,
  "#profile": profilePageHandler,
  "#post": postingPageHandler,
  "#contact": contactPageHandler,
  "#faq": faqPageHandler,
  "*": () => {
    console.error("Invalid route");
    window.location.hash = "#";
  },
};

document.addEventListener("DOMContentLoaded", () => {
  handleRoute();
  window.addEventListener("hashchange", handleRoute);

  window.addEventListener("load", () => {
    setTimeout(handleNostrLogin, 1000);
  });
});

function handleRoute() {
  let hash = window.location.hash || "#";
  let baseHash = hash.split("/")[0];
  let handler = routes[baseHash] || routes["*"];
  let mainContent = document.querySelector("#main");
  mainContent.classList.remove("visible");
  mainContent.classList.add("hiding");

  updateApp({ currentPage: baseHash.slice(1) });

  handler();
  window.scrollTo(0, 0);
  setTimeout(() => {
    mainContent.classList.remove("hiding");
    mainContent.classList.add("visible");
  }, 300);
}

function updateApp(newState) {
  Object.assign(app, newState);
  renderNavLinks();
  toggleElementVisibility();
}

function handleNostrLogin() {
  if (typeof window.nostr !== "undefined" && window.nostr !== null) {
    window.nostr
      .getPublicKey()
      .then((pk) => {
        let myNpub = window.NostrTools.nip19.npubEncode(pk);
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
  let profileLink = document.getElementById("profileLink");

  if (app.isLoggedIn) {
    profileLink.textContent = app.myNpub.slice(0, 9) + "...";
    profileLink.addEventListener("click", () => {
      window.location.hash = `#profile/${app.myPk}`;
    });
  } else {
    profileLink.textContent = "Log In";
    profileLink.removeEventListener("click", () => {});
  }
}

function toggleElementVisibility() {
  let searchElement = document.querySelector(".sidebar-search");
  if (
    app.currentPage === "home" ||
    app.currentPage === "" ||
    app.currentPage === "listing"
  ) {
    searchElement.classList.add("visible");
  } else {
    searchElement.classList.remove("visible");
  }
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let searchInput = searchForm.querySelector("input[type='text']");
  let searchTag = searchInput.value.trim();

  if (searchTag !== "") {
    let url = `#listing/${searchTag}`;
    window.location.href = url;

    searchInput.value = "";
  } else {
    console.log("Please enter a search tag.");
  }
});

const toggleThemeButton = document.getElementById("toggleTheme");
const body = document.documentElement;

// Check the stored theme when the page loads
if (app.theme === "light") {
  body.classList.add("light-theme");
  toggleThemeButton.textContent = "🌙";
} else {
  body.classList.remove("light-theme");
  toggleThemeButton.textContent = "☀️";
}

toggleThemeButton.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  if (body.classList.contains("light-theme")) {
    app.theme = "light"; // Update the theme in the app object
    localStorage.setItem("theme", "light"); // Store the theme in localStorage
    toggleThemeButton.textContent = "🌙";
  } else {
    app.theme = "dark"; // Update the theme in the app object
    localStorage.setItem("theme", "dark"); // Store the theme in localStorage
    toggleThemeButton.textContent = "☀️";
  }
});
