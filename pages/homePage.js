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
              <h3>Tech and Electronics</h3>
              <button class="tag-button" data-target="Digital">Digital</button>
              <button class="tag-button" data-target="Electronics">Electronics</button>
              <button class="tag-button" data-target="Accessories">Accessories</button>

              
              <h3>Arts & Crafts</h3>
              <button class="tag-button" data-target="Art">Art</button>
              <button class="tag-button" data-target="Crafts">Crafts</button>
              <button class="tag-button" data-target="Entertainment">Entertainment</button>
          </div>
  
          <div class="category-column">
              <h3>Home & Lifestyle</h3>
              <button class="tag-button" data-target="Food">Food</button>
              <button class="tag-button" data-target="Clothing">Clothing</button>
              <button class="tag-button" data-target="Sports">Sports</button>
              <button class="tag-button" data-target="Fitness">Fitness</button>
              <button class="tag-button" data-target="Tickets">Tickets</button>
              <button class="tag-button" data-target="Home">Home</button>
              <button class="tag-button" data-target="Pets">Pets</button>              
              
              
              <h3>Media and Books</h3>
              <button class="tag-button" data-target="Books">Books</button>
              <button class="tag-button" data-target="Office">Office</button>
          </div>
  
          <div class="category-column">
              <h3>Services and Transactions</h3>
              <button class="tag-button" data-target="Services">Services</button>
              <button class="tag-button" data-target="Resale">Resale</button>
              <button class="tag-button" data-target="Exchange">Exchange</button>
              <button class="tag-button" data-target="Swap">Swap</button>
  

              <h3>Miscellaneous</h3>
              <button class="tag-button" data-target="Physical">Physical</button>
              <button class="tag-button" data-target="Miscellaneous">Miscellaneous</button>
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
