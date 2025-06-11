// Import the getMenu function from the api.js file
import getMenu from "./api.js";
// Import the renderMenuPage and renderDetailPage functions from the ui.js file
import { renderMenuPage, renderDetailPage } from "./ui.js";

// Define an asynchronous function to initialize the app
const initApp = async () => {
  // Fetch the menu data by calling the getMenu function
  const menuData = await getMenu();
  // Check if the current page URL contains "/detail.html"
  const isDetailPage = window.location.pathname.includes("/detail.html");

  // If on the detail page, render the detail page with the menu data
  // Otherwise, render the main menu page with the menu data
  isDetailPage ? renderDetailPage(menuData) : renderMenuPage(menuData);
};

// Export the initApp function as the default export of this module
export default initApp;
