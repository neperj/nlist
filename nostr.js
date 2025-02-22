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
            relay.close();
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
            relay.close();
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
            relay.close();
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

//class NostrService {
//  constructor() {
//    this.relayUrls = ["wss://nos.lol", "wss://relay.damus.io", "wss://relay.nostr.band"];
//    this.relays = [];
//    this.seenEvents = new Set();
//  }
//
//  async connect(relayUrl) {
//    const relay = await window.NostrTools.Relay.connect(relayUrl);
//    this.relays.push(relay);
//    console.log(`connected to ${relay.url}`);
//    return relay;
//  }
//
//  async getListings(limit, tag) {
//    const listings = [];
//    for (const relayUrl of this.relayUrls) {
//      const relay = await this.connect(relayUrl);
//      await this.fetchListings(relay, limit, tag, listings);
//      if (listings.length >= limit) {
//        break;
//      }
//    }
//    return listings.slice(0, limit);
//  }
//
//  async fetchListings(relay, limit, tag, listings) {
//    return new Promise((resolve) => {
//      relay.subscribe(
//        [
//          {
//            kinds: [30402],
//            "#t": [tag],
//          },
//        ],
//        {
//          onevent: (event) => {
//            if (!this.seenEvents.has(event.id)) {
//              console.log(event);
//              this.seenEvents.add(event.id);
//              listings.push(event);
//              if (listings.length >= limit) {
//                relay.close();
//                resolve();
//              }
//            }
//          },
//          oneose: () => {
//            relay.close();
//            resolve();
//          },
//        }
//      );
//    });
//  }
//
//  async getAllListings(limit) {
//    const listings = [];
//    for (const relayUrl of this.relayUrls) {
//      const relay = await this.connect(relayUrl);
//      await this.fetchAllListings(relay, limit, listings);
//      if (listings.length >= limit) {
//        break;
//      }
//    }
//    return listings.slice(0, limit);
//  }
//
//  async fetchAllListings(relay, limit, listings) {
//    return new Promise((resolve) => {
//      relay.subscribe(
//        [
//          {
//            kinds: [30402],
//          },
//        ],
//        {
//          onevent: (event) => {
//            if (!this.seenEvents.has(event.id)) {
//              console.log(event);
//              this.seenEvents.add(event.id);
//              listings.push(event);
//              if (listings.length >= limit) {
//                relay.close();
//                resolve();
//              }
//            }
//          },
//          oneose: () => {
//            relay.close();
//            resolve();
//          },
//        }
//      );
//    });
//  }
//
//  async getNpubListings(limit, pk) {
//    const listings = [];
//    for (const relayUrl of this.relayUrls) {
//      const relay = await this.connect(relayUrl);
//      await this.fetchNpubListings(relay, limit, pk, listings);
//      if (listings.length >= limit) {
//        break;
//      }
//    }
//    return listings.slice(0, limit);
//  }
//  async fetchNpubListings(relay, limit, pk, listings) {
//    return new Promise((resolve) => {
//      relay.subscribe(
//        [
//          {
//            kinds: [30402],
//            authors: [pk],
//          },
//        ],
//        {
//          onevent: (event) => {
//            if (!this.seenEvents.has(event.id)) {
//              console.log(event);
//              this.seenEvents.add(event.id);
//              listings.push(event);
//              if (listings.length >= limit) {
//                relay.close();
//                resolve();
//              }
//            }
//          },
//          oneose: () => {
//            relay.close();
//            resolve();
//          },
//        }
//      );
//    });
//  }
//
//  async getListing(id) {
//    for (const relayUrl of this.relayUrls) {
//      const relay = await this.connect(relayUrl);
//      const event = await this.fetchListing(relay, id);
//      if (event) {
//        return event;
//      }
//    }
//    return null;
//  }
//
//  async fetchListing(relay, id) {
//    return new Promise((resolve) => {
//      relay.subscribe(
//        [
//          {
//            kinds: [30402],
//            ids: [id],
//          },
//        ],
//        {
//          onevent: (event) => {
//            if (!this.seenEvents.has(event.id)) {
//              console.log(event);
//              this.seenEvents.add(event.id);
//              relay.close();
//              resolve(event);
//            }
//          },
//        }
//      );
//    });
//  }
//
//}

let EventParser = {
  getTagValue(event, tagName) {
    let tag = event.tags.find((tag) => tag[0] === tagName);
    return tag ? tag[1] : null;
  },

  parseListingData(event) {
    let tags = {};
    event.tags.forEach((tag) => {
      const [key, ...values] = tag;
      
      // Skip specific tags that are handled separately
      if (['title', 'summary', 'price', 'location', 'shipping', 'image', 'published_at'].includes(key)) {
        return;
      }
      
      // Special handling for size tags
      if (key === 'size') {
        if (!tags[key]) {
          tags[key] = [];
        }
        // Add size and quantity together
        tags[key].push(values[0], values[1]);
        return;
      }
      
      // Handle other tags as before
      if (tags[key]) {
        if (!Array.isArray(tags[key])) {
          tags[key] = [tags[key]];
        }
        values.forEach(value => {
          if (!tags[key].includes(value)) {
            tags[key].push(value);
          }
        });
      } else {
        tags[key] = values.length > 1 ? values : values[0];
      }
    });
    

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
      tags: tags,
    };
  },
};
