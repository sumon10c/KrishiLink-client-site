import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddCrops = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddCrop = (e) => {
    e.preventDefault();

    const crop = {
      name: e.target.name.value,
      type: e.target.type.value,
      unit: e.target.unit.value,
      location: e.target.location.value,

      image: e.target.image.value,
      quantity: Number(e.target.quantity.value),
      price: Number(e.target.price.value),

      description: e.target.description.value,
      userEmail: user.email,
      postDate: new Date(),
    };

    fetch("https://krishilink-api-server.vercel.app/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crop),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            icon: "success",
            title: "Crop Added Successfully!",
            timer: 2500,
          });

          e.target.reset();
          navigate("/myPost");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Crop</h1>
      <form onSubmit={handleAddCrop} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Crop Name"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="type"
          placeholder="Crop Type"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="unit"
          placeholder="Unit (kg / piece)"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price (BDT)"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className="btn bg-green-600 text-white w-full">
          Add Crop
        </button>
      </form>
    </div>
  );
};

export default AddCrops;
