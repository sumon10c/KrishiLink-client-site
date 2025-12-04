// import React, { useContext, useEffect } from 'react';
// import { AuthContext } from '../../context/AuthProvider';

// const MyInterest = () => {

//     const { user } = useContext(AuthContext);

// useEffect(() => {
//   fetch(`https://krishilink-api-server.vercel.app/interest/${user.email}`)
//     .then(res => res.json())
//     .then(data => setInterests(data));
// }, [user.email]);

//     return (
//         <div>
//         <h2 className="text-2xl font-bold mb-4">My Interests</h2>

//         <table className="table w-full">
//           <thead>
//             <tr>
//               <th>Crop Name</th>
//               <th>Owner</th>
//               <th>Quantity</th>
//               <th>Message</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {interest.map(item => (
//               <tr key={item._id}>
//                 <td>{item.cropName}</td>
//                 <td>{item.ownerName}</td>
//                 <td>{item.quantity}</td>
//                 <td>{item.message}</td>
//                 <td>{item.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
// };

// export default MyInterest;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const MyInterest = () => {
  const { user } = useContext(AuthContext);

  // STEP-1: STATE
  const [interests, setInterests] = useState([]);

  // STEP-2: Fetch user interest data
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
    <div>
      <h2 className="text-center text-2xl font-bold mb-4">My Interests</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Crop Name</th>
            <th>Owner</th>
            <th>Quantity</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {interests.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center font-semibold">
                No interests found
              </td>
            </tr>
          ) : (
            interests.map((item) => (
              <tr key={item._id}>
                <td className="font-semibold">{item.crop_name}</td>
                <td className="font-semibold">{item.buyer_name}</td>
                <td className="font-semibold">{item.quantity}</td>
                <td>{item.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyInterest;
