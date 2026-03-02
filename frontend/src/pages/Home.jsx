import Navbar from "../components/layout/Navbar";
import "./Home.css";

import { useSelector, useDispatch } from "react-redux";
import AlertMessage from "../components/layout/AlertMessage";
import { clearMessage } from "../features/auth/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.auth);

  return (
    <div className="container">
      <AlertMessage
        type={error ? "error" : message ? "success" : ""}
        message={error || message}
        onClose={() => dispatch(clearMessage())}
      />
      <Navbar />
    </div>
  );
}
