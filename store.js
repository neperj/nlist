// store.js
const store = {
    state: {
      listings: [],
      currentListing: null,
      userProfile: null,
      filters: {}
    },
    
    subscribers: [],
  
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.notify();
    },
  
    subscribe(callback) {
      this.subscribers.push(callback);
      return () => {
        this.subscribers = this.subscribers.filter(sub => sub !== callback);
      };
    },
  
    notify() {
      this.subscribers.forEach(callback => callback(this.state));
    }
  };