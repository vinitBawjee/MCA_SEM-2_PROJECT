import { useEffect, useState } from "react";
import axios from "axios";
import "./SellerProfile.css";

export default function SellerProfile() {
  const token = sessionStorage.getItem("token");

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/seller/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProfile(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile || !profile._id) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-card">
        <p><strong>Name:</strong> {profile.name || "-"}</p>
        <p><strong>Email:</strong> {profile.email || "-"}</p>
        <p><strong>Mobile:</strong> {profile.mobile || "-"}</p>
        <p><strong>isBlocked:</strong> {profile.isBlocked ? "True" : "False" || "-"}</p>
      </div>
    </div>
  );
}