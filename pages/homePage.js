function homePageHandler() {
    const mainContent = document.querySelector('#main');
    mainContent.innerHTML = `
        <div class="home-container">
        <section id="intro-section">
          <h2>Welcome to nList</h2>
          <p>Discover curated listings</p>
          <a href="#listing" class="nav-link" id="home-to-list">Show List</a>
        </section>
        <div class="cl-categories">
          <div class="category-column">
              <h3>community</h3>
              <p>activities</p>
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
              <p>computer</p>
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
              <p>clothes</p>
              
              <h3>discussion</h3>
              <p>tech</p>
              <p>politics</p>
              <p>arts</p>
          </div>
      </div>
        </div>
    `;
}
