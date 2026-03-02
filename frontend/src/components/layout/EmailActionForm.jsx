import { useNavigate } from "react-router-dom";
import "./EmailActionForm.css";

const ActionForm = ({ title = "Email", onSubmit }) => {
  const navigate = useNavigate();

  return (
    <div className="action-overlay">
      <div className="action-card">
        
        {/* Back Arrow */}
        <span
          className="back-arrow"
          onClick={() => navigate(-1)}
        >
          ←
        </span>

        <h2>{title}</h2>

        <textarea
          placeholder="Enter reason..."
          className="action-textarea"
        />

        <button className="action-submit">
          Submit
        </button>

      </div>
    </div>
  );
};

export default ActionForm;