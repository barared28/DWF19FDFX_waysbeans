import { useState } from "react";
import { useHistory } from "react-router-dom";
import { addProductService } from "../services/httpServices";
import Modal from "../Components/Mikro/Modal";

function AddProduct() {
  const [nameFile, setNameFile] = useState("Photo Product");
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const router = useHistory();
  const onUpload = (e) => {
    if (e.target.files[0]) {
      setNameFile(e.target.files[0].name);
    } else {
      setNameFile("Photo Product");
    }
  };
  const handleChange = (e) => {
    if (e.target) {
      const key = e.target.name;
      const value =
        e.target.type === "file" ? e.target.files[0] : e.target.value;
      setFormData({ ...formData, [key]: value });
    }
  };
  const handleButton = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.price &&
      formData.description &&
      formData.stock &&
      formData.photo
    ) {
      const { name, price, description, stock, photo } = formData;
      const body = new FormData();
      body.append("name", name);
      body.append("description", description);
      body.append("price", price);
      body.append("stock", stock);
      body.append("photo", photo);
      addProductService(body, () => setShowModal(true));
    }
  };
  const redirect = () => {
    router.push("/");
  };
  return (
    <div className="row mb-90 mt-44">
      <div className="w-472 mt-33">
        <h2 className="add-product-page-title">Add Product</h2>
        <form className="column">
          <input
            name="name"
            placeholder="Name"
            className="input"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            className="input"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            className="input"
            onChange={(e) => handleChange(e)}
          />
          <textarea
            name="description"
            placeholder="Description Product"
            rows={4}
            className="input"
            onChange={(e) => handleChange(e)}
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
                handleChange(e);
                onUpload(e);
              }}
            />
          </label>
          <div className="mt-55 item-center">
            <button
              className="btn btn-primary btn-add-product"
              onClick={(e) => handleButton(e)}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      <div className="ml-92 align-center">
        {formData && formData.photo ? (
          <img
            src={URL.createObjectURL(formData.photo)}
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
