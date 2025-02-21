let config = {
  app_title: "",
  app_description: "",
  appTag: "",
  categories: [],
};

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    config.app_title = data.app_title;
    config.app_description = data.app_description;
    config.appTag = data.appTag || "";
    config.categories = data.categories.map((category) => ({
      title: category.title,
      items: category.items.map((item) => ({
        name: config.appTag ? `${config.appTag}-${item.name}` : item.name,
        displayName: item.displayName,
      })),
    }));
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });


//  let config = {
//    app_title: "📌 nlist",
//    app_description: "Discover curated listings",
//    categories: [
//      {
//        title: "for sale",
//        items: [
//          { name: "electronics", displayName: "electronics" },
//          { name: "Electronics", displayName: "Electronics 💻" },
//          { name: "Digital", displayName: "Digital" },
//          { name: "Accessories", displayName: "Accessories" },
//          { name: "art", displayName: "art" },
//          { name: "Art", displayName: "Art 🎨" },
//          { name: "Crafts", displayName: "Crafts" },
//          { name: "crafts", displayName: "crafts" },
//          { name: "Furniture", displayName: "Furniture" },
//          { name: "Home", displayName: "Home Decor" },
//          { name: "Fitness", displayName: "Fitness" },
//          { name: "Clothing", displayName: "🛍️ Clothing 🛍️" },
//          { name: "books", displayName: "books" },
//          { name: "Books", displayName: "Books" },
//          { name: "Vehicles", displayName: "Vehicles 🚗" },
//          { name: "Realestate", displayName: "Real Estate" },
//          { name: "Entertainment", displayName: "Entertainment" },
//          { name: "Pets", displayName: "🦆 Pets 🦆" },
//        ],
//      },
//      {
//        title: "jobs",
//        items: [
//          { name: "job", displayName: "job" },
//          { name: "bounties", displayName: "bounties 🎯" },
//          { name: "contract", displayName: "contract" },
//          { name: "full-time", displayName: "full-Time" },
//          { name: "internships", displayName: "internships" },
//          { name: "applicants", displayName: "looking for a job" },
//          { name: "partnership", displayName: "looking for a partner" },
//          { name: "sponsors", displayName: "looking for a sponsor" },
//          { name: "part-time", displayName: "part-Time" },
//          { name: "remote", displayName: "remote 🧑‍💻" },
//        ],
//      },
//      {
//        title: "arts and crafts",
//        items: [
//          { name: "3d-printing", displayName: "3d printing" },
//          { name: "candles", displayName: "candles" },
//          { name: "diy", displayName: "DIY" },
//          { name: "equipment", displayName: "equipment" },
//          { name: "glasswork", displayName: "glasswork" },
//          { name: "jewelry", displayName: "jewelry 💎" },
//          { name: "leatherwork", displayName: "leatherwork" },
//          { name: "metalwork", displayName: "metalwork" },
//          { name: "photography", displayName: "photography" },
//          { name: "pottery", displayName: "pottery" },
//          { name: "printmaking", displayName: "printmaking" },
//          { name: "soap", displayName: "soap 🧼" },
//          { name: "textiles", displayName: "textiles" },
//          { name: "woodworking", displayName: "woodworking 🪚" },
//        ],
//      },
//      {
//        title: "services",
//        items: [
//          { name: "automotive", displayName: "automotive" },
//          { name: "beauty", displayName: "beauty" },
//          { name: "technology", displayName: "technology" },
//          { name: "creative", displayName: "creative" },
//          { name: "financial", displayName: "financial" },
//          { name: "health", displayName: "health" },
//          { name: "legal", displayName: "⚖️ legal ⚖️" },
//          { name: "writing", displayName: "writing" },
//        ],
//      },
//      {
//        title: "community",
//        items: [
//          { name: "artists", displayName: "artists" },
//          { name: "classes", displayName: "classes" },
//          { name: "events", displayName: "events" },
//          { name: "Exchange", displayName: "exchange" },
//          { name: "housing", displayName: "housing" },
//          { name: "pets", displayName: "pets" },
//          { name: "Resale", displayName: "Resale" },
//          { name: "rideshare", displayName: "rideshare" },
//          { name: "volunteer", displayName: "🫂 volunteer 🫂" },
//        ],
//      },
//      {
//        title: "misc.",
//        items: [
//          { name: "all", displayName: "EVERYTHING" },
//          { name: "gaming", displayName: "🎮 gaming 🎮" },
//          { name: "Food", displayName: "Food" },
//          { name: "food", displayName: "food" },
//          { name: "food", displayName: "food" },
//          { name: "food", displayName: "food 🍔" },
//          { name: "food", displayName: "food" },
//          { name: "gift", displayName: "gift" },
//          { name: "Bitcoin", displayName: "Bitcoin" },
//          { name: "bitcoin", displayName: "bitcoin" },
//          { name: "Miscellaneous", displayName: "Miscellaneous" },
//          { name: "wanted", displayName: "Wanted" },
//        ],
//      },
//    ],
//  };
