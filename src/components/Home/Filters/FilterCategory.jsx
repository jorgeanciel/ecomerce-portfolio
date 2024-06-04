import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllProductsThunk, getProductsByCategory } from '../../../store/slices/products.slice';

const FilterCategory = ({ setInputValue }) => {
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const URL =
      'https://e-commerce-api.academlo.tech/api/v1/products/categories';
    axios
      .get(URL)
      .then((res) => setCategories(res.data.data.categories))
      .catch((err) => console.log(err));
  }, []);

  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(getProductsByCategory(id));
    setInputValue("");
  };

  const handleAllProducts = () => {
    dispatch(getAllProductsThunk());
    setInputValue("");
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);

    if (value === "") {
      handleAllProducts();
    } else {
      handleClick(value);
    }
  };

  return (
    <div>
      <select value={selectedCategory} onChange={handleSelectChange}>
        <option value="">All Products</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterCategory;
