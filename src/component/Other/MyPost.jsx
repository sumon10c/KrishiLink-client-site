import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [myCrops, setMyCrops] = useState([]);
  const [editCrop, setEditCrop] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://krishilink-api-server.vercel.app/my-products?userEmail=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setMyCrops(data));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This crop will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://krishilink-api-server.vercel.app/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setMyCrops(myCrops.filter((crop) => crop._id !== id));
              Swal.fire("Deleted!", "Your crop has been removed.", "success");
            }
          });
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updated = {
      name: e.target.name.value,
      price: Number(e.target.price.value),
      quantity: Number(e.target.quantity.value),
      image: e.target.image.value,
      description: e.target.description.value,
    };

    fetch(`https://krishilink-api-server.vercel.app/products/${editCrop._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setMyCrops((prev) =>
            prev.map((c) => (c._id === editCrop._id ? { ...c, ...updated } : c))
          );

          Swal.fire("Success!", "Crop updated successfully.", "success");
          setEditCrop(null);
        }
      });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 mb-10">
      <h1 className="text-2xl text-center font-bold mb-5">My Posts</h1>

      {myCrops.length === 0 ? (
        <p className="text-gray-500 text-center">
          You haven't added any crops yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-green-600 text-white">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {myCrops.map((crop) => (
                <tr key={crop._id} className="border">
                  <td>
                    <img
                      src={crop.image}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td>{crop.name}</td>
                  <td>{crop.quantity}</td>
                  <td>{crop.price} BDT</td>
                  <td>{crop.description.slice(0, 40)}...</td>

                  <td className="space-x-2">
                    <button
                      onClick={() => setEditCrop(crop)}
                      className="btn btn-sm bg-yellow-500 text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(crop._id)}
                      className="btn btn-sm bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editCrop && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Crop</h2>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="name"
                defaultValue={editCrop.name}
                className="input input-bordered w-full"
                required
              />

              <input
                type="number"
                name="price"
                defaultValue={editCrop.price}
                className="input input-bordered w-full"
                required
              />

              <input
                type="number"
                name="quantity"
                defaultValue={editCrop.quantity}
                className="input input-bordered w-full"
                required
              />

              <input
                type="text"
                name="image"
                defaultValue={editCrop.image}
                className="input input-bordered w-full"
                required
              />

              <textarea
                name="description"
                defaultValue={editCrop.description}
                className="input input-bordered w-full resize-none"
                required
              ></textarea>

              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditCrop(null)}
                  className="btn btn-sm w-full sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-sm bg-green-600 text-white w-full sm:w-auto"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
