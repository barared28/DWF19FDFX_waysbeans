import { useState } from "react";
import { registerService } from "../../services/httpServices";
import Modal from "../Mikro/Modal";
import Popup from "../Mikro/Popup";

function RegisterModal({ show, setShow, switchModal, dispatch }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [showPop, setShowPop] = useState(false);
  const onSwitch = () => {
    setShow(false);
    switchModal(true);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onRegister = (e) => {
    e.preventDefault();
    registerService(dispatch, formData, setShowPop);
  };
  return (
    <Modal show={show} setShow={setShow}>
      <div className="p-modal">
        <div className="w-modal">
          <h2 className="text-modal-title">Register</h2>
          <form className="">
            <input
              name="email"
              placeholder="Email"
              className="input w-100"
              onChange={(e) => handleChange(e)}
              value={formData.email}
            />
            <input
              name="password"
              placeholder="Password"
              className="input w-100"
              onChange={(e) => handleChange(e)}
              value={formData.password}
            />
            <input
              name="fullName"
              placeholder="Full Name"
              className="input w-100"
              onChange={(e) => handleChange(e)}
              value={formData.fullName}
            />
            <button
              className="btn btn-primary w-100 btn-modal mt-28"
              onClick={onRegister}
            >
              Register
            </button>
            <p className="text-center text-modal mt-21">
              Already have an account ?{" "}
              <span className="half-bold cursor" onClick={onSwitch}>
                Klik Here
              </span>
            </p>
          </form>
        </div>
      </div>
      <Popup
        text="Please Input Detail"
        type="danger"
        show={showPop}
        setShow={setShowPop}
      />
    </Modal>
  );
}

export default RegisterModal;
