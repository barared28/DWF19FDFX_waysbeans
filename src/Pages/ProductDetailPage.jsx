import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { useParams } from "react-router-dom";
import { getProductByIdService, baseURL } from "../services/httpServices";
import { addProductCart } from "../services/localStorageService";
import LoginModal from "../Components/Navbar/LoginModal";
import RegisterModal from "../Components/Navbar/RegisterModal";
import Popup from "../Components/Mikro/Popup";
import format from "../config/formatingCurency";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [state, dispatch] = useContext(GlobalContext);
  const [showPop, setShowPop] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    (async () => {
      const product = await getProductByIdService(id);
      if (product) {
        return setProduct(product.data.data.product);
      }
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
  return product ? (
    <div className="row mt-92 mb-51">
      <div>
        <img
          src={`${baseURL}${product.photo}`}
          alt={product.id}
          className="product-image"
        />
      </div>
      <div className="ml-54">
        <h2 className="product-name mt-33">{product.name}</h2>
        <p className="product-stock">Stock : {product.stock}</p>
        <h4 className="product-detail mt-35">{product.description}</h4>
        <h3 className="product-price text-right mt-21">
          {format(product.price)}
        </h3>
        <button className="btn btn-primary w-100 mt-55" onClick={onAdd}>
          Add Cart
        </button>
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
  ) : (
    <div>Product Tidak Ada</div>
  );
}

export default ProductDetailPage;
