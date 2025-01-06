import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardProduct from "../components/Home/CardProduct/CardProduct";
import FilterCategory from "../components/Home/Filters/FilterCategory";
import FilterPrice from "../components/Home/Filters/FilterPrice";
import ToOrderProducts from "../components/Home/Filters/ToOrderProducts";
import ToOrderProductsByName from "../components/Home/Filters/ToOrderProductsByName";
import caja from "../assets/caja_vacia.png";
import "./styles/HomePage.css";

const HomePage = () => {
  const [productsFilter, setProductsFilter] = useState();
  const [inputValue, setInputValue] = useState("");
  const [showFilters1, setShowFilters1] = useState(false);
  const [showFilters2, setShowFilters2] = useState(false);

  const [inputPrice, setInputPrice] = useState({
    from: 0,
    to: Infinity,
  });

  const products = useSelector((state) => state.products);

  useEffect(() => {
    if (products) {
      setProductsFilter(products);
    }
  }, [products]);

  const handleChange = (e) => {
    const inputValue = e.target.value.toLowerCase().trim();
    const filter = products?.filter((prod) =>
      prod.title.toLowerCase().includes(inputValue)
    );
    setProductsFilter(filter);
    setInputValue(e.target.value);
  };

  const filterCallBack = (prod) =>
    +prod.price > inputPrice.from && +prod.price <= inputPrice.to;

  return (
    <div className="home__container">
      <div className="filter__prod">
        <div>
          <div className="filter__prod-title">
            <h4>Filtrar por </h4>
            <h2>
              {" "}
              <i
                className={`bx ${
                  showFilters1 ? "bxs-chevron-up" : "bxs-chevron-down"
                }  button__down`}
                onClick={() => setShowFilters1(!showFilters1)}
              />
            </h2>
          </div>
          <hr className="title__hr" />
          <div className="container__filterorder-products ">
            {showFilters1 && (
              <>
                <h4>Price</h4>
                <FilterPrice setInputPrice={setInputPrice} />
                <h4>Category</h4>
                <FilterCategory setInputValue={setInputValue} />
              </>
            )}
          </div>
        </div>

        <div>
          <div className="filter__prod-title">
            <h4>Ordenar por </h4>
            <h2>
              {" "}
              <i
                className={`bx ${
                  showFilters2 ? "bxs-chevron-up" : "bxs-chevron-down"
                }  button__down`}
                onClick={() => setShowFilters2(!showFilters2)}
              />
            </h2>
          </div>
          <hr className="title__hr" />
          <div className="container__filterorder-products ">
            {showFilters2 && (
              <>
                <h4>Price</h4>
                <ToOrderProducts />
                <h4>Name</h4>
                <ToOrderProductsByName />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="filter__products-results">
        <input
          className="input__search"
          placeholder="What are you looking for?"
          value={inputValue}
          onChange={handleChange}
          type="text"
        />
        <div className="products__container">
          {productsFilter?.filter(filterCallBack).length !== 0 ? (
            productsFilter
              ?.filter(filterCallBack)
              .map((product) => (
                <CardProduct key={product.id} product={product} />
              ))
          ) : (
            <div className="error__msg">
              <img src={caja} alt="caja_vacia" />
              <p>Sorry we couldn't find any results for "{inputValue}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
