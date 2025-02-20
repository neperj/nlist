async function faqPageHandler() {
  try {
    let mainContent = document.querySelector("#main");
    mainContent.innerHTML = `
    <div class="faq-container">
      <section class="faq-section">
        <h2>nostr classified listings</h2>
        <div class="faq-item">
          <h3>what is nlist?</h3>
          <p>
            it is a decentralized classified listings app built on the nostr
            protocol. it allows anyone to easily create and customize their own
            classified listings website for their community.
          </p>
        </div>
        <div class="faq-item">
          <h3>how to create my own nostr classifieds website?</h3>
          <p>
            simply clone the repository, make any desired customizations, and
            host it on the platform you like (can be hosted for free on github
            pages).
          </p>
        </div>
        <div class="faq-item">
          <h3>is it free to use?</h3>
          <p>yes, completely free and open source.</p>
        </div>
      </section>
    </div>
        `;

  } catch (error) {
    console.error("Error rendering FAQ us page:", error);
  }
}
