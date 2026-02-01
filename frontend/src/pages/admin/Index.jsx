import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import SidebarOptions from "../../components/admin/SidebarOptions";

import "./index.css";

const Index = () => {
    const navigate = useNavigate();

    return (
        <div className="container-fluid vh-100 p-0">
            
            <div className="row-1 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 brand-title">
                    Auction Admin
                </h5>

                <button className="btn btn-new-admin" onClick={() => navigate("/admin/new-admin")}>
                    <i className="fa-solid fa-user-plus me-2"></i>
                    New Admin
                </button>
            </div>

            <div className="row-2">
                <div className="col-1"><SidebarOptions /></div>
                <div className="col-2">
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default Index;
