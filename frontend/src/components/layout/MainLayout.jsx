import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>

      <main className="mainBody">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}