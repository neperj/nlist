async function contactPageHandler() {
  try {
    let mainContent = document.querySelector("#main");
    mainContent.innerHTML = `
          <div class="contacting-container">
            <h1>Contact Us</h1>
            <div class="contact-details">
              <h2>My contact us</h2>
              <div id="my-contact">
                <form id="contact-form">
                  <p>contact us</p>
                  <button type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        `;
    let postForm = document.getElementById("contact-form");
    postForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("thanks for contacting us!");
    });
  } catch (error) {
    console.error("Error rendering contact us page:", error);
  }
}
