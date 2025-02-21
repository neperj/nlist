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
