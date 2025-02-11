async function postingPageHandler() {
    try {
        const mainContent = document.querySelector('#main');
        mainContent.innerHTML = `
            <div class="posting-container">
                <h1>Post</h1>
                <div class="post-details">
                    <h2>My Listing Form</h2>
                    <div id="my-post"></div>
                    
    
                </div>
            </div>
        `;
    } catch (error) {
      console.error('Error rendering posting page:', error);
    }
  }
  