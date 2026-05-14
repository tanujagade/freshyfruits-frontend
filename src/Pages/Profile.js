import { useState } from "react";

const Profile = () => {

  const [name] = useState(localStorage.getItem("name") || "User Name");
  const [email] = useState(localStorage.getItem("email") || "user@email.com");
  const [phone] = useState(localStorage.getItem("phone") || "Not added");
  const [address] = useState(localStorage.getItem("address") || "Not added");

  return (

    <div className="max-w-4xl mx-auto p-6">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6">
        👤 My Profile
      </h2>

      {/* PROFILE CARD */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">

        {/* PROFILE IMAGE */}
        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-600">
          {name.charAt(0).toUpperCase()}
        </div>

        {/* USER INFO */}
        <div className="flex-1">

          <h3 className="text-2xl font-semibold mb-2">
            {name}
          </h3>

          <p className="text-gray-600 mb-1">
            📧 {email}
          </p>

          <p className="text-gray-600 mb-1">
            📞 {phone}
          </p>

          <p className="text-gray-600">
            📍 {address}
          </p>

        </div>

        {/* EDIT BUTTON */}
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Edit Profile
        </button>

      </div>

      {/* EXTRA SECTION */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ACCOUNT DETAILS */}
        <div className="bg-white shadow-md rounded-lg p-5">
          <h4 className="font-semibold text-lg mb-3">
            Account Details
          </h4>

          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Address:</strong> {address}</p>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white shadow-md rounded-lg p-5">
          <h4 className="font-semibold text-lg mb-3">
            Quick Actions
          </h4>

          <ul className="space-y-2 text-blue-600">
            <li className="cursor-pointer hover:underline">
              View Orders
            </li>
            <li className="cursor-pointer hover:underline">
              Change Password
            </li>
            <li className="cursor-pointer hover:underline">
              Logout
            </li>
          </ul>

        </div>

      </div>

    </div>

  );

};

export default Profile;