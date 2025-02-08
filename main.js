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