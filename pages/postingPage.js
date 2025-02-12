async function postingPageHandler() {
    try {
      const mainContent = document.querySelector('#main');
      mainContent.innerHTML = `
        <div class="posting-container">
          <h1>Post</h1>
          <div class="post-details">
            <h2>My Listing Form</h2>
            <div id="my-post">
              <form id="post-form">
                <label for="kind">Event Kind:</label>
                <select id="kind" name="kind" required>
                  <option value="30402">Listing</option>
                  <option value="1">Note</option>
                  <!-- Add more event kind options as needed -->
                </select>
  
                <label for="content">Content:</label>
                <textarea id="content" name="content" rows="5" required></textarea>
  
                <label for="created_at">Created At:</label>
                <input type="number" id="created_at" name="created_at" required>
  
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required>
  
                <label for="summary">Summary:</label>
                <textarea id="summary" name="summary" rows="3" required></textarea>
  
                <label for="price">Price:</label>
                <input type="text" id="price" name="price" required>
  
                <label for="price-currency">Currency:</label>
                <input type="text" id="price-currency" name="price-currency" required>
  
                <label for="price-frequency">Frequency:</label>
                <input type="text" id="price-frequency" name="price-frequency" required>
  
                <label for="location">Location:</label>
                <input type="text" id="location" name="location" required>
  
                <label for="shipping">Shipping:</label>
                <input type="text" id="shipping" name="shipping" required>
  
                <label for="t_tag">T Tag:</label>
                <input type="text" id="t_tag" name="t_tag" required>
  
                <label for="pubkey">Pubkey:</label>
                <input type="text" id="pubkey" name="pubkey" required>
  
                <label for="sig">Signature:</label>
                <input type="text" id="sig" name="sig" required>
  
                <button type="submit">Post</button>
              </form>
            </div>
          </div>
        </div>
      `;
  
      const postForm = document.getElementById('post-form');
      postForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const kind = parseInt(document.getElementById('kind').value);
        const content = document.getElementById('content').value;
        const createdAt = parseInt(document.getElementById('created_at').value);
        const title = document.getElementById('title').value;
        const summary = document.getElementById('summary').value;
        const priceInput = document.getElementById('price');
        const currencyInput = document.getElementById('price-currency');
        const frequencyInput = document.getElementById('price-frequency');
        const price = priceInput.value;
        const currency = currencyInput.value;
        const frequency = frequencyInput.value;
        const location = document.getElementById('location').value;
        const shipping = document.getElementById('shipping').value;
        const tTag = document.getElementById('t_tag').value;
        const pubkey = document.getElementById('pubkey').value;
        const sig = document.getElementById('sig').value;
  
        const tags = [
          ['title', title],
          ['summary', summary],
          ['price', price, currency, frequency],
          ['location', location],
          ['shipping', shipping],
          ['t', tTag],
        ];
  
        const eventTemplate = {
          kind,
          created_at: createdAt,
          tags,
          content,
        };
        console.log(eventTemplate);
        // Finalize the event and send it
        //const signedEvent = finalizeEvent(eventTemplate, sk);
        // Add your logic to send the signed event
      });
    } catch (error) {
      console.error('Error rendering posting page:', error);
    }
  }
  