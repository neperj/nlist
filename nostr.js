class NostrService {
  constructor() {
    this.relay = null;
  }

  async connect() {
    if (!this.relay) {
      this.relay = await window.NostrTools.Relay.connect('wss://nos.lol');
      console.log(`connected to ${this.relay.url}`);
    }
    return this.relay;
  }

  async getListings(options = { limit: 30 }) {
    const relay = await this.connect();
    return new Promise((resolve) => {
      const listings = [];
      
      relay.subscribe([
        {
          kinds: [30402],
        }
      ], {
        onevent(event) {
          console.log(event);
          listings.push(event);
          if (listings.length >= options.limit) {
            relay.close();
            resolve(listings);
          }
        }
      });
    });
  }

  async getListing(id) {
    const relay = await this.connect();
    return new Promise((resolve) => {
      relay.subscribe([
        {
          kinds: [30402],
          ids: [id]
        }
      ], {
        onevent(event) {
          console.log(event);
          relay.close();
          resolve(event);
        }
      });
    });
  }
}




const EventParser = {
  getTagValue(event, tagName) {
    const tag = event.tags.find(tag => tag[0] === tagName);
    return tag ? tag[1] : null;
  },

  parseListingData(event) {
    return {
      id: event.id,
      title: this.getTagValue(event, 'title'),
      images: event.tags.filter(tag => tag[0] === 'image').map(tag => tag[1]),
      summary: this.getTagValue(event, 'summary'),
      price: this.getTagValue(event, 'price'),
      currency: event.tags.find(tag => tag[0] === 'price')?.[2] || 'unknown',
      location: this.getTagValue(event, 'location'),
      shipping: event.tags.find(tag => tag[0] === 'shipping')?.[1] || 'N/A',
      status: this.getTagValue(event, 'status'),
      publishedAt: new Date(parseInt(this.getTagValue(event, 'published_at')) * 1000),
      pubkey: event.pubkey
    };
  }
};


