
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [myCrops, setMyCrops] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://krishilink-api-server.vercel.app/my-products?userEmail=${user.email}`)
        .then(res => res.json())
        .then(data => setMyCrops(data));
    }
  }, [user]);



  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this crop?");
    if (!confirm) return;

    fetch(`https://krishilink-api-server.vercel.app/products/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          
          setMyCrops(prev => prev.filter(crop => crop._id !== id));
          
          Swal.fire({
            icon: "success",
            title: "Crop deleted successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(err => console.error(err));
    };


  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl text-center font-bold mb-5">My Posts</h1>
      {myCrops.length === 0 ? (
    <p className="text-gray-500 text-center mt-5 mb-5">
      You haven't added any crops yet.
    </p>
  ) :(
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {myCrops.map(crop => (
          <div key={crop._id} className="rounded-[5px] bg-gradient-to-r from-[#ffe600] to-[#00c853] hover:from-red-600 hover:to-[#00c853] p-4 shadow">
            <img
              src={crop.image}
              alt={crop.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl text-white font-bold mt-2">{crop.name}</h2>
            <p className="text-white">Posted by: {crop.userEmail}</p>
            <p className="text-white mt-1">{crop.description}</p>
            <button onClick={() => handleDelete(crop._id)} className="btn bg-green-600 hover:bg-red-600 text-white mt-3">Delete</button>
          </div>
        ))}
      </div>)}
    </div>

  );
};

export default MyPosts;
