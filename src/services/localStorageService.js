export const addProductCart = async (productId, dispatch) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    return localStorage.setItem(
      "cart",
      JSON.stringify([{ productId, qty: 1 }])
    );
  } else {
    const exsitedProduct = await cart.filter(
      (product) => product.productId === productId
    );
    if (exsitedProduct.length === 0) {
      const newCart = JSON.stringify([...cart, { productId, qty: 1 }]);
      localStorage.setItem("cart", newCart);

      return dispatch({
        type: "UPDATE_CART",
        payload: { cart: JSON.parse(newCart) },
      });
    }
    const index = cart.findIndex((product) => product.productId === productId);
    cart[index] = { productId, qty: +cart[index].qty + 1 };
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "UPDATE_CART",
      payload: { cart: cart },
    });
  }
};
