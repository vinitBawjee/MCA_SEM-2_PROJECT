import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile(){

  const [profile,setProfile] = useState({});

  useEffect(()=>{
    fetchProfile();
  },[]);

  const fetchProfile = async () => {

    const token = sessionStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/buyer/profile",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setProfile(res.data.buyer);
  };

  return(
    <div className="userdash-profile">

      <h2>My Profile</h2>

      <div className="profile-card">

        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Mobile:</strong> {profile.mobile}</p>
        <p><strong>isBlocked:</strong> {profile.isBlocked ? "True" : "False"}</p>

      </div>

    </div>
  );
}

export default Profile;