// import Module
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
import { GlobalContextProvider } from "./Context/GlobalContext";
import "./Style.scss";

function App() {
  return (
    <GlobalContextProvider>
      <Router>
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
      </Router>
    </GlobalContextProvider>
  );
}

export default App;
