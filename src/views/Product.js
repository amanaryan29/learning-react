import React from "react";
import { useParams } from "react-router-dom";

import Loader from "../components/Loader";
import { useAxiosGet } from "../hooks/Api";

function Product() {
  const { id } = useParams();
  const url = `https://5eae99784350860016e140ec.mockapi.io/products/${id}`;

  let product = useAxiosGet(url);
  let content;

  if (product.error) {
    content = (
      <p>
        There was an error while fetching the product. It may be not present in
        the database.
      </p>
    );
  }

  if (product.loading) {
    content = <Loader />;
  }
  if (product.data) {
    content = (
      <div>
        <h1 className="text-2xl font-bold mb-3">{product.data.name}</h1>
        <div>
          <img src={product.data.images[0].imageUrl} alt={product.data.name} />
        </div>
        <div className="font-bold text-xl mb-3">$ {product.data.price}</div>
        <div>{product.data.description}</div>
      </div>
    );
  }

  return <div className="container mx-auto">{content}</div>;
}
export default Product;
