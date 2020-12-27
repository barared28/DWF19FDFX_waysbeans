import { useState } from "react";
import { registerService } from "../../Services/httpServices";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Modal from "../Mikro/Modal";
import Popup from "../Mikro/Popup";

const registerSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email Required"),
  password: Yup.string().min(8, "Too Short !!").required("Password Required"),
  fullName: Yup.string().min(4, "Too Short !!").required("Full Name Required"),
});

function RegisterModal({ show, setShow, switchModal, dispatch }) {
  const [showPop, setShowPop] = useState(false);
  const [showPopText, setPopText] = useState("Email Already Used");
  const onSwitch = () => {
    setShow(false);
    switchModal(true);
  };
  const onRegister = (result) => {
    registerService(
      dispatch,
      {
        email: result.email,
        password: result.password,
        fullName: result.fullName,
      },
      setShowPop
    );
  };
  return (
    <Modal show={show} setShow={setShow}>
      <div className="p-modal">
        <div className="w-modal">
          <h2 className="text-modal-title mb-20">Register</h2>
          <Formik
            initialValues={{ email: "", password: "", fullName: "" }}
            validationSchema={registerSchema}
            onSubmit={(result) => onRegister(result)}
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
                  className="input w-100"
                  type="password"
                />
                {errors.fullName && touched.fullName && (
                  <p className="text-validation">{errors.fullName}</p>
                )}
                <Field
                  name="fullName"
                  placeholder="Full Name"
                  className="input w-100"
                />
                <button
                  className="btn btn-primary w-100 btn-modal mt-8"
                  type="submit"
                >
                  Register
                </button>
                <p className="text-center text-modal mt-21">
                  Already have an account ?{" "}
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
        text={showPopText}
        type="danger"
        show={showPop}
        setShow={setShowPop}
      />
    </Modal>
  );
}

export default RegisterModal;

{
  /* <form className="">
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
            <input
              name="fullName"
              placeholder="Full Name"
              className="input w-100"
              onChange={(e) => handleChange(e)}
              value={formData.fullName}
            />
            <button
              className="btn btn-primary w-100 btn-modal mt-8"
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
          </form> */
}
