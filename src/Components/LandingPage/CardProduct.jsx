import React from "react";
import { Link } from "react-router-dom";
import format from "../../Config/formatingCurency";
import { baseURL } from "../../Services/httpServices";

function CardProduct({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="mb-20">
      <div className="card-image">
        <img src={`${baseURL}${product.photo}`} alt={product.id} />
      </div>
      <div className="card-body">
        <div className="pl-16 py-14">
          <h4 className="card-title">{product.name}</h4>
          <p className="card-desc mt-11">{format(product.price)}</p>
          <p className="card-desc">Stock : {product.stock}</p>
        </div>
      </div>
    </Link>
  );
}

export default CardProduct;
