import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { getTransactionsService } from "../services/httpServices";
import Table from "../Components/Table";

function AdminDashboard() {
  const [state, dispatch] = useContext(GlobalContext);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactionsService(setTransactions);
  }, []);
  return (
    <div className="mt-150">
      <h2 className="admin-page-title">Income Transaction</h2>
      <div className="mt-62 mb-51">
        <Table data={transactions} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default AdminDashboard;
