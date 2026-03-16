import Sidebar from "../components/layout/Sidebar";

function Transaction() {
  return (
    <div className="userdash-content">
    <h2>Transactions</h2>

    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Camera</td>
          <td>30000</td>
          <td>Paid</td>
        </tr>
      </tbody>

    </table>

  </div>
  );
}

export default Transaction;