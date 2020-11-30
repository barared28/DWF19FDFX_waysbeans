import { useState } from "react";
import Modal from "../Mikro/Modal";
import Popup from "../Mikro/Popup";

function RegisterModal({ show, setShow, switchModal, dispatch }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [showPop, setShowPop] = useState(false);
  const onSwitch = () => {
    setShow(false);
    switchModal(true);
  };
  const onRegister = (e) => {
    e.preventDefault();
    if (email && pass && name) {
      dispatch({
        type: "REGISTER",
        payload: {
          email: email,
          pass: pass,
          name: name,
          admin: false,
        },
      });
      setShow(false);
      setEmail("");
      setPass("");
      setName("");
    } else {
      setShowPop(true);
    }
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              name="password"
              placeholder="Password"
              className="input w-100"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <input
              name="name"
              placeholder="Full Name"
              className="input w-100"
              onChange={(e) => setName(e.target.value)}
              value={name}
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
