import { useState, useEffect } from "react";
import { editStatusTransactionService } from "../../Services/httpServices";

function Table({ data, dispatch }) {
  return (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Address</th>
          <th>Post Code</th>
          <th>Prodcut Order</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0
          ? data.map((tran, index) => (
              <Td data={tran} index={index} dispatch={dispatch} key={index} />
            ))
          : null}
      </tbody>
    </table>
  );
}

const Td = ({ data, index, dispatch }) => {
  const [products, setProducts] = useState({ id: [], name: "" });
  const [status, setStatus] = useState(data.status);
  const getProductName = () => {
    if (data.products && data.products.length > 0) {
      let productsName = "";
      data.products.forEach((product) => {
        if (product.name) {
          if (!products.id.includes(product.id)) {
            productsName += product.name + ", ";
            setProducts({
              id: [...products.id, product.id],
            });
          }
        }
      });
      setProducts({ ...products, name: productsName });
    }
  };
  useEffect(() => {
    getProductName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onAction = (status) => {
    editStatusTransactionService(data.id, { status });
    setStatus(status);
  };
  return (
    <>
      <tr>
        <td>{+index + 1}</td>
        <td>{data.name}</td>
        <td>{data.address}</td>
        <td>{data.postCode}</td>
        <td>{products.name}</td>
        <td>
          {status === "Success" ? (
            <p className="text-succsess">Succsess</p>
          ) : status === "Waiting Approve" ? (
            <p className="text-waiting">Waiting Approve</p>
          ) : status === "On The Way" ? (
            <p className="text-on-the-way">On The Way</p>
          ) : (
            <p className="text-cancel">Cancel</p>
          )}
        </td>
        <td>
          {status === "Success" || status === "On The Way" ? (
            <div className="item-center">
              <i className="fas fa-check status-check"></i>
            </div>
          ) : status === "Waiting Approve" ? (
            <div className="item-center">
              <button
                className="action-cancel cursor"
                onClick={() => onAction("Cancel")}
              >
                Cancel
              </button>
              <button
                className="action-succsess cursor"
                onClick={() => onAction("On The Way")}
              >
                Approve
              </button>
            </div>
          ) : (
            <div className="item-center">
              <i className="fas fa-times status-cancel"></i>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default Table;
