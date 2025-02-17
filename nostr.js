class NostrService {
  constructor() {
    this.relay = null;
  }

  async connect() {
    if (!this.relay) {
      this.relay = await window.NostrTools.Relay.connect("wss://nos.lol");
      console.log(`connected to ${this.relay.url}`);
    }
    return this.relay;
  }

  async getListings(limit, tag) {
    let relay = await this.connect();
    return new Promise((resolve) => {
      let listings = [];

      relay.subscribe(
        [
          {
            kinds: [30402],
            "#t": [tag],
          },
        ],
        {
          onevent(event) {
            console.log(event);
            listings.push(event);
            if (listings.length >= limit) {
              relay.close();
              resolve(listings);
            }
          },
          oneose() {
            resolve(listings);
          },
        }
      );
    });
  }

  async getAllListings(limit) {
    let relay = await this.connect();
    return new Promise((resolve) => {
      let listings = [];

      relay.subscribe(
        [
          {
            kinds: [30402],
          },
        ],
        {
          onevent(event) {
            console.log(event);
            listings.push(event);
            if (listings.length >= limit) {
              relay.close();
              resolve(listings);
            }
          },
          oneose() {
            resolve(listings);
          },
        }
      );
    });
  }

  async getNpubListings(limit, pk) {
    let relay = await this.connect();
    return new Promise((resolve) => {
      let listings = [];

      relay.subscribe(
        [
          {
            kinds: [30402],
            authors: [pk],
          },
        ],
        {
          onevent(event) {
            console.log(event);
            listings.push(event);
            if (listings.length >= limit) {
              relay.close();
              resolve(listings);
            }
          },
          oneose() {
            resolve(listings);
          },
        }
      );
    });
  }

  async getListing(id) {
    let relay = await this.connect();
    return new Promise((resolve) => {
      relay.subscribe(
        [
          {
            kinds: [30402],
            ids: [id],
          },
        ],
        {
          onevent(event) {
            console.log(event);
            relay.close();
            resolve(event);
          },
        }
      );
    });
  }
}

let EventParser = {
  getTagValue(event, tagName) {
    let tag = event.tags.find((tag) => tag[0] === tagName);
    return tag ? tag[1] : null;
  },

  parseListingData(event) {
    return {
      id: event.id,
      content: event.content,
      title: this.getTagValue(event, "title"),
      images: event.tags
        .filter((tag) => tag[0] === "image")
        .map((tag) => tag[1]),
      summary: this.getTagValue(event, "summary"),
      price: this.getTagValue(event, "price"),
      currency: event.tags.find((tag) => tag[0] === "price")?.[2] || "null",
      frequency: event.tags.find((tag) => tag[0] === "price")?.[3] || " ",
      location: this.getTagValue(event, "location"),
      shipping: event.tags.find((tag) => tag[0] === "shipping")?.[1] || "N/A",
      status: this.getTagValue(event, "status"),
      publishedAt: this.getTagValue(event, "published_at"),
      editedAt: event.created_at,
      pubkey: event.pubkey,
    };
  },
};
