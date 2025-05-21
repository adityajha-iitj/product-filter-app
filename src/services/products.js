// gloable delay variable to simulate API call
const MOCK_DELAY = 500;

export const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch('https://dummyjson.com/products')
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch products');
          }
          return res.json();
        })
        .then(data => {
          // Storing the data in session storage
          sessionStorage.setItem('products', JSON.stringify(data.products));
          resolve(data.products);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          reject(error);
        });
    }, MOCK_DELAY);
  });
};

// Get products from session storage
export const getProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const products = JSON.parse(sessionStorage.getItem('products')) || [];
        resolve(products);
      } catch (error) {
        reject(error);
      }
    }, MOCK_DELAY);
  });
};

// Updating a specific product
export const updateProduct = (productId, updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const products = JSON.parse(sessionStorage.getItem('products')) || [];
        const updatedProducts = products.map(product => 
          product.id === productId ? { ...product, ...updatedData } : product
        );
        sessionStorage.setItem('products', JSON.stringify(updatedProducts));
        resolve(updatedProducts);
      } catch (error) {
        reject(error);
      }
    }, MOCK_DELAY);
  });
};

// Deleting a specific product
export const deleteProduct = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const products = JSON.parse(sessionStorage.getItem('products')) || [];
        const filteredProducts = products.filter(product => product.id !== productId);
        sessionStorage.setItem('products', JSON.stringify(filteredProducts));
        resolve(filteredProducts);
      } catch (error) {
        reject(error);
      }
    }, MOCK_DELAY);
  });
};