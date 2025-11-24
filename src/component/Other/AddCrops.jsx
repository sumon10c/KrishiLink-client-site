import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const AddCrops = () => {
  const { user } = useContext(AuthContext);

  const handleAddCrop = (e) => {
    e.preventDefault();

    const crop = {
      name: e.target.name.value,
      image: e.target.image.value,
      quantity: e.target.quantity.value,
      price: e.target.price.value,
      description: e.target.description.value,
      userEmail: user.email,
      postDate: new Date()
    };

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crop)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.acknowledged) {
          Swal.fire({
            icon: "success",
            title: "Crop Added! Visit My Post",
            showConfirmButton: false,
            timer: 3500
          });
          e.target.reset();
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Crop</h1>
      <form onSubmit={handleAddCrop} className="space-y-3">
        <input type="text" name="name" placeholder="Crop Name" className="input input-bordered w-full" required />
        <input type="text" name="image" placeholder="Image URL" className="input input-bordered w-full" />
        <input type="text" name="quantity" placeholder="Quantity (e.g., 50 kg)" className="input input-bordered w-full" />
        <input type="text" name="price" placeholder="Price (BDT)" className="input input-bordered w-full" />
        <textarea name="description" placeholder="Description" className="input input-bordered w-full" />
        <button type="submit" className="btn bg-green-600 text-white w-full">Add Crop</button>
      </form>
    </div>
  );
};

export default AddCrops;
