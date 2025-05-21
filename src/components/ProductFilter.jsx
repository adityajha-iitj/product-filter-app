import React, { useEffect, useState } from 'react';

const ProductFilter = ({ products, onFilterChange }) => {
  const [filters, setFilters] = useState({
    title: '',
    brand: '',
    category: '',
    priceRange: '',
    ratingRange: ''
  });

  // All filter options
  const [filterOptions, setFilterOptions] = useState({
    title: [],
    brand: [],
    category: [],
    priceRanges: [],
    ratingRanges: []
  });

  // Updating filter options when products change
  useEffect(() => {
    if (!products.length) return;

    // Fiter null or empty values
    const options = {
      title: [...new Set(products.map(product => product.title))].filter(Boolean),
      brand: [...new Set(products.map(product => product.brand))].filter(Boolean),
      category: [...new Set(products.map(product => product.category))].filter(Boolean),
    };

    // Alphabetically sorting the options
    options.title.sort((a, b) => a.localeCompare(b));
    options.brand.sort((a, b) => a.localeCompare(b));
    options.category.sort((a, b) => a.localeCompare(b));

    // Creating price ranges
    const prices = products.map(product => product.price);
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));
    
    // Generating price ranges dynamically based on minimum and maximum price
    const priceRanges = generatePriceRanges(minPrice, maxPrice);

    // Creating rating ranges
    const ratings = products.map(product => product.rating);
    const minRating = Math.floor(Math.min(...ratings) * 10) / 10;
    const maxRating = Math.ceil(Math.max(...ratings) * 10) / 10;
    
    // Generating rating ranges dynamically based on minimum and maximum price
    const ratingRanges = generateRatingRanges(minRating, maxRating);

    setFilterOptions({
      ...options,
      priceRanges,
      ratingRanges
    });
  }, [products]);

  const generatePriceRanges = (min, max) => {
    const ranges = [];
    
    // Down here three cases are handled:
    // 1. Small ranges (with min - max = 0-100)
    // 2. Medium ranges (with min - max = 100-1000)
    // 3. Large ranges (with min - max = 1000+)

    if (max - min <= 100) {
      const increment = 20;
      for (let i = min; i < max; i += increment) {
        ranges.push({
          label: `$${i} - $${Math.min(i + increment - 1, max)}`,
          min: i,
          max: Math.min(i + increment, max)
        });
      }
    } 

    else if (max - min <= 1000) {
      const increment = 100;
      for (let i = min; i < max; i += increment) {
        ranges.push({
          label: `$${i} - $${Math.min(i + increment - 1, max)}`,
          min: i,
          max: Math.min(i + increment, max)
        });
      }
    } 

    else {
      const increment = 500;
      for (let i = min; i < max; i += increment) {
        ranges.push({
          label: `$${i} - $${Math.min(i + increment - 1, max)}`,
          min: i,
          max: Math.min(i + increment, max)
        });
      }
    }
    
    return ranges;
  };

  const generateRatingRanges = (min, max) => {
    const ranges = [];
    const increment = 0.5;
    
    for (let i = min; i < max; i += increment) {
      ranges.push({
        label: `${i.toFixed(1)} - ${Math.min(i + increment, max).toFixed(1)}`,
        min: i,
        max: Math.min(i + increment, max)
      });
    }
    
    return ranges;
  };

  const handleFilterChange = (field, value) => {
    let newFilters;
    
    if (field === 'priceRange' || field === 'ratingRange') {
      if (!value) {
        newFilters = { 
          ...filters, 
          [field]: '' 
        };
      } else {
        const rangeObject = JSON.parse(value);
        newFilters = { 
          ...filters, 
          [field]: rangeObject 
        };
      }
    } else {
      newFilters = { ...filters, [field]: value };
    }
    
    setFilters(newFilters);
    
    const parentFilters = {
      title: newFilters.title,
      brand: newFilters.brand,
      category: newFilters.category,
      priceRange: newFilters.priceRange ? newFilters.priceRange : null,
      ratingRange: newFilters.ratingRange ? newFilters.ratingRange : null
    };
    
    onFilterChange(parentFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      title: '',
      brand: '',
      category: '',
      priceRange: '',
      ratingRange: ''
    };
    setFilters(resetFilters);
    onFilterChange({});
  };

  return (
    <div className="filter-container">
      <select
        className="filter-select"
        value={filters.title}
        onChange={(e) => handleFilterChange('title', e.target.value)}
      >
        <option value="">All Titles</option>
        {filterOptions.title.map((title, index) => (
          <option key={index} value={title}>{title}</option>
        ))}
      </select>

      <select
        className="filter-select"
        value={filters.brand}
        onChange={(e) => handleFilterChange('brand', e.target.value)}
      >
        <option value="">All Brands</option>
        {filterOptions.brand.map((brand, index) => (
          <option key={index} value={brand}>{brand}</option>
        ))}
      </select>

      <select
        className="filter-select"
        value={filters.category}
        onChange={(e) => handleFilterChange('category', e.target.value)}
      >
        <option value="">All Categories</option>
        {filterOptions.category.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>

      <select
        className="filter-select"
        value={filters.priceRange ? JSON.stringify(filters.priceRange) : ''}
        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
      >
        <option value="">All Prices</option>
        {filterOptions.priceRanges.map((range, index) => (
          <option key={index} value={JSON.stringify(range)}>{range.label}</option>
        ))}
      </select>

      <select
        className="filter-select"
        value={filters.ratingRange ? JSON.stringify(filters.ratingRange) : ''}
        onChange={(e) => handleFilterChange('ratingRange', e.target.value)}
      >
        <option value="">All Ratings</option>
        {filterOptions.ratingRanges.map((range, index) => (
          <option key={index} value={JSON.stringify(range)}>{range.label}</option>
        ))}
      </select>

      <button className="reset-filters" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default ProductFilter;