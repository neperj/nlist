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





const relay = await window.NostrTools.Relay.connect('wss://nos.lol')
console.log(`connected to ${relay.url}`)

let eventCount = 0;
const maxEvents = 10; // Set the maximum number of events to receive
const eventContainer = document.getElementById('event-container');

relay.subscribe([
  {
    kinds: [1],
  },
], {
  onevent(event) {
    console.log('got event:', event);

    // Create a new event container element
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');

    // Create the content element
    const contentElement = document.createElement('div');
    contentElement.classList.add('content');

    // Find and make all links clickable
    const linkRegex = /https?:\/\/\S+/g;
    const finalContent = event.content.replace(linkRegex, (match) => {
      const linkElement = document.createElement('a');
      linkElement.href = match;
      linkElement.target = '_blank';
      linkElement.textContent = match;
      return linkElement.outerHTML;
    });

contentElement.innerHTML = finalContent.replace(/\n/g, '<br>');

    // Create the metadata element
    const metadataElement = document.createElement('div');
    metadataElement.classList.add('metadata');

    // Add the created_at timestamp
    const createdAtElement = document.createElement('span');
    createdAtElement.classList.add('created-at');
    createdAtElement.textContent = new Date(event.created_at * 1000).toLocaleString();
    metadataElement.appendChild(createdAtElement);

    // Add the pubkey
    const pubkeyElement = document.createElement('span');
    pubkeyElement.classList.add('pubkey');
    pubkeyElement.textContent = `Pubkey: ${event.pubkey}`;
    metadataElement.appendChild(pubkeyElement);

    // Add the id
    const idElement = document.createElement('span');
    idElement.classList.add('id');
    idElement.textContent = `ID: ${event.id}`;
    metadataElement.appendChild(idElement);

    // Add the kind
    const kindElement = document.createElement('span');
    kindElement.classList.add('kind');
    kindElement.textContent = `Kind: ${event.kind}`;
    metadataElement.appendChild(kindElement);

    // Add the tags
    if (event.tags.length > 0) {
      const tagsElement = document.createElement('div');
      tagsElement.classList.add('tags');
      tagsElement.textContent = `Tags: ${event.tags.map(tag => tag.join(':')).join(', ')}`;
      metadataElement.appendChild(tagsElement);
    }

    // Add the signature
    const sigElement = document.createElement('div');
    sigElement.classList.add('sig');
    sigElement.textContent = `Signature: ${event.sig}`;
    metadataElement.appendChild(sigElement);

    // Append the content and metadata to the event element
    eventElement.appendChild(contentElement);
    eventElement.appendChild(metadataElement);

    // Append the event element to the container
    eventContainer.appendChild(eventElement);

    eventCount++;
    if (eventCount >= maxEvents) {
      relay.close(); // Close the connection when the maximum number of events is reached
    }
  }
});
