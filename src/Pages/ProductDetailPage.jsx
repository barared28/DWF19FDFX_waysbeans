import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { useParams } from "react-router-dom";
import { getProductByIdService, baseURL } from "../services/httpServices";
import PageNotFound from "../Pages/NotFoundPage";
import LoginModal from "../Components/Navbar/LoginModal";
import RegisterModal from "../Components/Navbar/RegisterModal";
import Popup from "../Components/Mikro/Popup";
import format from "../config/formatingCurency";
import Loader from "../Components/Load/Loader";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [state, dispatch] = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [showPop, setShowPop] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const product = await getProductByIdService(id);
      if (product) {
        setLoading(false);
        return setProduct(product.data.data.product);
      }
      setLoading(false);
    })();
  }, [id]);

  const onAdd = () => {
    if (state.isLogin) {
      setShowPop(true);
      dispatch({
        type: "ADD_TO_CART",
        payload: { price: product.price, id },
      });
      dispatch({
        type: "SAVE_CART",
      });
    } else {
      setShowLogin(true);
    }
  };
  return (
    <div>
      {loading && (
        <div className="w-100 h-100 item-center align-center">
          <Loader />
        </div>
      )}
      {product && (
        <div className="row mt-92 mb-51">
          <div className="align-center">
            <img
              src={product.photo}
              alt={product.id}
              className="product-image"
            />
          </div>
          <div className="ml-54 w-100 h-full flex column">
            <h2 className="product-name mt-33">{product.name}</h2>
            <p className="product-stock">Stock : {product.stock}</p>
            <h4 className="product-detail mt-35">{product.description}</h4>
            <h3 className="product-price text-right mt-21">
              {format(product.price)}
            </h3>
            <div className="align-end h-full">
              {state.user && state.user.isAdmin ? (
                <button
                  className="btn btn-primary w-100 mt-55 disabled"
                  disabled
                >
                  Add Cart
                </button>
              ) : (
                <button className="btn btn-primary w-100 mt-55" onClick={onAdd}>
                  Add Cart
                </button>
              )}
            </div>
          </div>
          <Popup
            text="Success Add Product"
            show={showPop}
            setShow={setShowPop}
            time={400}
          />
          <LoginModal
            show={showLogin}
            setShow={setShowLogin}
            switchModal={setShowRegister}
            dispatch={dispatch}
          />
          <RegisterModal
            show={showRegister}
            setShow={setShowRegister}
            switchModal={setShowLogin}
            dispatch={dispatch}
          />
        </div>
      )}
      {!product && !loading && <PageNotFound />}
    </div>
  );
}

export default ProductDetailPage;
