function profilePageHandler() {
    const mainContent = document.querySelector('#main');
    mainContent.innerHTML = `
        <div class="profile-container">
            <h1>Profile</h1>
            <div class="profile-details">
                <h2>My Listings</h2>
                <div id="my-listings"></div>
                
                <h2>Settings</h2>
                <div class="settings-section">
                    <!-- Add profile settings here -->
                </div>
            </div>
        </div>
    `;
}