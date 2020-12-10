import { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { useHistory } from "react-router-dom";
import { addTransactionService } from "../services/httpServices";
import CardProduct from "../Components/ProductBox";
import Modal from "../Components/Mikro/Modal";

function Shipping() {
  const [state] = useContext(GlobalContext);
  const { carts } = state;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    postCode: "",
    phone: "",
    email: "",
    attachment: { name: "Attache of transaction" },
  });
  const router = useHistory();
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [key]: value });
    console.log(formData);
  };
  const onPay = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.address &&
      formData.postCode &&
      formData.phone &&
      formData.email &&
      formData.attachment
    ) {
      const products = JSON.stringify(
        carts.map((product) => {
          return { id: product.id, orderQuantity: product.qty };
        })
      );
      console.log(products);
      const { name, address, postCode, phone, email, attachment } = formData;
      const body = new FormData();
      body.append("name", name);
      body.append("address", address);
      body.append("postCode", postCode);
      body.append("phone", phone);
      body.append("email", email);
      body.append("attachment", attachment);
      body.append("products", products);
      addTransactionService(body, () => setShowModal(true));
    }
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
              value={formData.name}
              onChange={(e) => handleChange(e)}
            />
            <input
              name="email"
              placeholder="Email"
              type="email"
              className="input"
              value={formData.email}
              onChange={(e) => handleChange(e)}
            />
            <input
              name="phone"
              placeholder="Phone"
              type="number"
              className="input"
              value={formData.phone}
              onChange={(e) => handleChange(e)}
            />
            <input
              name="postCode"
              placeholder="Post Code"
              type="number"
              className="input"
              value={formData.postCode}
              onChange={(e) => handleChange(e)}
            />
            <textarea
              name="address"
              placeholder="Address"
              rows={4}
              className="input"
              value={formData.address}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="file" className="cursor input">
              <div className="space-between align-center">
                <p>{formData.attachment.name}</p>
                <i className="fas fa-paperclip"></i>
              </div>
              <input
                type="file"
                name="attachment"
                className="none"
                id="file"
                onChange={(e) => handleChange(e)}
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
            <button
              className="btn btn-primary shipping-width-right-con"
              onClick={onPay}
            >
              Pay
            </button>
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
