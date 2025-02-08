function postingPageHandler() {
    const mainContent = document.querySelector('#main');
    mainContent.innerHTML = `
        <div class="posting-container">
            <h1>Post</h1>
            <div class="post-details">
                <h2>My Listing Form</h2>
                <div id="my-post"></div>
                
                <h2>Settings</h2>
                <div class="settings-section">
                    <!-- Add profile settings here -->
                </div>
            </div>
        </div>
    `;
}