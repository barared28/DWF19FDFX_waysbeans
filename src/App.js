// import Module
import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Pages
import AddProductPage from "./Pages/AddProductPage";
import CartPage from "./Pages/CartPage";
import LandingPage from "./Pages/LandingPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ProfilePage from "./Pages/ProfilePage";
import ShippingPage from "./Pages/ShippingPage";
import AdminDashboard from "./Pages/AdminDashboard";

// import dll
import Navbar from "./Components/Navbar/Navbar";
import PrivateRoute from "./Components/PrivateRoot";
import AdminRoute from "./Components/AdminRoot";
import { GlobalContext } from "./Context/GlobalContext";
import { loadedService } from "./services/httpServices";
import "./Style.scss";

function App() {
  const [state, dispatch] = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadedService(dispatch);
      setLoading(false);
    })();
    dispatch({
      type: "UPDATE_CART",
    });
  }, [dispatch]);
  return (
    <Router>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/product/:id" component={ProductDetailPage} />
              <PrivateRoute exact path="/cart" component={CartPage} />
              <PrivateRoute
                exact
                path="/cart/shipping"
                component={ShippingPage}
              />
              <PrivateRoute exact path="/profile" component={ProfilePage} />
              <AdminRoute exact path="/admin" component={AdminDashboard} />
              <AdminRoute
                exact
                path="/admin/add-product"
                component={AddProductPage}
              />
            </Switch>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
