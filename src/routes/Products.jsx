import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts, getProductsByIds } from "../lib/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const [soldOutIds, setSoldOutIds] = useState([]);
  const [noProductsFound, setNoProductsFound] = useState(false);
  const [types, setTypes] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const observerRef = useRef();
  const [loadingMore, setLoadingMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const productsPerPage = 10;

  useEffect(() => {
    // Fetch products on component mount
    async function fetchData() {
      try {
        const pdx = await getAllProducts();
        setProducts(pdx);
        setFilteredProducts(pdx);
        setNoProductsFound(pdx.length === 0);

        const soldOutProducts = await getProductsByIds([]);
        const ids = soldOutProducts.map((p) => p.productId);
        setSoldOutIds(ids);

        const typesArr = pdx.map((p) => p.productType);
        setTypes([...new Set(typesArr)]);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Detect screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Initial load of products
    if (products.length > 0) {
      const initialLoadCount = isMobile ? 5 : productsPerPage; // Initial load count based on isMobile
      const initialProducts = products.slice(0, initialLoadCount);
      setDisplayedProducts(initialProducts);
    }
  }, [products, isMobile]);

  const loadMoreProducts = () => {
    if (isMobile) {
      const currentProductCount = displayedProducts.length;
      const remainingProducts = filteredProducts.slice(currentProductCount);

      if (remainingProducts.length > 0) {
        const newProducts = remainingProducts.slice(0, 5); // Load 5 more products on mobile
        setDisplayedProducts((prevProducts) => [...prevProducts, ...newProducts]);
      }
    }
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    if (isMobile && scrollPercentage > 0.5 && !loadingMore && displayedProducts.length < filteredProducts.length) {
      setLoadingMore(true);
      loadMoreProducts();
    }
  };

  useEffect(() => {
    if (isMobile) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile, displayedProducts, filteredProducts, loadingMore]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);
    const newProducts = filteredProducts.slice(startIndex, endIndex);
    setDisplayedProducts(newProducts);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  // Handle type change filter
  function handleTypeChange(event) {
    const selectedType = event.target.value;
    const filtered = filterProducts(products, selectedType, searchQuery);
    updateFilteredProducts(filtered);
  }

  // Handle search input change
  function handleSearch(event) {
    // Check if Enter key was pressed (keyCode 13) or button was clicked
    if (event.key === "Enter" || event.type === "click") {
      const query = searchRef.current.value.trim().toLowerCase(); // Access input value using useRef
      setSearchQuery(query);
      const filtered = filterProducts(products, document.getElementById("typeFilter").value, query);
      updateFilteredProducts(filtered);
    }
  }

  // Sort products based on selected option
  function sortProducts(event) {
    const sortBy = event.target.value;
    let sortedProducts = [...filteredProducts];

    if (sortBy === "price-d") {
      sortedProducts.sort((a, b) => b.productPrice - a.productPrice || a.productType.localeCompare(b.productType));
    } else if (sortBy === "price-a") {
      sortedProducts.sort((a, b) => a.productPrice - b.productPrice || a.productType.localeCompare(b.productType));
    } else if (sortBy === "all") {
      sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
    }

    updateFilteredProducts(sortedProducts);
  }

  // Function to filter products based on type and search query
  function filterProducts(products, selectedType, query) {
    let filtered = [...products];

    // Perform filtering based on search query
    if (query) {
      const searchTerms = query.split(" ");

      filtered = filtered.filter((p) => {
        const productNameWithoutSpaces = p.productName.toLowerCase().replace(/\s+/g, "");
        const typeWithoutSpaces = p.productType.toLowerCase().replace(/\s+/g, "");
        // Check if any search term appears anywhere in the product name or type
        return (
          searchTerms.every((term) =>
            productNameWithoutSpaces.includes(term) ||
            typeWithoutSpaces.includes(term) ||
            String(p.productPrice).includes(term) ||
            String(p.productId).includes(term)
          )
        );
      });
    }

    // Filter by selected type (if not 'all')
    if (selectedType !== "all") {
      filtered = filtered.filter((p) => p.productType === selectedType);
    }

    return filtered;
  }

  const updateFilteredProducts = (filtered) => {
    setFilteredProducts(filtered);
    const initialCount = isMobile ? 5 : productsPerPage; // Adjust initial load count based on isMobile
    setDisplayedProducts(filtered.slice(0, initialCount));
    setCurrentPage(1);
    setNoProductsFound(filtered.length === 0);
  };

  return (
    <>
      <div id="product-filters">
        <div>
          <label htmlFor="typeFilter">Type</label>
          <select id="typeFilter" onChange={handleTypeChange}>
            <option value="all">All</option>
            {types.map((type) => (
              <option value={type} key={type}>
                {type.toLowerCase().replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="searchInput">Search</label>
          <input
            type="search"
            id="searchInput"
            ref={searchRef}
            onKeyDown={handleSearch}
            onChange={handleSearch}
          />
          <button onClick={handleSearch} id="searchButton">
            Search
          </button>
        </div>
        <div>
          <label htmlFor="sortFilter">Filter</label>
          <select id="sortFilter" onChange={sortProducts}>
            <option value=""></option>
            <option value="price-d">Price (High-low)</option>
            <option value="price-a">Price (Low-High)</option>
            <option value="all">Alphabetical</option>
          </select>
        </div>
      </div>

      <div id="products">
        {noProductsFound ? (
          <div>Sorry, no products match your search.</div>
        ) : (
          displayedProducts.map((p) => (
            <ProductCard
              key={`pcard-${p.productId}`}
              p={p}
              isSoldOut={soldOutIds.includes(p.productId)}
            />
          ))
        )}
      </div>

      {filteredProducts.length > productsPerPage && isMobile && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <ul style={{ listStyle: "none", padding: 0, display: "flex" }}>
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
              <li key={`page-${index}`}>
                <button
                  onClick={() => handlePageClick(index + 1)}
                  style={{
                    margin: "0 5px",
                    fontWeight: currentPage === index + 1 ? "bold" : "normal",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {filteredProducts.length > productsPerPage && !isMobile && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <ul style={{ listStyle: "none", padding: 0, display: "flex" }}>
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
              <li key={`page-${index}`}>
                <button
                  onClick={() => handlePageClick(index + 1)}
                  style={{
                    margin: "0 5px",
                    fontWeight: currentPage === index + 1 ? "bold" : "normal",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Products;
 