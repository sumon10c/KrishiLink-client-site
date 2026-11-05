
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { FaLeaf, FaSeedling, FaClipboardList } from "react-icons/fa";

const MyInterest = () => {
  const { user } = useContext(AuthContext);

  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://krishilink-api-server.vercel.app/interest/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInterests(data);
      })
      .catch((err) => console.error(err));
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-100 text-green-700 p-3 rounded-xl">
              <FaLeaf size={22} />
            </div>
            <span className="text-green-700 font-bold tracking-widest text-sm uppercase">
              KrishiLink Dashboard
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            My <span className="text-green-600">Interests</span>
          </h2>

          <p className="text-gray-500 mt-2">
            Manage and track all your crop interest requests.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">

          <div className="bg-white border border-green-100 shadow-sm rounded-2xl p-5 flex items-center gap-4">
            <div className="bg-green-100 text-green-700 p-4 rounded-xl">
              <FaClipboardList size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Interests
              </p>
              <h3 className="text-3xl font-extrabold text-gray-800">
                {interests.length}
              </h3>
            </div>
          </div>

          <div className="bg-white border border-emerald-100 shadow-sm rounded-2xl p-5 flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-700 p-4 rounded-xl">
              <FaSeedling size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Crop Requests
              </p>
              <h3 className="text-3xl font-extrabold text-gray-800">
                {interests.length}
              </h3>
            </div>
          </div>

        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 border border-green-100 overflow-hidden">

          <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Interest History
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Your submitted crop interest details
              </p>
            </div>

            <span className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
              {interests.length} Requests
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">

              <thead>
                <tr className="bg-green-50 text-green-800 uppercase text-xs tracking-wider">
                  <th className="py-5 pl-6">Crop Name</th>
                  <th>Owner</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {interests.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="bg-green-50 text-green-500 p-5 rounded-full mb-4">
                          <FaSeedling size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-700">
                          No Interests Found
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          Your crop interest requests will appear here.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  interests.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-gray-100 hover:bg-green-50/60 transition-colors duration-200"
                    >
                      <td className="py-5 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 text-green-700 p-2.5 rounded-lg">
                            <FaLeaf />
                          </div>
                          <span className="font-bold text-gray-800">
                            {item.crop_name}
                          </span>
                        </div>
                      </td>

                      <td className="font-semibold text-gray-600">
                        {item.buyer_name}
                      </td>

                      <td>
                        <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-bold text-sm">
                          {item.quantity}
                        </span>
                      </td>

                      <td>
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold capitalize ${
                          item.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : item.status === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          <span className="w-2 h-2 rounded-full bg-current"></span>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              <FaLeaf className="inline text-green-600 mr-1" />
              Growing Together with KrishiLink
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyInterest;
