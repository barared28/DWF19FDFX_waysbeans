import { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addTransactionService } from "../services/httpServices";
import CardProduct from "../Components/Mikro/ProductBox";
import UploadLoader from "../Components/Load/UploadLoader";
import Modal from "../Components/Mikro/Modal";

const transactionSchema = Yup.object().shape({
  name: Yup.string().min(4, "Too Short !!").required("Name Required"),
  address: Yup.string().min(8, "Too Short !!").required("Address Required"),
  postCode: Yup.number().min(4, "Too Short !!").required("Post Code Required"),
  phone: Yup.number().min(10, "Too Short !!").required("Phone Required"),
  email: Yup.string().email("Invalid Email").required("Email Required"),
});

function Shipping() {
  const [state, dispatch] = useContext(GlobalContext);
  const { carts } = state;
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useHistory();

  const onPay = (result) => {
    if (!image || image === null) {
      return alert("Attachment is Required");
    }
    const products = JSON.stringify(
      carts.map((product) => {
        return { id: product.id, orderQuantity: product.qty };
      })
    );
    setLoading(true);
    const body = new FormData();
    body.append("name", result.name);
    body.append("address", result.address);
    body.append("postCode", result.postCode);
    body.append("phone", result.phone);
    body.append("email", result.email);
    body.append("image", image);
    body.append("products", products);
    addTransactionService(body, () => {
      dispatch({
        type: "RESET_CART",
      });
      setLoading(false);
      setShowModal(true);
    });
  };

  const redirect = () => {
    router.push("/profile");
  };

  return (
    <>
      {loading && <UploadLoader />}
      <Formik
        initialValues={{
          name: "",
          address: "",
          postCode: "",
          phone: "",
          email: "",
        }}
        validationSchema={transactionSchema}
        onSubmit={(result) => onPay(result)}
      >
        {({ errors, touched }) => (
          <Form className="space-between mb-51 mt-77">
            <div>
              <h2 className="shipping-page-title mb-20">Shipping</h2>
              <div className="column">
                {errors.name && touched.name && (
                  <p className="text-validation">{errors.name}</p>
                )}
                <Field name="name" placeholder="Name" className="input" />
                {errors.email && touched.email && (
                  <p className="text-validation">{errors.email}</p>
                )}
                <Field
                  name="email"
                  placeholder="Email"
                  type="email"
                  className="input"
                />
                {errors.phone && touched.phone && (
                  <p className="text-validation">{errors.phone}</p>
                )}
                <Field
                  name="phone"
                  placeholder="Phone"
                  type="number"
                  className="input"
                />
                {errors.postCode && touched.postCode && (
                  <p className="text-validation">{errors.postCode}</p>
                )}
                <Field
                  name="postCode"
                  placeholder="Post Code"
                  type="number"
                  className="input"
                />
                {errors.address && touched.address && (
                  <p className="text-validation">{errors.address}</p>
                )}
                <Field
                  as="textarea"
                  name="address"
                  placeholder="Address"
                  rows={4}
                  className="input"
                />
                <label htmlFor="file" className="cursor input">
                  <div className="space-between align-center">
                    <p>
                      {image && image !== null
                        ? image.name
                        : "Attache of transaction"}
                    </p>
                    <i className="fas fa-paperclip"></i>
                  </div>
                  <input
                    type="file"
                    name="attachment"
                    className="none"
                    id="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <div className="shipping-width-right-con">
              <div>
                {carts
                  ? carts.map((product, index) => (
                      <div className="mb-10">
                        <CardProduct dataProduct={product} key={index} />
                      </div>
                    ))
                  : null}
              </div>
              <div className="mt-28">
                <button
                  className="btn btn-primary shipping-width-right-con"
                  type="submit"
                >
                  Pay
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
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
