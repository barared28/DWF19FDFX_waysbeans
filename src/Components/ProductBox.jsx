import { useState, useEffect } from "react";
import format from "../config/formatingCurency";
import logo from "../Images/Icon.png";
import { getProductByIdService, baseURL } from "../services/httpServices";

function ProductBox({ children, dataProduct }) {
  const [product, setProducts] = useState(null);
  useEffect(() => {
    dataProduct &&
      (async () => {
        const data = await getProductByIdService(dataProduct.id);
        setProducts(data.data.data.product);
      })();
  }, [dataProduct]);
  return product ? (
    <div className="space-between bg-back shipping-card-con mb-10">
      <div className="row">
        <div className="align-center">
          <img
            src={`${baseURL}${product.photo}`}
            className="shipping-card-img"
            alt={product.name}
          />
        </div>
        <div className="ml-13">
          <h5 className="shipping-card-name">{product.name}</h5>
          <p className="shipping-card-desc">
            <span className="half-bold">Friday</span>, 5 August 2020
          </p>
          <p className="shipping-card-desc mt-21">
            Price : {format(+product.price)}
          </p>
          <p className="shipping-card-desc">Qty : {dataProduct.qty}</p>
          <p className="shipping-card-desc">
            <span className="half-bold">
              Sub Total : {format(+product.price * +dataProduct.qty)}
            </span>
          </p>
        </div>
      </div>
      <div>
        <div className="item-center">
          <img src={logo} className="shipping-card-logo" alt={"logo"} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  ) : null;
}

export default ProductBox;
