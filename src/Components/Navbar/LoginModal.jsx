import { useState } from "react";
import Modal from "../Mikro/Modal";
import Popup from "../Mikro/Popup";

function LoginModal({ show, setShow, switchModal, dispatch, state }) {
  const [showPop, setShowPop] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const onSwitch = () => {
    setShow(false);
    switchModal(true);
  };
  const onLogin = (e) => {
    e.preventDefault();
    if (
      email &&
      pass &&
      state.user.find((user) => user.email === email && user.pass === pass)
    ) {
      dispatch({
        type: "LOGIN",
        payload: state.user.find(
          (user) => user.email === email && user.pass === pass
        ),
      });
      setShow(false);
      setEmail("");
      setPass("");
    } else {
      setShowPop(true);
    }
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
