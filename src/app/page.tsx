"use client";

import { useEffect } from "react";
import { useProductStore } from "./store/ProductStore";
import Link from "next/link";

export default function Home() {
  const {
    products,
    filteredProducts,
    setProducts,
    setSearchQuery,
    setCategoryFilter,
    setSortBy,
    applyFilters,
  } = useProductStore();

  useEffect(() => {
    console.log("Fetching data...");
    fetch("./info/data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [setProducts]);

  useEffect(() => {
    applyFilters();
  }, [products]);

  return (

    <div className="container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
            applyFilters();
          }}
        />

        <select
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            applyFilters();
          }}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
        </select>

        <select
          onChange={(e) => {
            setSortBy(e.target.value);
            applyFilters();
          }}
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <Link href={`/product/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}