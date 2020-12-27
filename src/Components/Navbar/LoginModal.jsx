import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { loginService } from "../../Services/httpServices";
import Modal from "../Mikro/Modal";
import Popup from "../Mikro/Popup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email Required"),
  password: Yup.string().min(8, "Too Short !!").required("Password Required"),
});

function LoginModal({ show, setShow, switchModal, dispatch, state }) {
  const [showPop, setShowPop] = useState(false);
  const onSwitch = () => {
    setShow(false);
    switchModal(true);
  };
  const onLogin = (result) => {
    loginService(
      dispatch,
      { email: result.email, password: result.password },
      setShowPop,
      setShow
    );
  };
  return (
    <Modal show={show} setShow={setShow}>
      <div className="p-modal">
        <div className="w-modal">
          <h2 className="text-modal-title mb-20">Login</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(result) => onLogin(result)}
          >
            {({ errors, touched }) => (
              <Form>
                {errors.email && touched.email && (
                  <p className="text-validation">{errors.email}</p>
                )}
                <Field
                  name="email"
                  placeholder="Email"
                  className="input w-100"
                />
                {errors.password && touched.password && (
                  <p className="text-validation">{errors.password}</p>
                )}
                <Field
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="input w-100"
                />
                <button
                  className="btn btn-primary w-100 btn-modal mt-8"
                  type="submit"
                >
                  Login
                </button>
                <p className="text-center text-modal mt-21">
                  Don't have an account ?{" "}
                  <span className="half-bold cursor" onClick={onSwitch}>
                    Klik Here
                  </span>
                </p>
              </Form>
            )}
          </Formik>
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
