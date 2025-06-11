// Define the base URL for fetching the data
const BASE_URL = "../db.json";

// Asynchronous function to fetch menu data from the server
const getMenu = async () => {
  try {
    // Make a GET request to the BASE_URL
    const response = await fetch(BASE_URL);
    // Throw an error if the response is not successful
    if (!response.ok) throw new Error("Failed to fetch menu");
    // Parse the response body as JSON
    const data = await response.json();
    // Return the 'menu' property from the fetched data
    return data.menu;
  } catch (error) {
    // Log any errors to the console
    console.error("API Error:", error);
    // Return an empty array if there was an error
    return [];
  }
};

// Export the getMenu function as the default export of this module
export default getMenu;
