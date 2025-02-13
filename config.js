const config = {
  app_title: "nlist",
  app_description: "Discover curated listings",
  categories: [
    {
      title: "For Sale",
      items: [
        { name: "electronics", displayName: "electronics" },
        { name: "Electronics", displayName: "Electronics" },
        { name: "Digital", displayName: "Digital" },
        { name: "computers", displayName: "Computers" },
        { name: "phones", displayName: "Phones" },
        { name: "gaming", displayName: "Gaming" },
        { name: "accessories", displayName: "Accessories" },
        { name: "cameras", displayName: "Cameras" },
        { name: "software", displayName: "Software" },
        { name: "appliances", displayName: "Appliances" },
        { name: "furniture", displayName: "Furniture" },
        { name: "home", displayName: "Home Decor" },
        { name: "sports", displayName: "Sports Equipment" },
        { name: "clothing", displayName: "Clothing" },
        { name: "toys", displayName: "Toys" },
        { name: "books", displayName: "books" },
        { name: "Books", displayName: "Books" },
        { name: "music", displayName: "Musical Instruments" },
        { name: "vehicles", displayName: "Vehicles" },
        { name: "realestate", displayName: "Real Estate" },
      ],
    },
    {
      title: "Arts & Crafts",
      items: [
        { name: "art", displayName: "art" },
        { name: "arts", displayName: "arts" },
        { name: "Art", displayName: "Art" },
        { name: "Arts", displayName: "Arts" },
        { name: "Crafts", displayName: "Crafts" },
        { name: "crafts", displayName: "Crafts" },
        { name: "entertainment", displayName: "Entertainment" },
        { name: "music", displayName: "Music" },
        { name: "instruments", displayName: "Musical Instruments" },
        { name: "hobbies", displayName: "Hobbies" },
        { name: "photography", displayName: "Photography" },
        { name: "painting", displayName: "Painting" },
        { name: "sculpture", displayName: "Sculpture" },
        { name: "pottery", displayName: "Pottery" },
      ],
    },
    {
      title: "Job Market",
      items: [
        { name: "jobs", displayName: "jobs" },
        { name: "Jobs", displayName: "Jobs" },
        { name: "freelance", displayName: "Freelance" },
        { name: "gigs", displayName: "Gigs" },
        { name: "internships", displayName: "Internships" },
        { name: "part-time", displayName: "Part-Time" },
        { name: "full-time", displayName: "Full-Time" },
        { name: "remote", displayName: "Remote" },
        { name: "contract", displayName: "Contract" },
        { name: "temporary", displayName: "Temporary" },
        { name: "volunteer", displayName: "Volunteer" },
      ],
    },
    {
      title: "Community",
      items: [
        { name: "events", displayName: "Events" },
        { name: "housing", displayName: "Housing" },
        { name: "personals", displayName: "Personals" },
        { name: "discussion", displayName: "Discussion Forums" },
        { name: "volunteers", displayName: "Volunteers" },
        { name: "groups", displayName: "Groups" },
        { name: "local", displayName: "Local Services" },
        { name: "lost-found", displayName: "Lost and Found" },
        { name: "rideshare", displayName: "Rideshare" },
        { name: "Pets", displayName: "Pets" },
      ],
    },
    {
      title: "Health & Fitness",
      items: [
        { name: "healthcare", displayName: "Healthcare" },
        { name: "fitness", displayName: "Fitness" },
        { name: "wellness", displayName: "Wellness" },
        { name: "nutrition", displayName: "Nutrition" },
        { name: "sports", displayName: "Sports" },
        { name: "outdoors", displayName: "Outdoor Activities" },
        { name: "yoga", displayName: "Yoga" },
        { name: "meditation", displayName: "Meditation" },
        { name: "beauty", displayName: "Beauty" },
        { name: "personal-care", displayName: "Personal Care" },
      ],
    },
    {
      title: "Miscellaneous",
      items: [
        { name: "General", displayName: "General" },
        { name: "Services", displayName: "Services" },
        { name: "Resale", displayName: "Resale" },
        { name: "Exchange", displayName: "Exchange" },
        { name: "Swap", displayName: "Swap" },
        { name: "lessons", displayName: "Lessons" },
        { name: "transportation", displayName: "Transportation" },
        { name: "farm-garden", displayName: "Farm & Garden" },
        { name: "materials", displayName: "Materials" },
        { name: "Wanted", displayName: "Wanted" },
        { name: "all", displayName: "ALL TAGS" },
      ],
    },
  ],
  colorPalette: {
    text: "#f0e8fc",
    background: "#040109",
    primary: "#aa7bef",
    secondary: "#8d1396",
    accent: "#e73cd6",
  },
};

function setColorPalette() {
  const root = document.documentElement;

  root.style.setProperty("--text", config.colorPalette.text);
  root.style.setProperty("--background", config.colorPalette.background);
  root.style.setProperty("--primary", config.colorPalette.primary);
  root.style.setProperty("--secondary", config.colorPalette.secondary);
  root.style.setProperty("--accent", config.colorPalette.accent);
}
