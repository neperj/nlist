function homePageHandler() {
    const mainContent = document.querySelector('#main');
    mainContent.innerHTML = `
        <div class="home-container">
        <section id="intro-section">
          <h2>Welcome to nList</h2>
          <p>Discover curated listings</p>
         
        </section>
        <div class="cl-categories">
          <div class="category-column">
              <h3>community</h3>
              <button class="tag-button" data-target="Food">Food</button>
              <p>events</p>
              <p>groups</p>
              
              <h3>housing</h3>
              <p>apartments</p>
              <p>rooms</p>
              <p>office</p>
          </div>
  
          <div class="category-column">
              <h3>services</h3>
              <p>automotive</p>
              <button class="tag-button" data-target="Electronics">Electronics</button>
              <p>labor</p>
              
              <h3>jobs</h3>
              <p>tech</p>
              <p>admin</p>
              <p>labor</p>
          </div>
  
          <div class="category-column">
              <h3>for sale</h3>
              <p>electronics</p>
              <p>furniture</p>
              <button class="tag-button" data-target="Clothing">Clothing</button>
              
              <h3>discussion</h3>
              <p>tech</p>
              <p>politics</p>
              <p>arts</p>
          </div>
      </div>
        </div>
    `;

  
const tagButtons = document.querySelectorAll('.tag-button');

// Add a click event listener to each button
tagButtons.forEach(button => {
  button.addEventListener('click', handleTagButtonClick);
});

function handleTagButtonClick(event) {
    // Get the data-target attribute value from the clicked button
    const target = event.target.getAttribute('data-target');
    
    // Construct the URL using the target value
    const url = `#listing/${target}`;
    
    // Navigate to the URL
    window.location.href = url;
  }

}
