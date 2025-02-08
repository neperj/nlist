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


