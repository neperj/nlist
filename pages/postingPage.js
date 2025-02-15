async function postingPageHandler() {
  try {
    let mainContent = document.querySelector("#main");
    mainContent.innerHTML = `
        <div class="posting-container">
          <h1>Post</h1>
          <div class="post-details">
            <h2>My Listing Form</h2>
            <div id="my-post">
              <form id="post-form">
                <p>create a listing</p>
                <label for="tags">Choose a tag:</label>
                <select id="tags">
                  ${config.categories
                    .map(
                      (category) => `
                    <optgroup label="${category.title}">
                      ${category.items
                        .map(
                          (item) => `
                        <option value="${item.name}">${item.displayName}</option>
                      `
                        )
                        .join("")}
                    </optgroup>
                  `
                    )
                    .join("")}
                </select>
                <button type="submit">Prints dummy k-30402</button>
              </form>
            </div>
          </div>
        </div>
      `;
    let postForm = document.getElementById("post-form");
    postForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      let kind = 30402;
      let createdAt = 1675642635;
      let content =
        "Lorem [ipsum] dolor risva pafficia deserunt Read zkjurnw4ksz9thwden5te0wfjk0k0h36rhpdtd594my40w9pkal876jxgrqsqqqa28pccpzu.";
      let title = "Lorem Ipsum";
      let summary = "More lorem ipsum that is a little more than the title";
      let price = "100";
      let currency = "USD";
      let frequency = "Hour";
      let location = "NYC";
      let tTag = "electronics";
      let pubkey = "...";
      let sig = "...";

      let eventTemplate = {
        kind,
        created_at: createdAt,
        content,
        tags: [
          ["d", "lorem-ipsum"],
          ["title", title],
          ["published_at", "1296962229"],
          ["t", tTag],
          ["image", "https://url.to.img", "256x256"],
          ["summary", summary],
          ["location", location],
          ["price", price, currency, frequency],
          [
            "e",
            "b3e392b11f5d4f28321cedd09303a748acfd0487aea5a7450b3481c60b6e4f87",
            "wss://relay.example.com",
          ],
          [
            "a",
            "30023:a695f6b60119d9521934a691347d9f78e8770b56da16bb255ee286ddf9fda919:ipsum",
            "wss://relay.nostr.org",
          ],
        ],
        pubkey,
        sig,
      };

      console.log(eventTemplate);
      // Finalize the event and send it
      // let signedEvent = finalizeEvent(eventTemplate, sk);
      // Add your logic to send the signed event
    });
  } catch (error) {
    console.error("Error rendering posting page:", error);
  }
}
