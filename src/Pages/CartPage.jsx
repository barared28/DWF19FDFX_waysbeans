import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Link } from "react-router-dom";
import { baseURL, getProductByIdService } from "../Services/httpServices";
import Loader from "../Components/Load/Loader";
import format from "../Config/formatingCurency";
import trash from "../Images/trash.png";

function CartPage() {
  const [state, dispatch] = useContext(GlobalContext);
  const { totalCart } = state;
  const { carts } = state;
  useEffect(() => {
    dispatch({
      type: "GET_TOTAL_CART",
    });
  }, [dispatch]);
  return (
    <div className="mt-77">
      <h2 className="cart-page-title">My Cart</h2>
      <p className="mt-26 cart-sub-title">Review Your Order</p>
      <div className="row mt-11">
        <div className="cart-container-width">
          <div className="line w-100"></div>
          <div className="py-17">
            {carts.length > 0 ? (
              carts.map((product, index) => (
                <ProductCard
                  dataProduct={product}
                  dispatch={dispatch}
                  key={index}
                />
              ))
            ) : (
              <div className="py-17 text-modal">Product Tidak Ada</div>
            )}
          </div>
          <div className="line w-100"></div>
        </div>
        <div className="mt-17 w-100 cart-right-container ml-34">
          <div className="line w-100"></div>
          <div className="py-17">
            <div className="space-between">
              <p className="cart-text">Subtotal</p>
              <p className="cart-text">{format(+totalCart.subtotal)}</p>
            </div>
            <div className="space-between mt-11">
              <p className="cart-text">Qty</p>
              <p className="cart-text">{totalCart.qty}</p>
            </div>
          </div>
          <div className="line w-100"></div>
          <div className="space-between mt-15">
            <p className="cart-text half-bold">Total</p>
            <p className="cart-text half-bold">{format(+totalCart.total)}</p>
          </div>
          <div className="text-right mt-35">
            {carts.length > 0 && !state.user.isAdmin ? (
              <Link to="/cart/shipping">
                <button className="btn btn-primary">Proceed To Checkout</button>
              </Link>
            ) : (
              <button className="btn btn-primary disabled" disabled>
                Proceed To Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ dataProduct, dispatch }) {
  const [product, setProducts] = useState(null);
  useEffect(() => {
    dataProduct &&
      (async () => {
        const data = await getProductByIdService(+dataProduct.id);
        if (!data) {
          return;
        }
        const product = data.data.data.product;
        setProducts(product);
      })();
  }, [dataProduct]);
  const saveCart = () => {
    dispatch({
      type: "SAVE_CART",
    });
    dispatch({
      type: "GET_TOTAL_CART",
    });
  };
  const onAdd = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: dataProduct,
    });
    saveCart();
  };
  const onDesc = () => {
    if (dataProduct.qty > 1) {
      dispatch({
        type: "DESC_TO_CART",
        payload: dataProduct,
      });
    } else {
      dispatch({
        type: "REMOVE_TO_CART",
        payload: dataProduct,
      });
    }
    saveCart();
  };
  const onRemove = () => {
    dispatch({
      type: "REMOVE_TO_CART",
      payload: dataProduct,
    });
    saveCart();
  };
  return product ? (
    <div className="space-between">
      <div className="row">
        <div>
          <img
            src={`${baseURL}${product.photo}`}
            alt="contoh"
            className="cart-list-img"
          />
        </div>
        <div className="ml-13">
          <h5 className="cart-title-name mt-11">{product.name}</h5>
          <div className="row mt-17">
            <span className="cursor cart-btn" onClick={onDesc}>
              -
            </span>
            <div className="cart-qty-con align-center px-11">
              <p className="cart-qty-num">{dataProduct.qty}</p>
            </div>
            <span className="cursor cart-btn" onClick={onAdd}>
              +
            </span>
          </div>
        </div>
      </div>
      <div>
        <p className="cart-text mt-11">
          {format(+product.price * +dataProduct.qty)}
        </p>
        <div className="text-right mt-17">
          <img src={trash} alt="remove" className="cursor" onClick={onRemove} />
        </div>
      </div>
    </div>
  ) : (
    <div className="item-center">
      <Loader />
    </div>
  );
}

export default CartPage;
