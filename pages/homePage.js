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
              <button class="tag-button" data-target="Home">Home</button>
              <button class="tag-button" data-target="Crafts">Crafts</button>
              
              <h3>housing</h3>
              <button class="tag-button" data-target="Pets">Pets</button>
              <p>rooms</p>
              <p>office</p>
          </div>
  
          <div class="category-column">
              <h3>services</h3>
              <button class="tag-button" data-target="Digital">Digital</button>
              <button class="tag-button" data-target="Electronics">Electronics</button>
              <button class="tag-button" data-target="Accessories">Accessories</button>
              
              <h3>jobs</h3>
              <button class="tag-button" data-target="Books">Books</button>
              <button class="tag-button" data-target="Office">Office</button>
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
              <button class="tag-button" data-target="dummy">dummy</button>
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
