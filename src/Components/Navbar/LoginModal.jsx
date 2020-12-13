import { useState } from "react";
import { loginService } from "../../services/httpServices";
import Modal from "../Mikro/Modal";
import Popup from "../Mikro/Popup";

function LoginModal({ show, setShow, switchModal, dispatch, state }) {
  const [showPop, setShowPop] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const onSwitch = () => {
    setShow(false);
    switchModal(true);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onLogin = (e) => {
    e.preventDefault();
    loginService(
      dispatch,
      { email: formData.email, password: formData.password },
      setShowPop,
      setShow
    );
  };
  return (
    <Modal show={show} setShow={setShow}>
      <div className="p-modal">
        <div className="w-modal">
          <h2 className="text-modal-title">Login</h2>
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
              type="password"
              className="input w-100"
              onChange={(e) => handleChange(e)}
              value={formData.password}
            />
            <button
              className="btn btn-primary w-100 btn-modal mt-28"
              onClick={onLogin}
            >
              Login
            </button>
            <p className="text-center text-modal mt-21">
              Don't have an account ?{" "}
              <span className="half-bold cursor" onClick={onSwitch}>
                Klik Here
              </span>
            </p>
          </form>
        </div>
      </div>
      <Popup
        text="Wrong Detail"
        type="danger"
        show={showPop}
        setShow={setShowPop}
      />
    </Modal>
  );
}

export default LoginModal;
