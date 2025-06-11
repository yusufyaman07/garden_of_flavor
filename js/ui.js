// Define an object to hold references to frequently used DOM elements
const uiElements = {
  menuList: document.querySelector("#menu-list"), // The element that will display the menu cards
  categoryButtons: document.querySelectorAll(".category-button"), // All category filter buttons
  detailContainer: document.querySelector("#detail-container"), // The element that will display the detail content
};

// Utility function that returns a promise resolved after a given amount of milliseconds
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

// Function to render the menu items as cards
const renderMenuCard = (data) => {
  // Set the innerHTML of the menuList to the generated cards
  uiElements.menuList.innerHTML = data
    .map(
      (item) => `
    <a href='/detail.html?id=${item.id}' class="col-md-6 col-lg-4 mb-4 text-decoration-none">
      <div class="card menu-card shadow-sm h-100">
        <div class="position-relative">
          <img src="${item.img}" class="card-img-top img-fluid rounded-top menu-card-img" alt="${item.title}" />
          <span class="badge bg-success position-absolute top-0 start-0 m-3 px-3 py-2 text-capitalize menu-card-badge">${item.category}</span>
          <span class="badge bg-white text-success fw-bold position-absolute top-0 end-0 m-3 px-3 py-2 menu-card-price">$${item.price}</span>
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title fw-bold text-success mb-2">${item.title}</h5>
        </div>
      </div>
    </a>`
    )
    .join(""); // Combine all cards into a single HTML string
};

// Function to render the detailed view of a single item
const renderDetailItem = (item) => {
  uiElements.detailContainer.innerHTML = `
    <section class="container my-5" style="max-width: 1100px">
      <div class="d-flex align-items-center justify-content-between mt-4 gap-2">
        <a href="/" class="text-success fs-4" title="Anasayfa"><i class="bi bi-house-fill"></i></a>
        <span class="detail-breadcrumb ms-2">
          <span class="text-muted">detail</span>
          <span class="text-secondary">/</span>
          <span class="text-muted text-capitalize">${item.category}</span>
          <span class="text-secondary">/</span>
          <span class="fw-semibold text-dark">${item.title}</span>
        </span>
      </div>
      <div class="row g-5 align-items-center detail-content-box p-5 p-md-5">
        <div class="col-12 col-md-5 mb-4 mb-md-0">
          <img src="${item.img}" alt="${item.title}" class="img-fluid rounded-4 w-100 shadow detail-img" />
        </div>
        <div class="col-12 col-md-7">
          <h2 class="fw-bold text-success mb-3">${item.title}</h2>
          <div class="mb-3">
            <span class="badge bg-warning text-dark fs-6 px-3 py-2 text-capitalize me-2">${item.category}</span>
            <span class="badge bg-light text-success border border-success fs-6 px-3 py-2">Price: <span class="fw-bold">$${item.price}</span></span>
          </div>
          <p class="lead text-muted mb-4">${item.desc}</p>
          <a href="#" class="btn btn-success px-4 py-2 fw-semibold shadow">Order Now</a>
        </div>
      </div>
    </section>`;
};

// Function to render a "not found" page if the item does not exist
const renderNotFound = () => {
  uiElements.detailContainer.innerHTML = `
    <section class="container my-5" style="max-width: 800px">
      <div class="text-center">
        <img src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" alt="Not Found" class="img-fluid mb-4" style="max-width: 180px;" />
        <h2 class="fw-bold text-danger mb-3">Sorry! No content found.</h2>
        <p class="lead text-muted mb-4">The product or content you are looking for is not available or may have been deleted.<br/>You can continue exploring by returning to the home page.</p>
        <a href="/" class="btn btn-success px-4 py-2 fw-semibold shadow">Home Page</a>
      </div>
    </section>`;
};

// Function to display a loading spinner while data is loading
const renderLoader = () => {
  uiElements.menuList.innerHTML = `
    <div class="d-flex justify-content-center align-items-center w-100 py-5">
      <div class="spinner-border text-success" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`;
};

// Function to render the menu page with all items and category filtering
const renderMenuPage = async (data) => {
  renderLoader(); // Show the loader while data is being "fetched"
  await wait(2000); // Wait for 2 seconds to simulate data loading
  renderMenuCard(data); // Render all menu cards

  // Add click event listeners to all category buttons
  uiElements.categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.id; // Get the selected category
      // Filter the data based on selected category, or show all if "all" is selected
      const filtered =
        selected === "all"
          ? data
          : data.filter((item) => item.category === selected);
      renderMenuCard(filtered); // Render the filtered menu cards
    });
  });
};

// Function to render the detail page for a specific menu item
const renderDetailPage = (data) => {
  const params = new URLSearchParams(window.location.search); // Parse URL parameters
  const itemId = +params.get("id"); // Get the 'id' parameter as a number
  const product = data.find((item) => item.id === itemId); // Find the corresponding item

  product ? renderDetailItem(product) : renderNotFound(); // Render item or not found page
};

// Export the renderMenuPage and renderDetailPage functions for use in other modules
export { renderMenuPage, renderDetailPage };
