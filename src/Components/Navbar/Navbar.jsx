import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import { logoutService } from "../../services/httpServices";
import logo from "../../Images/Icon.png";
import cart from "../../Images/cart.png";
import user from "../../Images/user.png";
import logout from "../../Images/logout.png";
import addProduct from "../../Images/addProduct.png";
import userIcon from "../../Images/userIcon.png";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function NavbarComponent() {
  const [state, dispatch] = useContext(GlobalContext);
  const { isLogin } = state;
  return (
    <div className="p-100 mb-40 space-between navbar">
      <div className="align-center">
        <Link to="/">
          <img src={logo} alt="log" className="nav-logo cursor" />
        </Link>
      </div>
      <div className="align-center">
        {isLogin ? (
          <IsLogin dispatch={dispatch} state={state} />
        ) : (
          <NotLogin dispatch={dispatch} state={state} />
        )}
      </div>
    </div>
  );
}

const NotLogin = ({ dispatch, state }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const onLogin = () => {
    setShowLogin(true);
  };
  const onRegister = () => {
    setShowRegister(true);
  };
  return (
    <>
      <button className="mr-15 btn" onClick={onLogin}>
        Login
      </button>
      <LoginModal
        show={showLogin}
        setShow={setShowLogin}
        switchModal={setShowRegister}
        dispatch={dispatch}
        state={state}
      />
      <button className="btn btn-primary" onClick={onRegister}>
        Register
      </button>
      <RegisterModal
        show={showRegister}
        setShow={setShowRegister}
        switchModal={setShowLogin}
        dispatch={dispatch}
      />
    </>
  );
};

const IsLogin = ({ dispatch, state }) => {
  const { carts } = state;
  const onLogout = (e) => {
    e.preventDefault();
    logoutService(dispatch);
  };
  return (
    <>
      <Link to="/cart">
        {carts.length > 0 && (
          <div className="num-product-cart">
            <p>{carts.length}</p>
          </div>
        )}
        <img src={cart} alt="cart" className="mr-36 cursor" />
      </Link>
      <div className="dropdown">
        <img src={user} alt="user" className="user-icon dropbtn"></img>
        <div className="dropdown-content">
          {!state.user.isAdmin && (
            <span>
              <Link to="/profile">
                <div className="row align-center">
                  <img
                    src={userIcon}
                    alt="profile-icon"
                    className="dropdown-img-icon"
                  />
                  <p className="ml-19 dropdown-text">Profile</p>
                </div>
              </Link>
            </span>
          )}
          {state.user.isAdmin ? (
            <>
              <span>
                <Link to="/admin">
                  <div className="row align-center">
                    <img
                      src={userIcon}
                      alt="add-product-icon"
                      className="dropdown-img-icon"
                    />
                    <p className="ml-19 dropdown-text">Admin</p>
                  </div>
                </Link>
              </span>
              <span>
                <Link to="/admin/add-product">
                  <div className="row align-center">
                    <img
                      src={addProduct}
                      alt="add-product-icon"
                      className="dropdown-img-icon"
                    />
                    <p className="ml-19 dropdown-text">Add Product</p>
                  </div>
                </Link>
              </span>
            </>
          ) : null}
          <span onClick={onLogout}>
            <div className="row align-center">
              <img
                src={logout}
                alt="logut-icon"
                className="dropdown-img-icon"
              />
              <p className="ml-19 dropdown-text">Logut</p>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
