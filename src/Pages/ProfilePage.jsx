import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import {
  getMyTransactions,
  editStatusTransactionService,
  loadedService,
} from "../services/httpServices";
import user from "../Images/user.png";
import CardProduct from "../Components/Mikro/ProductBox";
import qrode from "../Images/qr-code.png";
import Loader from "../Components/Load/Loader";

function ProfilePage() {
  const [state, dispatch] = useContext(GlobalContext);
  const { user: userData } = state;
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    setLoading(true);
    getMyTransactions(setTransactions, setLoading);
    checkUser()
  }, []);
  const checkUser = () => {
    if (!userData.fullName) {
      loadedService(dispatch);
    }
  };
  return (
    <div className="space-between mt-77 mb-90">
      <div>
        <h2 className="profile-page-title">My Profile</h2>
        <div className="row mt-26">
          <div>
            <img src={user} alt="user" className="profile-page-img" />
          </div>
          <div className="ml-28">
            <h3 className="profile-page-sub-title">Full Name</h3>
            <h4 className="profile-page-desc">{userData.fullName}</h4>

            <h3 className="profile-page-sub-title mt-26">Email</h3>
            <h4 className="profile-page-desc">{userData.email}</h4>
          </div>
        </div>
      </div>
      <div className="profile-page-width-con-right">
        <h2 className="profile-page-title">My Transaction</h2>
        <div className="mt-26">
          {loading && (
            <div className="item-center">
              <Loader />
            </div>
          )}
          {transactions.length > 0
            ? transactions.map((transaction, index) => {
                return <Transaction transaction={transaction} key={index} />;
              })
            : null}
        </div>
      </div>
    </div>
  );
}

function Transaction({ transaction }) {
  const [status, setStatus] = useState(transaction.status);
  const handleClick = () => {
    setStatus("Success");
    editStatusTransactionService(transaction.id, { status: "Success" });
  };
  return (
    <div>
      {transaction.products.length > 0 &&
        transaction.products.map((product, index) => {
          return (
            <CardProduct dataProduct={product} key={index} ready={true}>
              <Status type={status} />
            </CardProduct>
          );
        })}
      <div className="mb-10 line"></div>
      <div className="space-between mb-20">
        <div>
          <h4 className="text-desc-transaction ">
            Transaction Id : {transaction.id}
          </h4>
          <h4 className="text-desc-transaction ">Status : {status}</h4>
        </div>
        <div className="row">
          {status === "On The Way" && (
            <>
              <p className="text-desc-transaction align-center mr-15">
                Product Have Arrived ?
              </p>
              <button className="btn" onClick={handleClick}>
                Confirm
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Status({ type }) {
  return (
    <div className="item-center column">
      <div className="item-center mt-10">
        <img src={qrode} alt="qr-code" />
      </div>
      <div className="mt-10">
        {type === "Waiting Approve" ? (
          <div className="status-container bg-danger">
            <p className="status-text text-danger">Waiting Approve</p>
          </div>
        ) : type === "On The Way" ? (
          <div className="status-container bg-succsess">
            <p className="status-text text-succsess">On The Way</p>
          </div>
        ) : type === "Success" ? (
          <div className="status-container bg-primary">
            <p className="status-text text-white">Completed</p>
          </div>
        ) : (
          <div className="status-container bg-cancel">
            <p className="status-text text-white">Cancel</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
