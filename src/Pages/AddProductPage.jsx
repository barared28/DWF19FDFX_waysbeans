import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addProductService } from "../Services/httpServices";
import Modal from "../Components/Mikro/Modal";

const productSchema = Yup.object().shape({
  name: Yup.string().min(4, "Too Short !!").required("Name Required"),
  price: Yup.number().min(10000, "Too Cheap !!").required("Price Required"),
  description: Yup.string()
    .min(10, "Too Short !!")
    .required("Description Required"),
  stock: Yup.number().min(10, "Too Low !!").required("Stock Required"),
});

function AddProduct() {
  const [nameFile, setNameFile] = useState("Photo Product");
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useHistory();
  const onUpload = (e) => {
    if (e.target.files[0]) {
      setNameFile(e.target.files[0].name);
    } else {
      setNameFile("Photo Product");
    }
  };
  const handleButton = (result) => {
    if (image === null || !image) {
      return alert("Photo is Required");
    }
    const body = new FormData();
    body.append("name", result.name);
    body.append("description", result.description);
    body.append("price", result.price);
    body.append("stock", result.stock);
    body.append("photo", image);
    addProductService(body, () => setShowModal(true));
  };
  const redirect = () => {
    router.push("/");
  };
  return (
    <div className="row mb-90 mt-44">
      <div className="w-472 mt-33">
        <h2 className="add-product-page-title mb-20">Add Product</h2>
        <Formik
          initialValues={{ name: "", price: "", description: "", stock: "" }}
          validationSchema={productSchema}
          onSubmit={(result) => handleButton(result)}
        >
          {({ errors, touched }) => (
            <Form className="column">
              {errors.name && touched.name && (
                <p className="text-validation">{errors.name}</p>
              )}
              <Field name="name" placeholder="Name" className="input" />
              {errors.stock && touched.stock && (
                <p className="text-validation">{errors.stock}</p>
              )}
              <Field
                name="stock"
                type="number"
                placeholder="Stock"
                className="input"
              />
              {errors.price && touched.price && (
                <p className="text-validation">{errors.price}</p>
              )}
              <Field
                name="price"
                type="number"
                placeholder="Price"
                className="input"
              />
              {errors.description && touched.description && (
                <p className="text-validation">{errors.description}</p>
              )}
              <Field
                as="textarea"
                name="description"
                placeholder="Description Product"
                rows={4}
                className="input"
              />
              <label htmlFor="file" className="cursor input w-photo-file">
                <div className="space-between align-center">
                  <p>{nameFile}</p>
                  <i className="fas fa-paperclip"></i>
                </div>
                <input
                  type="file"
                  className="none"
                  id="file"
                  name="photo"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    onUpload(e);
                  }}
                />
              </label>
              <div className="mt-35 item-center">
                <button
                  className="btn btn-primary btn-add-product"
                  type="submit"
                >
                  Add Product
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="ml-92 align-center">
        {image && image !== null ? (
          <img
            src={URL.createObjectURL(image)}
            alt="add-product"
            className="add-product-img"
          />
        ) : (
          <div className="add-product-img-container align-center">
            <h1 className="">PREVIEW</h1>
          </div>
        )}
      </div>
      <Modal show={showModal} setShow={setShowModal} custom={redirect}>
        <div className="p-modal">
          <p className="pop-up-succsess">Succsessfully add Product</p>
        </div>
      </Modal>
    </div>
  );
}

export default AddProduct;
