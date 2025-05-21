import { useState, useEffect } from 'react';
import './App.css';
import ProductsTable from './components/ProductsTable';
import ProductFilter from './components/ProductFilter';
import { fetchProducts, getProducts, updateProduct, deleteProduct } from './services/products';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({});

  // Fetching the products data from the API or session storage
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        
        //Down here i am ensuring that the data is fetched from session storage first
        //and if not found, it will fetch from the API

        let localProducts = await getProducts();
        
        if (!localProducts || localProducts.length === 0) {
          localProducts = await fetchProducts();
        }
        
        setProducts(localProducts);
        setFilteredProducts(localProducts);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error initializing data:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Applying filters
  useEffect(() => {
    applyFilters(currentFilters);
  }, [products, currentFilters]);

  // Handling filters
  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
  };

  // Applying filters to products
  const applyFilters = (filters) => {
    let result = [...products];

    if (filters.title) {
      result = result.filter(product => product.title === filters.title);
    }
    
    if (filters.brand) {
      result = result.filter(product => product.brand === filters.brand);
    }
    
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    if (filters.priceRange) {
      result = result.filter(product => 
        product.price >= filters.priceRange.min && 
        product.price <= filters.priceRange.max
      );
    }

    if (filters.ratingRange) {
      result = result.filter(product => 
        product.rating >= filters.ratingRange.min && 
        product.rating <= filters.ratingRange.max
      );
    }

    setFilteredProducts(result);
  };

  // Handling the product updates
  const handleProductUpdate = async (productId, updatedData) => {
    try {
      const updatedProducts = await updateProduct(productId, updatedData);
      setProducts(updatedProducts);
      setError(null);
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error('Error updating product:', err);
    }
  };

  // Handle the product deletion
  const handleProductDelete = async (productId) => {
    try {
      const updatedProducts = await deleteProduct(productId);
      setProducts(updatedProducts);
      setError(null);
    } catch (err) {
      setError('Failed to delete product. Please try again.');
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Product Inventory</h1>
      </div>

      {error && <div className="error">{error}</div>}

      <ProductFilter 
        products={products} 
        onFilterChange={handleFilterChange} 
      />

      {/* The loading state shown during initial load */}
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <ProductsTable 
          products={filteredProducts} 
          onDelete={handleProductDelete}
          onUpdate={handleProductUpdate}
        />
      )}
    </div>
  );
}

export default App;