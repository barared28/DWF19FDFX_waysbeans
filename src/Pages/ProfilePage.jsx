import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { getMyTransactions } from "../services/httpServices";
import user from "../Images/user.png";
import CardProduct from "../Components/ProductBox";
import qrode from "../Images/qr-code.png";

function ProfilePage() {
  const [state] = useContext(GlobalContext);
  const { user: userData } = state;
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getMyTransactions(setTransactions);
  }, []);

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
  console.log(transaction);
  return (
    <div>
      {transaction.products.length > 0 &&
        transaction.products.map((product, index) => {
          console.log(product);
          return (
            <CardProduct dataProduct={product} key={index} ready={true}>
              <Status type={transaction.status} />
            </CardProduct>
          );
        })}
      <div className="mb-10 line"></div>
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
        {type === "completed" ? (
          <div className="status-container bg-primary">
            <p className="status-text text-white">Completed</p>
          </div>
        ) : type === "succsess" ? (
          <div className="status-container bg-succsess">
            <p className="status-text text-succsess">Succsess</p>
          </div>
        ) : (
          <div className="status-container bg-danger">
            <p className="status-text text-danger">Waiting Approve</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
