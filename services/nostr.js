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
