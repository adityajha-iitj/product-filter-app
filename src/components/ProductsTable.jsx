import React, { useState } from 'react';

const ProductsTable = ({ products, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditValue(product.title);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = (productId) => {
    if (editValue.trim() !== '') {
      onUpdate(productId, { title: editValue });
    }
    setEditingId(null);
  };

  const handleKeyDown = (e, productId) => {
    if (e.key === 'Enter') {
      handleEditSubmit(productId);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  if (products.length === 0) {
    return <div className="no-results">No results found</div>;
  }

  return (
    <div className="products-table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th>
              <div className="column-header">
                Title
              </div>
            </th>
            <th>
              <div className="column-header">
                Brand
              </div>
            </th>
            <th>
              <div className="column-header">
                Category
              </div>
            </th>
            <th>
              <div className="column-header">
                Price
              </div>
            </th>
            <th>
              <div className="column-header">
                Rating
              </div>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                {editingId === product.id ? (
                  <input
                    className="edit-input"
                    type="text"
                    value={editValue}
                    onChange={handleEditChange}
                    onBlur={() => handleEditSubmit(product.id)}
                    onKeyDown={(e) => handleKeyDown(e, product.id)}
                    autoFocus
                  />
                ) : (
                  <div
                    className="editable-field"
                    onClick={() => handleEditClick(product)}
                  >
                    {product.title}
                  </div>
                )}
              </td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.rating}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;