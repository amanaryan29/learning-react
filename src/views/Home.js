import React from "react";
import { useAxiosGet } from "../hooks/Api";

import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

function Home() {
  const url = `https://5eae99784350860016e140ec.mockapi.io/products?page=1&limit=10`;
  let products = useAxiosGet(url);

  let content;

  if (products.error) {
    content = (
      <p className="bg-red-300 mb-2 p-3">
        There was an error while fetching the product. It may be not present in
        the database.
      </p>
    );
  }

  if (products.loading) {
    content = <Loader />;
  }

  if (products.data) {
    content = products.data.map((product) => (
      <div key={product.id} className="flex-no-shrink w-full md:w-1/4 md:px-3">
        <ProductCard product={product} />
      </div>
    ));
  }

  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-2xl mb-3">Best Sellers</h1>
      <div className="md:flex flex-wrap md:-mx-3">{content}</div>
    </div>
  );
}

export default Home;
