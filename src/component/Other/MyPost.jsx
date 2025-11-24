
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [myCrops, setMyCrops] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-products?userEmail=${user.email}`)
        .then(res => res.json())
        .then(data => setMyCrops(data));
    }
  }, [user]);



  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this crop?");
    if (!confirm) return;

    fetch(`http://localhost:3000/products/${id}`, {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myCrops.map(crop => (
          <div key={crop._id} className="border rounded p-4 shadow">
            <img
              src={crop.image}
              alt={crop.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-2">{crop.name}</h2>
            <p className="text-gray-600">Posted by: {crop.userEmail}</p>
            <p className="text-gray-500 mt-1">{crop.description}</p>
            <button onClick={() => handleDelete(crop._id)} className="btn">Delete</button>
          </div>
        ))}
      </div>)}
    </div>

  );
};

export default MyPosts;
