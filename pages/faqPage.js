async function faqPageHandler() {
    try {
      let mainContent = document.querySelector("#main");
      mainContent.innerHTML = `
          <div class="contacting-container">
            <h1>FAQ</h1>
            <div class="contact-details">
              <h2>My FAQ</h2>
              <div id="my-contact">
                <form id="contact-form">
                  <p>FAQ</p>
                  <button type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        `;
      let postForm = document.getElementById("contact-form");
      postForm.addEventListener("submit", async (event) => {
        event.preventDefault();  
        console.log("thanks for f");

      });
    } catch (error) {
      console.error("Error rendering FAQ us page:", error);
    }
  }
  