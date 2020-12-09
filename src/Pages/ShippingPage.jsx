import { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { useHistory } from "react-router-dom";
import CardProduct from "../Components/ProductBox";
import Modal from "../Components/Mikro/Modal";

function Shipping() {
  const [state, dispatch] = useContext(GlobalContext);
  const { carts } = state;
  const [nameFile, setNameFile] = useState("Attache of transaction");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const router = useHistory();
  const onUpload = (e) => {
    setNameFile(e.target.files[0].name);
  };
  const onPay = (e) => {
    e.preventDefault();
    setShowModal(true);
    dispatch({
      type: "ADD_TO_TRANSACTION",
      payload: carts,
    });
    dispatch({
      type: "ADD_TO_TRANSACTION_ADMIN",
      payload: {
        name: name,
        address: address,
        postCode: postCode,
        product: state.carts.map((product) => `${product.name},\n`),
      },
    });
  };
  const redirect = () => {
    router.push("/profile");
  };
  return (
    <>
      <form className="space-between mb-51 mt-77">
        <div>
          <h2 className="shipping-page-title">Shipping</h2>
          <div className="column">
            <input
              name="name"
              placeholder="Name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              name="email"
              placeholder="Email"
              type="email"
              className="input"
            />
            <input
              name="phone"
              placeholder="Phone"
              type="number"
              className="input"
            />
            <input
              name="possCode"
              placeholder="Poss Code"
              type="number"
              className="input"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
            />
            <textarea
              name="address"
              placeholder="Address"
              rows={4}
              className="input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="file" className="cursor input">
              <div className="space-between align-center">
                <p>{nameFile}</p>
                <i className="fas fa-paperclip"></i>
              </div>
              <input
                type="file"
                className="none"
                id="file"
                onChange={onUpload}
              />
            </label>
          </div>
        </div>
        <div className="shipping-width-right-con">
          <div>
            {carts
              ? carts.map((product, index) => (
                  <CardProduct dataProduct={product} key={index} />
                ))
              : null}
          </div>
          <div className="mt-28">
            {/* <Link to="/profile"> */}
            <button
              className="btn btn-primary shipping-width-right-con"
              onClick={onPay}
            >
              Pay
            </button>
            {/* </Link> */}
          </div>
        </div>
      </form>
      <Modal show={showModal} setShow={setShowModal} custom={redirect}>
        <div className="p-modal">
          <p className="pop-up-succsess">
            Thank you for ordering in us, please wait 1 x 24 hours to verify you
            order
          </p>
        </div>
      </Modal>
    </>
  );
}

export default Shipping;
