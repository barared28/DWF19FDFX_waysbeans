import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";

const AdminRoot = ({ component: Component, ...rest }) => {
  const [state] = useContext(GlobalContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.user && state.user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AdminRoot;
