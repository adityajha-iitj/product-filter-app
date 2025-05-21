# Product Filter Application

A responsive React application for managing product inventory with filtering and inline editing capabilities.

## Demo

The application is deployed and available at: [https://product-filter-app-new.onrender.com/](https://product-filter-app-new.onrender.com/)

## Features

- Display products in a clean, responsive table
- Filter products by title, brand, category, price range, and rating range
- Inline editing of product titles
- Delete products
- Data persistence using session storage
- Fully responsive design for desktop and mobile

## Technologies Used

- React 18 (with Hooks)
- Vite (for fast development and build)
- CSS3 (responsive design without external libraries)
- Session Storage (for client-side data persistence)
- DummyJSON API (for initial product data)
- Docker (containerization)
- Render (hosting platform)

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/product-filter-app.git
   cd product-filter-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

### Building for Production

1. Create a production build:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Preview the production build locally:
   ```bash
   npm run preview
   # or
   yarn preview
   ```

### Docker Deployment

The application is containerized using Docker for easy deployment:

1. Build the Docker image:
   ```bash
   docker build -t product-filter-app .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 product-filter-app
   ```

3. Access the application at:
   ```
   http://localhost:8080
   ```

## Architecture

The application follows a component-based architecture:

- `App.jsx`: Main application component
- `ProductsTable.jsx`: Component for displaying and interacting with products
- `ProductFilter.jsx`: Component for filtering products
- `products.js`: Service for data handling with session storage

## Notes

- Initial data is fetched from the DummyJSON API
- All CRUD operations after initial load are performed on session storage
- API calls are simulated with delays to mimic real-world behavior
