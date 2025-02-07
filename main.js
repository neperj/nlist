// Generate the secret key and public key
//let sk = window.NostrTools.generateSecretKey(); // `sk` is a Uint8Array
//let pk;
//
//// Wait for 2 seconds before generating and displaying the public key
//setTimeout(() => {
//  pk = window.NostrTools.getPublicKey(sk);
//  console.log(sk);
//  console.log(pk);
//
//  // Display the public key on the HTML
//  const pkDisplayElement = document.getElementById("pk-display");
//  pkDisplayElement.textContent = `Key: ${pk}`;
//}, 2000);


function router() {
  const pages = ['home', 'listing', 'profile', 'details'];
  const hash = window.location.hash.substring(1) || 'home';
  
  pages.forEach(page => {
    document.getElementById(page).style.display = 
      page === hash ? 'block' : 'none';
  });

  if (hash === 'listing') {
    // Trigger data fetching for listing page
    fetchListingData();
  }
}

// Initial page load and hash change listener
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

const relay = await window.NostrTools.Relay.connect('wss://nos.lol')
console.log(`connected to ${relay.url}`)

// Data fetching function
function fetchListingData() {
    
  let eventCount = 0;
  const maxEvents = 30;
  const eventContainer = document.getElementById('event-container');
  // should be based on hash in the URL, to get a specific list
  relay.subscribe([
    {
      kinds: [30402],
    },
  ], {
    onevent(event) {
      console.log('got event:', event);
      renderItem(event);
      eventCount++;
      if (eventCount >= maxEvents) {
        relay.close();
      }
    }
  });

  function renderItem(event) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-card';

    const getTagValue = (tagName) => {
      const tag = event.tags.find(tag => tag[0] === tagName);
      return tag ? tag[1] : null;
    };

    // Get all images
    const images = event.tags.filter(tag => tag[0] === 'image').map(tag => tag[1]);

    const itemHTML = `
      <h2>${getTagValue('title')}</h2>
      ${images.length > 0 ? `
        <div class="image-gallery">
          ${images.map(img => `
            <div class="image-thumbnail">
              <img src="${img}" alt="${getTagValue('title')}">
            </div>
          `).join('')}
        </div>
      ` : ''}
      <p class="summary">${getTagValue('summary')}</p>
      <div class="item-details">
        <p class="price">Price: ${getTagValue('price')} ${event.tags.find(tag => tag[0] === 'price')?.[2] || 'idk'}</p>
        <p class="location">Location: ${getTagValue('location')}</p>
        <p class="shipping">Shipping: ${event.tags.find(tag => tag[0] === 'shipping')?.[1] || 'N/A'}</p>
        <p class="status">Status: ${getTagValue('status')}</p>
        <p class="published">Published: ${new Date(parseInt(getTagValue('published_at')) * 1000).toLocaleDateString()}</p>
      </div>
    `;

    itemDiv.innerHTML = itemHTML;
    eventContainer.appendChild(itemDiv);
  }
}

    // Start browsing button
    document.getElementById('show-list').addEventListener('click', () => {
      window.location.hash = 'listing';
    });



    document.getElementById('nav-home').addEventListener('click', () => {
      window.location.hash = 'home';
    });



